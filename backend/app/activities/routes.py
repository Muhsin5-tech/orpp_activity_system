from flask import Blueprint, request, jsonify, send_from_directory
from app.extensions import db
from app.models import Activity
from flask_jwt_extended import jwt_required
from datetime import datetime
from sqlalchemy import or_
from werkzeug.utils import secure_filename
import os

# Setup upload folder
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

activity_bp = Blueprint("activity_bp", __name__)

@activity_bp.route("/activities", methods=["GET"])
@jwt_required()
def get_activities():
    activities = Activity.query.all()
    result = []
    for a in activities:
        result.append({
            "id": a.id,
            "title": a.title,
            "description": a.description,
            "category": a.category,
            "start_time": a.start_time.isoformat(),
            "end_time": a.end_time.isoformat(),
            "venue": a.venue,
            "department": a.department,
            "member_notes": a.member_notes,
            "attachment": a.attachment,
        })
    return jsonify(result), 200


@activity_bp.route("/activities/<int:id>", methods=["GET"])
@jwt_required()
def get_activity(id):
    activity = Activity.query.get_or_404(id)
    return jsonify({
        "id": activity.id,
        "title": activity.title,
        "description": activity.description,
        "category": activity.category,
        "start_time": activity.start_time.isoformat(),
        "end_time": activity.end_time.isoformat(),
        "venue": activity.venue,
        "department": activity.department,
        "member_notes": activity.member_notes,
        "attachment": activity.attachment,
    }), 200


@activity_bp.route("/activities", methods=["POST"])
@jwt_required()
def create_activity():
    try:
        title = request.form.get("title")
        description = request.form.get("description")
        category = request.form.get("category")
        start_time = request.form.get("start_time")
        end_time = request.form.get("end_time")
        venue = request.form.get("venue")
        department = request.form.get("department")
        member_notes = request.form.get("member_notes")
        attachment_file = request.files.get("attachment")

        if not title or not category or not start_time or not end_time:
            return jsonify({"error": "Missing required fields."}), 400

        attachment_filename = None
        if attachment_file:
            filename = secure_filename(attachment_file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            attachment_file.save(filepath)
            attachment_filename = filename

        new_activity = Activity(
            title=title,
            description=description,
            category=category,
            start_time=datetime.fromisoformat(start_time),
            end_time=datetime.fromisoformat(end_time),
            venue=venue,
            department=department,
            member_notes=member_notes,
            attachment=attachment_filename
        )

        db.session.add(new_activity)
        db.session.commit()

        return jsonify({"message": "Activity created successfully."}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@activity_bp.route("/activities/<int:id>", methods=["PUT"])
@jwt_required()
def update_activity(id):
    activity = Activity.query.get_or_404(id)
    data = request.get_json()

    activity.title = data.get("title", activity.title)
    activity.description = data.get("description", activity.description)
    activity.category = data.get("category", activity.category)
    activity.venue = data.get("venue", activity.venue)
    activity.member_notes = data.get("member_notes", activity.member_notes)
    activity.department = data.get("department", activity.department)
    
    if data.get("start_time"):
        activity.start_time = datetime.fromisoformat(data["start_time"])
    if data.get("end_time"):
        activity.end_time = datetime.fromisoformat(data["end_time"])

    db.session.commit()
    return jsonify({"message": "Activity updated successfully."}), 200


@activity_bp.route("/activities/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_activity(id):
    activity = Activity.query.get_or_404(id)
    db.session.delete(activity)
    db.session.commit()
    return jsonify({"message": "Activity deleted successfully."}), 200


@activity_bp.route("/activities/search", methods=["GET"])
@jwt_required()
def search_activities():
    query = request.args.get("q", "").strip().lower()
    if not query:
        return jsonify([]), 200

    results = Activity.query.filter(
        or_(
            Activity.title.ilike(f"%{query}%"),
            Activity.description.ilike(f"%{query}%"),
            Activity.category.ilike(f"%{query}%"),
            Activity.venue.ilike(f"%{query}%"),
            Activity.department.ilike(f"%{query}%")
        )
    ).all()

    activities_data = []
    for a in results:
        activities_data.append({
            "id": a.id,
            "title": a.title,
            "description": a.description,
            "category": a.category,
            "start_time": a.start_time.isoformat(),
            "end_time": a.end_time.isoformat(),
            "venue": a.venue,
            "member_notes": a.member_notes,
            "department": a.department,
            "attachment": a.attachment,
        })

    return jsonify(activities_data), 200


@activity_bp.route("/uploads/<path:filename>", methods=["GET"])
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)
