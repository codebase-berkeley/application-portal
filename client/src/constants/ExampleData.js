/* Example server responses. */

export const EXAMPLE_FORMS = {
  "forms": [
    {
      "id": 4,
      "name": "Consulting Spring 2018",
      "created_at": "2017/12/07 17:55:48 +0000",
      "archived": false,
      "questions": [
        {
          "id": 1,
          "form": 4,
          "question_text": "Check the classes you have taken:",
          "question_type": "Checkbox",
          "options": "['CS61A', 'CS61B', 'CS61C']",
        },
        {
          "id": 2,
          "form": 4,
          "question_text": "Why CodeBase?",
          "question_type": "Paragraph",
          "options": "",
        },
      ],
    },
    {
      "id": 3,
      "name": "Mentored Spring 2018",
      "created_at": "2017/12/07 17:55:00 +0000",
      "archived": false,
      "questions": [
        {
          "id": 3,
          "form": 3,
          "question_text": "Check the classes you have taken:",
          "question_type": "Checkbox",
          "options": "['CS61A', 'CS61B', 'CS61C']",
        },
        {
          "id": 4,
          "form": 3,
          "question_text": "Why CodeBase?",
          "question_type": "Paragraph",
          "options": "",
        },
      ],
    },
    {
      "id": 2,
      "name": "Consulting Fall 2017",
      "created_at": "2017/08/07 17:55:48 +0000",
      "archived": false,
      "questions": [
        {
          "id": 5,
          "form": 2,
          "question_text": "Check the classes you have taken:",
          "question_type": "Checkbox",
          "options": "['CS170', 'CS162', 'CS189']",
        },
      ],
    },
    {
      "id": 1,
      "name": "Mentored Fall 2017",
      "created_at": "2017/08/07 17:30:00 +0000",
      "archived": false,
      "questions": [
        {
          "id": 6,
          "form": 1,
          "question_text": "What's something that technology could improve?",
          "question_type": "Paragraph",
          "options": "",
        },
      ],
    },
  ],
}

/* This inbox is for the particular form with ID 4. */
export const EXAMPLE_CATEGORIES = {
  "form": 4,
  "categories": [
    {
      "id": 1,
      "form": 4,
      "name": "Received",
      "applications": [
        {
          "id": 1,
          "category": 1,
          "email": "andrewkchan@berkeley.edu",
          "first_name": "Andrew",
          "last_name": "Chan",
          "read": false,
          "answers": {
            "1": {
              "id": 1,
              "application": 1,
              "question": 1,
              "answer_text": "['CS61A', 'CS61B']",
            },
            "2": {
              "id": 2,
              "application": 1,
              "question": 2,
              "answer_text": "Because all the members are really smart and good looking",
            },
          },
        },
        {
          "id": 2,
          "category": 1,
          "email": "bdeleonardis@berkeley.edu",
          "first_name": "Brian",
          "last_name": "DeLeonardis",
          "read": false,
          "answers": {
            "3": {
              "id": 3,
              "application": 2,
              "question": 1,
              "answer_text": "['CS61A']",
            },
            "4": {
              "id": 4,
              "application": 2,
              "question": 2,
              "answer_text": "Because it's super cool and awesome",
            },
          },
        },
        {
          "id": 3,
          "category": 1,
          "email": "kushrast@berkeley.edu",
          "first_name": "Kush",
          "last_name": "Rastogi",
          "read": false,
          "answers": {
            "5": {
              "id": 5,
              "application": 3,
              "question": 1,
              "answer_text": "['CS61A', 'CS61B', 'CS61C']",
            },
            "6": {
              "id": 6,
              "application": 3,
              "question": 2,
              "answer_text": "Because there are hella brown ppl",
            },
          },
        }
      ]
    },
    {
      "id": 2,
      "form": 4,
      "name": "Accepted",
      "applications": [
        {
          "id": 4,
          "category": 2,
          "email": "akhare@berkeley.edu",
          "first_name": "Abhishyant",
          "last_name": "Khare",
          "read": true,
          "answers": {
            "7": {
              "id": 7,
              "application": 4,
              "question": 1,
              "answer_text": "['CS61A', 'CS61B', 'CS61C']",
            },
            "8": {
              "id": 8,
              "application": 4,
              "question": 2,
              "answer_text": "Because I am the president",
            },
          },
        },
        {
          "id": 5,
          "category": 2,
          "email": "ivonliu@berkeley.edu",
          "first_name": "Ivon",
          "last_name": "Liu",
          "read": true,
          "answers": {
            "9": {
              "id": 9,
              "application": 5,
              "question": 1,
              "answer_text": "['CS61A', 'CS61B']",
            },
            "10": {
              "id": 10,
              "application": 5,
              "question": 2,
              "answer_text": "I do whatever the fuck I want",
            },
          },
        }
      ]
    },
    {
      "id": 3,
      "form": 4,
      "name": "Rejected",
      "applications": [
        {
          "id": 6,
          "category": 3,
          "email": "kunalkak@berkeley.edu",
          "first_name": "Kunal",
          "last_name": "Kak",
          "read": true,
          "answers": {
            "11": {
              "id": 11,
              "application": 6,
              "question": 1,
              "answer_text": "['CS61B']",
            },
            "12": {
              "id": 12,
              "application": 6,
              "question": 2,
              "answer_text": "Poopy butthole",
            },
          },
        }
      ]
    }
  ],
}
