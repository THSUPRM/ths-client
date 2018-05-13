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
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/moment/moment.js',
    filters='rjsmin',
    output='build/vendor.min.js'
)
assets.register('vendor', vendor_bundle)

app_bundle = Bundle(
    './app.module.js',
    './app.factory.js',
    './app.controller.js',
    'app/tweets/tweets.module.js',
    'app/tweets/tweets.controller.js',
    'app/tweets/tweets.factory.js',
    'app/auth/auth.module.js',
    'app/auth/auth.controller.js',
    'app/auth/auth.factory.js',
    'app/profile/profile.module.js',
    'app/profile/profile.controller.js',
    'app/profile/profile.factory.js',
    'app/about/about.module.js',
    'app/about/about.controller.js',
    'app/about/about.factory.js',
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
@app.route('/tweet')
@app.route('/profile')
def home():
    return render_template('index.html')


# Import modules using its blueprint handler variable
from app.controllers.auth_controller import auth_module
from app.controllers.tweets_controller import tweets_module
from app.controllers.labels_controller import labels_module
from app.controllers.profile_controller import profile_module

# Register auth Blueprint
app.register_blueprint(auth_module)
app.register_blueprint(tweets_module)
app.register_blueprint(labels_module)
app.register_blueprint(profile_module)

# Create DB Schema
db.create_all()

