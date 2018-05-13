from flask import request, g, Blueprint, Response

# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.models.auth_model import User

# Define the blueprint: 'profile', set its url prefix: app.url/profile
profile_module = Blueprint('profile', __name__, url_prefix='/profile')


@profile_module.route('/update-name', methods=['POST'])
def update_name():
    req = request
    user = User.query.filter_by(username=request.json['username']).first()

    if user:
        user.first = request.json['newName']
        db.session.commit()
        return Response(user.get_fields(), status=200, mimetype='application/json')
    else:
        message = 'Username does not exists'
        return Response(message, status=404, mimetype='application/text')


@profile_module.route('/update-last', methods=['POST'])
def update_last():
    req = request
    user = User.query.filter_by(username=request.json['username']).first()

    if user:
        user.last = request.json['newLast']
        db.session.commit()
        return Response(user.get_fields(), status=200, mimetype='application/json')
    else:
        message = 'Username does not exists'
        return Response(message, status=404, mimetype='application/text')


@profile_module.route('/update-email', methods=['POST'])
def update_email():
    user = User.query.filter_by(username=request.json['username']).first()

    if user:
        user.email = request.json['newEmail']
        db.session.commit()
        return Response(user.get_fields(), status=200, mimetype='application/json')
    else:
        message = 'Username does not exists'
        return Response(message, status=404, mimetype='application/text')
