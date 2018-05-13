from flask import request, g, Blueprint, Response
from flask_login import LoginManager, login_user, logout_user, current_user

# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.models.auth_model import User

# Define the blueprint: 'auth', set its url prefix: app.url/auth
auth_module = Blueprint('auth', __name__, url_prefix='/auth')

# Initialize flask_login's manager
login_manager = LoginManager()
login_manager.init_app(app)


@auth_module.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]
    registered_user = User.query.filter_by(email=email).first()
    curr = current_user
    app.logger.info('Current User: ' + str(current_user))
    if registered_user is None: #and bcrypt.check_password_hash(registered_user.password, password):
        message = 'Username or Password is invalid'
        app.logger.error('POST /auth/login HTTP/1.1 401 Unauthorized - ' + message)
        resp = Response(message, status=401, mimetype='application/text')
        return resp
    login_user(registered_user)
    user = User(registered_user.first, registered_user.last, registered_user.username, registered_user.email, None)
    user.id = registered_user.id
    return Response(user.get_fields(), status=200, mimetype='application/json')


@auth_module.route('/logout')
def logout():
    logout_user()
    return Response("Logging out...", status=200, mimetype='application/text')


@auth_module.route('/register', methods=['POST'])
def register():
    req = request
    user = User(request.json['first'], request.json['last'], request.json['username'], request.json['email'], request.json['password'])
    username_result = User.query.filter_by(username=request.json['username']).first()
    email_result = User.query.filter_by(email=request.json['email']).first()

    if username_result is None and email_result is None:
        db.session.add(user)
        db.session.commit()
        return Response(user.get_fields(), status=200, mimetype='application/json')
    else:
        if username_result != request.json['username']:
            message = 'Email already exists'
        else:
            message = 'Username already exists'
        return Response(message, status=409, mimetype='application/text')




@auth_module.before_request
def before_request():
    g.user = current_user


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))
