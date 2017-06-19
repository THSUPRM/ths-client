from flask import request, g, redirect, url_for, flash, Blueprint
from flask_login import LoginManager, login_user, logout_user, current_user

# Import the database object (db) from the main application module
# and the app object to initialize the flask_login manager
from app import app, db
# Import module models (i.e. User)
from app.auth.models import User

# Define the blueprint: 'auth', set its url prefix: app.url/auth
auth_module = Blueprint('auth', __name__, url_prefix='/auth')

# Initialize flask_login's manager
login_manager = LoginManager()
login_manager.init_app(app)


@auth_module.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    registered_user = User.query.filter_by(email=email, password=password).first()
    if registered_user is None:
        flash('Username or Password is invalid', 'error')
        return redirect(url_for('login'))
    login_user(registered_user)
    flash('Logged in successfully')
    return redirect(request.args.get('next') or url_for('home'))


@auth_module.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))


@auth_module.route('/register', methods=['POST'])
def register():
    user = User(request.form['email'], request.form['password'], request.form['first_name'],
                request.form['last_name'])
    db.session.add(user)
    db.session.commit()
    flash('User successfully registered')
    return redirect(url_for('login'))


@auth_module.before_request
def before_request():
    g.user = current_user


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))
