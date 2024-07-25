import os

import face_recognition
from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=120, blank=True, null=True)

    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    face_encoding = models.BinaryField(blank=True, null=True)

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)
        if self.photo and os.path.isfile(self.photo.path):
            image = face_recognition.load_image_file(self.photo.path)
            encodings = face_recognition.face_encodings(image)
            if encodings:
                self.face_encoding = encodings[0].tobytes()
                # Сохранение face_encoding
                super(Profile, self).save(update_fields=['face_encoding'])

    def __str__(self):
        return self.user.username
