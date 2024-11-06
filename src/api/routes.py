"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Comments, Friendships
from datetime import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200

@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    if not user:
        response_body['message'] = "Bad email or password"
        return response_body, 401
    access_token = create_access_token(identity={'email': user.email, 'id': user.id})
    response_body['message'] = f'Usuario {email} logeado con éxito'
    response_body['access_token'] = access_token
    response_body['user'] = user.serialize()
    return response_body, 200


@api.route("/signup", methods=["POST"])
def signup():
    response_body = {}
    body = request.json
    user = Users(email=body['email'],
                 password=body['password'],
                 created_at=datetime.now(),
                 updated_at=datetime.now())
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity={'email': user.email, 'id': user.id})
    response_body["access_token"]=access_token
    response_body["user"]=user.serialize()
    return response_body, 200



# User endpoints
@api.route('/users', methods=['GET'])
def handle_users():
    if request.method == 'GET':
        users = Users.query.all()
        return jsonify([user.serialize() for user in users]), 200


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
    user = Users.query.get(user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    if request.method == 'GET':
        return jsonify(user.serialize()), 200
    elif request.method == 'PUT':
        body = request.json
        user.email = body.get('email', user.email)
        user.password = body.get('password', user.password)
        user.bio = body.get('bio', user.bio)
        user.profile_picture = body.get('profile_picture', user.profile_picture)
        user.birthdate = body.get('birthdate', user.birthdate)
        user.updated_at = datetime.now()
        db.session.commit()
        return jsonify(user.serialize()), 200
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted'}), 204


# Post endpoints
@api.route('/posts', methods=['POST', 'GET'])
def handle_posts():
    if request.method == 'GET':
        posts = Posts.query.all()
        return jsonify([post.serialize() for post in posts]), 200
    elif request.method == 'POST':
        body = request.json
        new_post = Posts(
            title=body['title'],
            content=body['content'],
            created_at=datetime.now(),
            author_id=body['author_id']
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.serialize()), 201


@api.route('/posts/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_post(post_id):
    post = Posts.query.get(post_id)
    if post is None:
        return jsonify({'message': 'Post not found'}), 404

    if request.method == 'GET':
        return jsonify(post.serialize()), 200
    elif request.method == 'PUT':
        body = request.json
        post.title = body.get('title', post.title)
        post.content = body.get('content', post.content)
        post.updated_at = datetime.now()
        db.session.commit()
        return jsonify(post.serialize()), 200
    elif request.method == 'DELETE':
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post deleted'}), 204


# Comment endpoints
@api.route('/comments', methods=['POST', 'GET'])
def handle_comments():
    if request.method == 'GET':
        comments = Comments.query.all()
        return jsonify([comment.serialize() for comment in comments]), 200
    elif request.method == 'POST':
        body = request.json
        new_comment = Comments(
            content=body['content'],
            created_at=datetime.now(),
            author_id=body['author_id'],
            post_id=body['post_id']
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.serialize()), 201


@api.route('/comments/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_comment(comment_id):
    comment = Comments.query.get(comment_id)
    if comment is None:
        return jsonify({'message': 'Comment not found'}), 404

    if request.method == 'GET':
        return jsonify(comment.serialize()), 200
    elif request.method == 'PUT':
        body = request.json
        comment.content = body.get('content', comment.content)
        comment.updated_at = datetime.now()
        db.session.commit()
        return jsonify(comment.serialize()), 200
    elif request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted'}), 204


# Friendship endpoints
@api.route('/friendships', methods=['POST', 'GET'])
def handle_friendships():
    if request.method == 'GET':
        friendships = Friendships.query.all()
        return jsonify([friendship.serialize() for friendship in friendships]), 200
    elif request.method == 'POST':
        body = request.json
        new_friendship = Friendships(
            requester_id=body['requester_id'],
            receiver_id=body['receiver_id'],
            created_at=datetime.now(),
            status=body.get('status', False)
        )
        db.session.add(new_friendship)
        db.session.commit()
        return jsonify(new_friendship.serialize()), 201


@api.route('/friendships/<int:friendship_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_friendship(friendship_id):
    friendship = Friendships.query.get(friendship_id)
    if friendship is None:
        return jsonify({'message': 'Friendship not found'}), 404

    if request.method == 'GET':
        return jsonify(friendship.serialize()), 200
    elif request.method == 'PUT':
        body = request.json
        friendship.status = body.get('status', friendship.status)
        friendship.updated_at = datetime.now()
        db.session.commit()
        return jsonify(friendship.serialize()), 200
    elif request.method == 'DELETE':
        db.session.delete(friendship)
        db.session.commit()
        return jsonify({'message': 'Friendship deleted'}), 204

