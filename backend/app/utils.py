from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import timedelta
import random
import smtplib
from email.message import EmailMessage
from flask import current_app

def generate_access_token(identity):
    expires = timedelta(hours=24)
    return create_access_token(identity=identity, expires_delta=expires)

def generate_refresh_token(identity):
    expires = timedelta(days=7)
    return create_refresh_token(identity=identity, expires_delta=expires)

def generate_otp():
    return str(random.randint(100000, 999999))

def send_email(subject, body, recipient):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = current_app.config['MAIL_DEFAULT_SENDER']
    msg['To'] = recipient
    msg.set_content(body)

    with smtplib.SMTP(current_app.config['MAIL_SERVER'], current_app.config['MAIL_PORT']) as server:
        server.starttls()
        server.login(current_app.config['MAIL_USERNAME'], current_app.config['MAIL_PASSWORD'])
        server.send_message(msg)
