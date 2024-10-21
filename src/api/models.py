from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Modelo de Usuario (Users)
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    bio = db.Column(db.String(255))
    profile_picture = db.Column(db.String(255))
    birthdate = db.Column(db.Integer)  # Almacena año de nacimiento como número
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
