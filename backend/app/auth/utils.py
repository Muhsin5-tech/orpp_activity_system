from flask_mail import Message
from flask import current_app
from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import timedelta
import random

def generate_otp():
    return str(random.randint(100000, 999999))

def send_email(subject, body, recipient):
    from app.extensions import mail
    try:
        msg = Message(subject=subject,
                      sender=current_app.config['MAIL_DEFAULT_SENDER'],
                      recipients=[recipient],
                      body=body)
        mail.send(msg)
    except Exception as e:
        print(f"Failed to send email: {e}")

def generate_access_token(identity):
    expires = timedelta(hours=24)
    return create_access_token(identity=identity, expires_delta=expires)

def generate_refresh_token(identity):
    expires = timedelta(days=7)
    return create_refresh_token(identity=identity, expires_delta=expires)
