import { Schema, arrayOf } from 'normalizr';

const application = new Schema('applications');
const category = new Schema('categories');
const question = new Schema('questions');
const form = new Schema('forms');

category.define({
  applications: arrayOf(application),
});
form.define({
  questions: arrayOf(question),
});

export const applicationSchema = application;
export const categorySchema = category;
export const questionSchema = question;
export const formSchema = form;
