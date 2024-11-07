from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    bio = db.Column(db.String(255))
    profile_picture = db.Column(db.String(255))
    birthdate = db.Column(db.Integer)  
    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False )
    updated_at = db.Column(db.DateTime, nullable=False )

    def __repr__(self):
        return f'<User {self.id} - {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'bio': self.bio,
                'profile_picture': self.profile_picture,
                'birthdate': self.birthdate,
                'is_active': self.is_active,
                'created_at': self.created_at,
                'updated_at': self.updated_at}
 

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    author_to = db.relationship('Users', foreign_keys=[author_id], backref=db.backref('post_to', lazy='select'))

    def __repr__(self):
        return f'<Post {self.id} - {self.title}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'content': self.content,
                'created_at': self.created_at,
                'author_id': self.author_id,
                'author_name': self.author_to.email}

 
class Comments(db.Model):
     id = db.Column(db.Integer, primary_key=True)
     content = db.Column(db.Text, nullable=False)
     created_at = db.Column(db.DateTime, nullable=False)
     author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
     post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
     author_to =db.relationship('Users', foreign_keys=[author_id], backref=db.backref('comments_to', lazy='select'))
     post_to =db.relationship('Posts', foreign_keys=[post_id],  backref=db.backref('comments_to', lazy='select'))

     def __repr__(self):
        return f'<Comment {self.id} - {self.content[:20]}>'

     def serialize(self):
        return {'id': self.id,
                'content': self.content,
                'created_at': self.created_at,
                'author_id': self.author_id,
                'post_id': self.post_id}


class Friendships(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False)
    requester_to = db.relationship('Users', foreign_keys=[requester_id], backref=db.backref('requester_to', lazy='select'))
    receiver_to = db.relationship('Users', foreign_keys=[receiver_id], backref=db.backref('receiver_to', lazy='select'))

    def __repr__(self):
        return f'<Friendship {self.id} - Requester: {self.requester_id}, Receiver: {self.receiver_id}>'

    def serialize(self):
        return {'id': self.id,
                'requester_id': self.requester_id,
                'receiver_id': self.receiver_id,
                'status': self.status,
                'created_at': self.created_at}    
