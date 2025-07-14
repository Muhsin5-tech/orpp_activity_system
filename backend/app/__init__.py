from flask import Flask
from .extensions import migrate, db, ma, jwt, cors, mail
from app.auth.routes import auth_bp
from app.activities.routes import activity_bp
from app.users.routes import user_bp  # ✅ User routes

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")  # ✅ Load config

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, supports_credentials=True, origins=["http://localhost:5173"], methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    mail.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(activity_bp, url_prefix="/api")
    app.register_blueprint(user_bp, url_prefix="/api/users") 

    @app.route("/")
    def index():
        return {"message": "ORPP Activity Management API running."}

    return app
