class Config:
    SECRET_KEY = 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///orpp.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USE_TLS = False
    MAIL_USERNAME = 'muhsin.ali.abdullahi@gmail.com'
    MAIL_PASSWORD = 'uewv klbw cmyd pwlu'
    MAIL_DEFAULT_SENDER = 'muhsin.ali.abdullahi@gmail.com'
