import { Schema, arrayOf } from 'normalizr';

const application = new Schema('applications');
const category = new Schema('categories');
const question = new Schema('questions');
const form = new Schema('forms');

form.define({
  questions: arrayOf(question),
  categories: arrayOf(category),
});

export const applicationSchema = application;
export const categorySchema = category;
export const questionSchema = question;
export const formSchema = form;
