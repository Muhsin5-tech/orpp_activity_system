from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import User
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([{
        "id": u.id,
        "full_name": u.full_name,
        "email": u.email,
        "role": u.role,
        "department": u.department,
    } for u in users]), 200

@user_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify({
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "role": user.role,
        "department": user.department,
    })

@user_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()

    user.full_name = data.get('full_name', user.full_name)
    user.department = data.get('department', user.department)
    user.role = data.get('role', user.role)

    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

@user_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200
