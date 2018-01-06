from django.db import models
from django.contrib.auth.models import User
import ast
import json


class Form(models.Model):
    name = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    archived = models.BooleanField()
    published = models.BooleanField()

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=40)
    form = models.ForeignKey(Form, on_delete=models.CASCADE)

    def __str__(self):
        return "{}::Form::{}".format(self.name, self.form)


class Application(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE)
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
    RADIOBUTTON = 'Radiobutton'
    PARAGRAPH = 'Paragraph'
    CHECKBOX = 'Checkbox'
    DROPDOWN = 'Dropdown'

    @classmethod
    def create_paragraph(cls, question_text, form):
        """
        Convenience function for creating a Paragraph question.
        :param question_text: (str) The question text to display.
        :param: form_id: (Form) The foreign key of the associated form.
        :return: Question object.
        """
        return cls(
            form=form,
            question_text=question_text,
            question_type=cls.PARAGRAPH,
            options=None
        )

    @classmethod
    def create_radiobutton(cls, question_text, options, form):
        """
        Convenience function for creating a Radiobutton question.
        :param question_text: (str) The question text to display.
        :param options: (list) A list of string options.
        :param: form_id: (Form) The foreign key of the associated form.
        :return: Question object.
        """
        return cls(
            form=form,
            question_text=question_text,
            question_type=cls.RADIOBUTTON,
            options=json.dumps(options)
        )

    @classmethod
    def create_dropdown(cls, question_text, options, form):
        """
        Convenience function for creating a Dropdown question.
        :param question_text: (str) The question text to display.
        :param options: (list) A list of string options.
        :param: form_id: (Form) The foreign key of the associated form.
        :return: Question object.
        """
        return cls(
            form=form,
            question_text=question_text,
            question_type=cls.DROPDOWN,
            options=json.dumps(options)
        )

    @classmethod
    def create_checkbox(cls, question_text, options, form):
        """
        Convenience function for creating a Checkbox question.
        :param question_text: (str) The question text to display.
        :param options: (list) A list of string options.
        :param: form_id: (Form) The foreign key of the associated form.
        :return: Question object.
        """
        return cls(
            form=form,
            question_text=question_text,
            question_type=cls.CHECKBOX,
            options=json.dumps(options)
        )

    form = models.ForeignKey(Form, on_delete=models.CASCADE)
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
        self.options = json.dumps(options_list)

    def __str__(self):
        return self.question_text[0:40]

class Radiobutton(Question):
    @classmethod
    def create(cls, question_text, options, form_id):
        """
        Convenience function for creating a Radiobutton question.
        :param question_text: (str) The question text to display.
        :param options: (list) A list of string options.
        :param: form_id: (Form) The foreign key of the associated form.
        :return: Radiobutton object.
        """
        q = cls(
            form=form_id,
            question_text=question_text,
            question_type=cls.__name__,
            options=json.dumps(options)
        )
        return q
    def __str__(self):
        return "<RadioButton>: " + self.question_text


class Checkbox(Question):
    @classmethod
    def create(cls, question_text, options, form_id):
        """
        Convenience function for creating a Checkbox question.
        :param question_text: (str) The question text to display.
        :param options: (list) A list of string options.
        :param: form_id: (Form) The foreign key of the associated form.
        :return: Checkbox object.
        """
        q = cls(
            form=form_id,
            question_text=question_text,
            question_type=cls.__name__,
            options=json.dumps(options)
        )
        return q
    def __str__(self):
        return "<CheckBox>: " + self.question_text


class Dropdown(Question):
    @classmethod
    def create(cls, question_text, options, form_id):
        """
        Convenience function for creating a Dropdown question.
        :param question_text: (str) The question text to display.
        :param options: (list) A list of string options.
        :param: form_id: (Form) The foreign key of the associated form.
        :return: Dropdown object.
        """
        q = cls(
            form=form_id,
            question_text=question_text,
            question_type=cls.__name__,
            options=json.dumps(options)
        )
        return q
    def __str__(self):
        return "<Dropdown>: " + self.question_text


class Paragraph(Question):
    @classmethod
    def create(cls, question_text, form_id):
        """
        Convenience function for creating a Paragraph question.
        :param question_text: (str) The question text to display.
        :param: form_id: (Form) The foreign key of the associated form.
        :return: Checkbox object.
        """
        q = cls(
            form=form_id,
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