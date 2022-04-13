"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

#------------------------ Ruta de usuarios ----------------------------------------#
@api.route('/users', methods=['GET'])
def get_all_users():

    all_users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), all_users))

    if not all_users: return jsonify({"msg": "No hay usuarios"}, all_users), 200

    else: return jsonify({"msg": "Todos los suarios han sido econtrados"}, all_users), 200

# @api.route('/users/delete', methods=['DELETE'])
# def delete_all_users():

#     users = User.query.all()
#     for user in users:
#         user.delete()

#     return jsonify({"msg": "Usuarios han sido eliminados"}), 200

# @api.route('/users/delete/<int:id>', methods=['GET', 'PUT', 'DELETE'])
# def delete_a_user(id):

#     if id is not None:
#         users = User.query.get(id)
#         users.delete()

#     return jsonify({"msg": "El usuario ha sido eliminado"}), 200

#--------------------------- Ruta de registro ----------------------------------------#  
@api.route('/signup', methods=['POST'])
def signup():
    
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(email=email).first()

        if not first_name: return jsonify({"msg": "Usuario ya existe ó el nombre es requerido"}), 400
        if not last_name: return jsonify({"msg": "Usuario ya existe ó el apellido es requerido"}), 400
        if not email: return jsonify({"msg": "Usuario ya existe ó el email es requerido"}), 400
        if not password: return jsonify({"msg": "Usuario ya existe ó el password es requerido"}), 400

        if user: return jsonify({"msg": "Usuario ya existe"}), 400
        
        user = User()
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.password = generate_password_hash(password)
        user.save()

        if not check_password_hash(user.password, password): return jsonify({"msg": "email/password son incorrectos"}), 400

        access_token = create_access_token(identity=user.id)

        data = {
            "access_token": access_token,
            "user": user.serialize()
        }

        if user: return jsonify(data), 201
    
#--------------------------- Ruta de login ----------------------------------------#
@api.route('/login', methods=['POST'])
def login():

    if request.method == 'POST':

        email = request.form['email']
        password = request.form['password']
        
        if not email: return jsonify({"msg": "Email del usuario es requerido!"}), 400
        if not password: return jsonify({"msg": "Password es requerido!"}), 400

        user = User.query.filter_by(email=email).first()

        if not user: return jsonify({"msg": "email/password son incorrectos"}), 400
        if not check_password_hash(user.password, password): return jsonify({"msg": "email/password son incorrectos"}), 400

        access_token = create_access_token(identity=user.id)

        data = {
            "access_token": access_token,
            "user": user.serialize()
        }
       
        return jsonify(data), 200
    
    else:
        return jsonify({"msg": "Inicio de sesión invalido"}),

#---------------------------Ruta Privda ----------------------------------------#
# @api.route('/private', methods=['GET','POST'])
# @jwt_required()
# def private_route():

#     if request.method == 'POST':

#         email = request.form['email']
#         password = request.form['password']
        
#         if not email: return jsonify({"msg": "Email del usuario es requerido!"}), 400
#         if not password: return jsonify({"msg": "Password es requerido!"}), 400

#         user = User.query.filter_by(email=email).first()

#         if not user: return jsonify({"msg": "email/password son incorrectos"}), 400
#         if not check_password_hash(user.password, password): return jsonify({"msg": "email/password son incorrectos"}), 400

#         access_token = create_access_token(identity=user.id)

#         data = {
#             "access_token": access_token,
#             "user": user.serialize()
#         }
       
#         return jsonify(data), 200
    
#     else:
#         return jsonify({"msg": "Inicio de sesión invalido"}),