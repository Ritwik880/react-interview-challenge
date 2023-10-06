export const USERSDATA = [
    {
        "userId": 1,
        "id": 1,
        "userName": "Harry Keen",
        "password": "test1"
    },
    {
        "userId": 2,
        "id": 2,
        "userName": "Ritwik Sinha",
        "password": "test12"
    },
    {
        "userId": 3,
        "id": 3,
        "userName": "Pawan Kumar",
        "password": "test123"
    },

]

export const QUESTIONS = [
    {
        question: "What is 2*(4+4)?",
        answers: ["2", "4", "8", "16"],
        correct: 3,
    },
    {
        question: "What is 9*9?",
        answers: ["18", "81", "80", "79"],
        correct: 1,
    },
    {
        question: "Who was the first president of the United States?",
        answers: [
            "George Washington",
            "John Adams",
            "John Quincy Adams",
            "Thomas Jefferson",
        ],
        correct: 0,
    },
    {
        question: "What state is Philadelphia in?",
        answers: [
            "Commonwealth of Pennsylvania",
            "New Jersey",
            "New York",
            "Massachusetts",
        ],
        correct: 0,
    },
    {
        question: "What are the two major political parties in the United States?",
        answers: [
            "Democratic Party & Republican Party",
            "Green Party & Red Party",
            "Bull Party & Moose Party",
            "Hamilton Party & Burr Party",
        ],
        correct: 0,
    },
];

export const INITIAL_LIST = {
    "Organize closet": [
        { "Donate old clothes and shoes": false },
        { "Buy new shelf": false },
        { "Put in shelf by color": false },
    ],
    "Finish homework": [
        { "Finish math homework": false },
        { "Finish science homework": false },
        { "Finish ReactJs homework": false },
    ],
    "Achieve nirvana": [
        { "Meditate a little": false },
        { "Gain some wisdom": false },
    ],
};
