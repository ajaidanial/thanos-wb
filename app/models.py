from django.db import models


class User(models.Model):
    user_name = models.CharField(primary_key=True, max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email_id = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    created_date = models.DateTimeField()
