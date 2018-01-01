/* Example server responses. */

export const EXAMPLE_FORMS = {
  'forms': [
    {
      'id': 4,
      'name': 'Consulting Spring 2018',
      'created_at': '2017/12/07 17:55:48 +0000',
      'archived': false,
      'questions': [
        {
          'id': 1,
          'form': 4,
          'question_text': 'Check the classes you have taken:',
          'question_type': 'Checkbox',
          'options': '["CS61A","CS61B","CS61C"]',
          'order_number': 0,
        },
        {
          'id': 2,
          'form': 4,
          'question_text': 'Why CodeBase?',
          'question_type': 'Paragraph',
          'options': '',
          'order_number': 1,
        },
      ],
      'categories': [
        {
          'id': 1,
          'form': 4,
          'name': 'Received',
        },
        {
          'id': 2,
          'form': 4,
          'name': 'Accepted',
        },
        {
          'id': 3,
          'form': 4,
          'name': 'Rejected',
        },
      ],
    },
    {
      'id': 3,
      'name': 'Mentored Spring 2018',
      'created_at': '2017/12/07 17:55:00 +0000',
      'archived': false,
      'questions': [
        {
          'id': 3,
          'form': 3,
          'question_text': 'Check the classes you have taken:',
          'question_type': 'Checkbox',
          'options': '["CS61A","CS61B","CS61C"]',
          'order_number': 0,
        },
        {
          'id': 4,
          'form': 3,
          'question_text': 'Why CodeBase?',
          'question_type': 'Paragraph',
          'options': '',
          'order_number': 1,
        },
      ],
      'categories': [
        {
          'id': 4,
          'form': 3,
          'name': 'Received',
        },
        {
          'id': 5,
          'form': 3,
          'name': 'Accepted',
        },
        {
          'id': 6,
          'form': 3,
          'name': 'Rejected',
        },
      ],
    },
    {
      'id': 2,
      'name': 'Consulting Fall 2017',
      'created_at': '2017/08/07 17:55:48 +0000',
      'archived': false,
      'questions': [
        {
          'id': 5,
          'form': 2,
          'question_text': 'Check the classes you have taken:',
          'question_type': 'Checkbox',
          'options': '["CS170","CS162","CS189"]',
          'order_number': 1,
        },
      ],
      'categories': [
        {
          'id': 7,
          'form': 2,
          'name': 'Received',
        },
        {
          'id': 8,
          'form': 2,
          'name': 'Accepted',
        },
      ],
    },
    {
      'id': 1,
      'name': 'Mentored Fall 2017',
      'created_at': '2017/08/07 17:30:00 +0000',
      'archived': false,
      'questions': [
        {
          'id': 6,
          'form': 1,
          'question_text': "What's something that technology could improve?",
          'question_type': 'Paragraph',
          'options': '',
          'order_number': 1,
        },
      ],
      'categories': [
        {
          'id': 9,
          'form': 1,
          'name': 'Received',
        },
        {
          'id': 10,
          'form': 1,
          'name': 'Accepted',
        },
      ],
    },
  ],
};

/*
Page 1 of applications for category 1.
"/applications?category=1&page=1"
*/
export const EXAMPLE_CAT1_PAGE1 = {
  'page': 1,
  'num_pages': 3,
  'applications': [
    {
      'id': 1,
      'category': 1,
      'form': 4,
      'email': 'andrewkchan@berkeley.edu',
      'first_name': 'Andrew',
      'last_name': 'Chan',
      'read': false,
      'answers': {
        '1': {
          'id': 1,
          'application': 1,
          'question': 1,
          'answer_text': '["CS61A","CS61B"]',
        },
        '2': {
          'id': 2,
          'application': 1,
          'question': 2,
          'answer_text': 'Because all the members are really smart and good looking',
        },
      },
    },
    {
      'id': 2,
      'category': 1,
      'form': 4,
      'email': 'bdeleonardis@berkeley.edu',
      'first_name': 'Brian',
      'last_name': 'DeLeonardis',
      'read': false,
      'answers': {
        '3': {
          'id': 3,
          'application': 2,
          'question': 1,
          'answer_text': '["CS61A"]',
        },
        '4': {
          'id': 4,
          'application': 2,
          'question': 2,
          'answer_text': "Because it's super cool and awesome",
        },
      },
    },
    {
      'id': 3,
      'category': 1,
      'form': 4,
      'email': 'kushrast@berkeley.edu',
      'first_name': 'Kush',
      'last_name': 'Rastogi',
      'read': false,
      'answers': {
        '5': {
          'id': 5,
          'application': 3,
          'question': 1,
          'answer_text': '["CS61A","CS61B","CS61C"]',
        },
        '6': {
          'id': 6,
          'application': 3,
          'question': 2,
          'answer_text': 'Because there are hella brown ppl',
        },
      },
    },
  ]
};

export const EXAMPLE_CAT1_PAGE2 = {
  'page': 2,
  'num_pages': 3,
  'applications': [
    {
      'id': 4,
      'category': 1,
      'form': 4,
      'email': 'akhare@berkeley.edu',
      'first_name': 'Abhishyant',
      'last_name': 'Khare',
      'read': true,
      'answers': {
        '7': {
          'id': 7,
          'application': 4,
          'question': 1,
          'answer_text': '["CS61A","CS61B","CS61C"]',
        },
        '8': {
          'id': 8,
          'application': 4,
          'question': 2,
          'answer_text': 'Because I am the president',
        },
      },
    },
    {
      'id': 5,
      'category': 1,
      'form': 4,
      'email': 'ivonliu@berkeley.edu',
      'first_name': 'Ivon',
      'last_name': 'Liu',
      'read': true,
      'answers': {
        '9': {
          'id': 9,
          'application': 5,
          'question': 1,
          'answer_text': '["CS61A","CS61B"]',
        },
        '10': {
          'id': 10,
          'application': 5,
          'question': 2,
          'answer_text': 'I do whatever the fuck I want',
        },
      },
    },
  ]
};

export const EXAMPLE_CAT1_PAGE3 = {
  'page': 3,
  'num_pages': 3,
  'applications': [
    {
      'id': 6,
      'category': 1,
      'form': 4,
      'email': 'kunalkak@berkeley.edu',
      'first_name': 'Kunal',
      'last_name': 'Kak',
      'read': true,
      'answers': {
        '11': {
          'id': 11,
          'application': 6,
          'question': 1,
          'answer_text': '["CS61B"]',
        },
        '12': {
          'id': 12,
          'application': 6,
          'question': 2,
          'answer_text': 'Poopy butthole',
        },
      },
    },
  ]
};
