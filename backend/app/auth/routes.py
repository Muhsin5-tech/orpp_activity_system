from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from app.extensions import db
from app.models import User, OTP
from .utils import generate_otp, send_email, generate_access_token, generate_refresh_token
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('full_name')
    role = data.get('role')
    department = data.get('department')
    phone_number = data.get('phone_number')
    id_number = data.get('id_number')

    if not all([email, password, full_name, role]):
        return jsonify({"message": "All fields are required."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 409

    user = User(
        email=email,
        full_name=full_name,
        role=role,
        department=department,
        phone_number=phone_number,
        id_number=id_number
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Account created successfully."}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid email or password."}), 401

    otp_code = generate_otp()
    otp = OTP.query.filter_by(user_id=user.id).first()
    if otp:
        otp.code = otp_code
        otp.created_at = datetime.utcnow()
    else:
        otp = OTP(code=otp_code, user_id=user.id)
        db.session.add(otp)

    db.session.commit()

    email_body = f"""Dear {user.full_name},

Your ORPP Login OTP is: {otp_code}
It will expire in 5 minutes.

If you did not request this, kindly contact ORPP support.

Regards,
ORPP Team
"""
    send_email("Your ORPP Login OTP", email_body, user.email)

    return jsonify({"message": "OTP sent to your email."}), 200


@auth_bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    email = data.get('email')
    otp_entered = data.get('otp')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Invalid email."}), 404

    otp_record = OTP.query.filter_by(user_id=user.id).first()
    if not otp_record:
        return jsonify({"message": "No OTP found. Please login again."}), 404

    if (datetime.utcnow() - otp_record.created_at) > timedelta(minutes=5):
        db.session.delete(otp_record)
        db.session.commit()
        return jsonify({"message": "OTP expired."}), 400

    if otp_record.code != otp_entered:
        return jsonify({"message": "Incorrect OTP."}), 401

    db.session.delete(otp_record)
    db.session.commit()

    access_token = generate_access_token(user.id)
    refresh_token = generate_refresh_token(user.id)

    return jsonify({
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": {"id": user.id, "email": user.email, "role": user.role}
    }), 200


@auth_bp.route('/resend-otp', methods=['POST'])
def resend_otp():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found."}), 404

    otp_record = OTP.query.filter_by(user_id=user.id).first()
    if otp_record and (datetime.utcnow() - otp_record.created_at) < timedelta(minutes=1):
        remaining = 60 - int((datetime.utcnow() - otp_record.created_at).total_seconds())
        return jsonify({"message": f"Please wait {remaining} seconds before resending OTP."}), 429

    otp_code = generate_otp()
    if otp_record:
        otp_record.code = otp_code
        otp_record.created_at = datetime.utcnow()
    else:
        otp_record = OTP(code=otp_code, user_id=user.id)
        db.session.add(otp_record)

    db.session.commit()

    email_body = f"""Dear {user.full_name},

Your new ORPP Login OTP is: {otp_code}
It will expire in 5 minutes.

Regards,
ORPP Team
"""
    send_email("Your ORPP Login OTP", email_body, user.email)

    return jsonify({"message": "New OTP sent to your email."}), 200

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Email not found."}), 404

    otp_code = generate_otp()
    otp = OTP.query.filter_by(user_id=user.id).first()
    if otp:
        otp.code = otp_code
        otp.created_at = datetime.utcnow()
    else:
        otp = OTP(code=otp_code, user_id=user.id)
        db.session.add(otp)

    db.session.commit()

    email_body = f"""Dear {user.full_name},

Your ORPP Password Reset OTP is: {otp_code}
It will expire in 5 minutes.

If you did not request this, please contact ORPP support.

Regards,
ORPP Team
"""
    send_email("ORPP Password Reset OTP", email_body, user.email)

    return jsonify({"message": "OTP sent to your email."}), 200

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    otp_entered = data.get('otp')
    new_password = data.get('new_password')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Email not found."}), 404

    otp_record = OTP.query.filter_by(user_id=user.id).first()
    if not otp_record:
        return jsonify({"message": "No OTP found."}), 404

    if (datetime.utcnow() - otp_record.created_at) > timedelta(minutes=5):
        db.session.delete(otp_record)
        db.session.commit()
        return jsonify({"message": "OTP expired."}), 400

    if otp_record.code != otp_entered:
        return jsonify({"message": "Incorrect OTP."}), 401

    user.set_password(new_password)
    db.session.delete(otp_record)
    db.session.commit()

    return jsonify({"message": "Password reset successful."}), 200
