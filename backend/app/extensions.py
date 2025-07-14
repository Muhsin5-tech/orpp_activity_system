from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()
jwt = JWTManager()
cors = CORS()
mail = Mail()
