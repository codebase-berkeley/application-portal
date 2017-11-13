from django.db import models
from django.contrib.auth.models import User
import ast


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class Application(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.CharField(max_length=40)
    read = models.BooleanField()
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL)
    rating = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.first_name + " " + self.last_name + " (" + self.email + ")"


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_text = models.TextField(max_length=1000)
    published_date = models.DateTimeField()
    applicant = models.ForeignKey(Application, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username + " (about " + self.applicant.first_name + " " + self.applicant.last_name + ")" + ": " + self.comment_text[0:30] + "..."


class Question(models.Model):
    @classmethod
    def isinstance(cls, question):
        """
        Convenience function for checking if a question object is a <Question Class>.
        This is inherited by Radiobutton, Checkbox, Dropdown, and Paragraph, and intended to be used
        by those classes, **not by the Question class**! Example usage:

        >>> from portal.models import Radiobutton, Checkbox
        >>> q1 = Radiobutton.create("This is a radio button question", ["Yes", "No"])
        >>> q2 = Dropdown.create("This is a dropdown question", ["Yeah", "Nah"])
        >>> Radiobutton.isinstance(q1)
        True
        >>> Radiobutton.isinstance(q2)
        False
        >>> Dropdown.isinstance(q1)
        False
        >>> Dropdown.isinstance(q2)
        True

        :param question: Question object.
        :return: True if the question is a <Question class>, else false.
        """
        return question.question_type == cls.__name__
    question_text = models.TextField()
    question_type = models.TextField() # added this to make determining the Question easier. Use same string as the class name
    options = models.TextField(null=True, blank=True)
    order_number = models.IntegerField(null=True, blank=True) # make it unique later, can cause some annoying problems during dev to make unique

    def get_options_list(self):
        """
        Convenience function for returning the list version of the options string.
        Modifying this list will not change the options field of the Question! Use Question.set_options_list for that.
        :return: (list) List version of Question.options.
        """
        if self.options:
            return ast.literal_eval(self.options)
        return []

    def set_options_list(self, options_list):
        """
        Convenience function to allow setting the options string by passing in a list.
        :param options_list: (list) Options list, a list of strings.
        :return:
        """
        if not isinstance(options_list, list):
            raise Exception("Question.set_options_list requires a list")
        self.options = options_list.__str__()

    def __str__(self):
        return self.question_text[0:40]

class Radiobutton(Question):
    @classmethod
    def create(cls, question_text, options):
        """
        Convenience function for creating a Radiobutton question.
        :param question_text: (str) The question text to display.
        :param options: (list) A list of string options.
        :return: Radiobutton object.
        """
        q = cls(
            question_text=question_text,
            question_type=cls.__name__,
            options=options.__str__()
        )
        return q
    def __str__(self):
        return "<RadioButton>: " + self.question_text


class Checkbox(Question):
    @classmethod
    def create(cls, question_text, options):
        """
        Convenience function for creating a Checkbox question.
        :param question_text: (str) The question text to display.
        :param options: (list) A list of string options.
        :return: Checkbox object.
        """
        q = cls(
            question_text=question_text,
            question_type=cls.__name__,
            options=options.__str__()
        )
        return q
    def __str__(self):
        return "<CheckBox>: " + self.question_text


class Dropdown(Question):
    @classmethod
    def create(cls, question_text, options):
        """
        Convenience function for creating a Dropdown question.
        :param question_text: (str) The question text to display.
        :param options: (list) A list of string options.
        :return: Dropdown object.
        """
        q = cls(
            question_text=question_text,
            question_type=cls.__name__,
            options=options.__str__()
        )
        return q
    def __str__(self):
        return "<Dropdown>: " + self.question_text


class Paragraph(Question):
    @classmethod
    def create(cls, question_text):
        """
        Convenience function for creating a Paragraph question.
        :param question_text: (str) The question text to display.
        :return: Checkbox object.
        """
        q = cls(
            question_text=question_text,
            question_type=cls.__name__,
            options=None
        )
        return q
    def __str__(self):
        return "<Paragraph>: " + self.question_text


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    answer_text = models.TextField(max_length=2000)

    def __str__(self):
        return self.application.first_name + " (" + self.question.question_text[0:20] + "...): " + self.answer_text[0:20] + "..."


class Assignment(models.Model):
    applicant = models.ForeignKey(Application, on_delete=models.CASCADE)
    exec_user = models.ForeignKey(User, on_delete=models.CASCADE)