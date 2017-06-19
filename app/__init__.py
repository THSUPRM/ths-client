from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_assets import Environment, Bundle

# Flask Init
app = Flask(__name__)  # create the application instance :)
app.config.from_object('config')

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

# Flask-Assets Bundle Registration
assets = Environment(app)

vendor_bundle = Bundle(
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/moment/moment.js',
    filters='rjsmin',
    output='build/vendor.min.js'
)
assets.register('vendor', vendor_bundle)

app_bundle = Bundle(
    './app.module.js',
    './app.controller.js',
    'app/tweets/tweets.module.js',
    'app/tweets/tweets.controller.js',
    'app/tweets/tweets.factory.js',
    'app/auth/auth.module.js',
    'app/auth/auth.controller.js',
    'app/auth/auth.factory.js',
    filters='rjsmin',
    output='build/app.min.js'
)
assets.register('app', app_bundle)

style_bundle = Bundle(
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
    'bower_components/font-awesome/css/font-awesome.css',
    filters='cssmin',
    output='build/style.min.css'
)

assets.register('style', style_bundle)

bundles = [vendor_bundle, app_bundle, style_bundle]


@app.route('/')
@app.route('/home')
@app.route('/about')
@app.route('/register')
@app.route('/login')
@app.route('/tweets')
def home():
    return render_template('index.html')

# Import auth module using its blueprint handler variable (auth_module)
from app.auth.controllers import auth_module

# Register auth Blueprint
app.register_blueprint(auth_module)

# Create DB Schema
db.create_all()

