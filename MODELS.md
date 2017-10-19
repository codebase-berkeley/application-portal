# Models Documentation

## Question Model
- question_text: The text that the question will display
- question_type: String representation of the question type. Use the same string as the class name (i.e. the string type for Radio Buttons should be Radiobutton because that's what the class name for it is
-  options: a string representation of a python list - The list of NJ, TX, FL should be stored as ['NJ', 'NY', 'CA']. Groups that need to store and read the options should write a utility method to convert between the string representation and a python list. There is a built in python method that can help you do this, or you can iterate over the characters of the string and do it yourself. Options will be None if there are no options for that type of question (i.e. Paragraph). Remember that we opted not to make option its own model because it would complicate the code a bit, so we made it a simple string that can be turned into a python list quickly. It would be great if we could just store python lists in the database, but unfortunately this is not possible, hence the string.
-  order_number: Where on the application form this question should appear, in relation to other questions. Should start at 1 and all entries should be unique. The question that has number 1 would appear first, the one that has number 2 would be second and so on.

## Models that inherit from Question (i.e. Paragraph, Checkbox, etc.)
- To select all of the questions use Question.objects.all()
- This will return all of the questions, but you can't use instanceof or look at the class name (they will only be Question type because of the way you looked them up). The only way to distinguish these is by looking at the question.question_type string
- Another way to do it would be selecting all of the different types of questions (i.e. checkboxes = Checkbox.objects.all(), paragraphs = Paragraphs.objects.all(), ...)
- When creating questions, you should create the instance of the question type it is. This means that a pargraph should be created with:  paragraph = Paragraph(question_text="How are you?", question_type="Paragraph", options = None, order_number=1) followed by a paragraph.save()
- We're going to discuss on Sunday whether these were really  a good idea. It might just be better to store the question_type in the Question model and get rid of these, but we'll talk about it Sunday
