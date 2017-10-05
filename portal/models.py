from django.db import models


# Create your models here.
class Animal(models.Model):
    name = models.CharField(max_length=30)

class Dog(models.Model):
    fur = models.CharField(max_length=30)

class Chicken(models.Model):
    tasty = models.CharField(max_length=30)

class Cat(models.Model):
    sound = models.CharField(max_length=30)