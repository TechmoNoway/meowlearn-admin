const QUESTIONS = [
    [
        {
            id: '1',
            description: 'Life is full of secrets, many ____ will never be explained.',
            correctAnswer: 'of that',
            wrongAnswer1: 'of whose',
            wrongAnswer2: 'of whom',
            wrongAnswer3: 'of where',
            lessonId: '1',
            blockId: '1',
        },
        {
            id: '2',
            description: 'After ____ all the doors and windows thoroughly, I went to bed.',
            correctAnswer: 'having checked',
            wrongAnswer1: 'have checked',
            wrongAnswer2: 'check',
            wrongAnswer3: 'have been checked',
            lessonId: '1',
            blockId: '1',
        },
        {
            id: '3',
            description:
                '”Don’t go out alone after dark in that city, Tom,” said Martha. Martha____Tom not to go out after dark in that city.',
            correctAnswer: 'warned',
            wrongAnswer1: 'promised',
            wrongAnswer2: 'threatened',
            wrongAnswer3: 'said',
            lessonId: '1',
            blockId: '1',
        },
        {
            id: '4',
            description: '____ two years ago, Rita’s car costs five thousand dollars.',
            correctAnswer: 'Purchased less than',
            wrongAnswer1: 'To buy a car',
            wrongAnswer2: 'Expensive cars',
            wrongAnswer3: 'Buying automobile',
            lessonId: '1',
            blockId: '1',
        },
        {
            id: '5',
            description: '____it is getting late; I suggest we break off now.',
            correctAnswer: 'As',
            wrongAnswer1: 'So',
            wrongAnswer2: 'As though',
            wrongAnswer3: 'Where',
            lessonId: '1',
            blockId: '1',
        },
        {
            id: '6',
            description: '____only two elderly people who were enjoying the beautifulweather.',
            correctAnswer: 'There were',
            wrongAnswer1: 'As many as',
            wrongAnswer2: '_ _ _',
            wrongAnswer3: 'It was',
            lessonId: '1',
            blockId: '1',
        },
        {
            id: '7',
            description: '____a good thing you didn’t get caught.',
            correctAnswer: 'It’s',
            wrongAnswer1: 'That’s',
            wrongAnswer2: 'What is',
            wrongAnswer3: 'There is',
            lessonId: '1',
            blockId: '1',
        },
        {
            id: '8',
            description: 'Not having ____ instructions, George could not do the job properly.',
            correctAnswer: 'been given',
            wrongAnswer1: 'given',
            wrongAnswer2: 'giving',
            wrongAnswer3: 'given the',
            lessonId: '1',
            blockId: '1',
        },
        {
            id: '9',
            description: 'It’s difficult to make both ends meet these days, the taxes ____ sohigh.',
            correctAnswer: 'are',
            wrongAnswer1: 'with',
            wrongAnswer2: 'being',
            wrongAnswer3: 'be',
            lessonId: '1',
            blockId: '1',
        },
        {
            id: '10',
            description: '____ he worked all day, he couldn’t finish the job.',
            correctAnswer: 'Although',
            wrongAnswer1: 'In case',
            wrongAnswer2: 'So',
            wrongAnswer3: 'Even',
            lessonId: '1',
            blockId: '1',
        },
        {
            id: '11',
            description: '____ in 1795, the house has many interesting features.',
            correctAnswer: 'Built',
            wrongAnswer1: 'Later ',
            wrongAnswer2: 'When it was built',
            wrongAnswer3: 'Building',
            lessonId: '2',
            blockId: '1',
        },
        {
            id: '12',
            description: '“Sunflowers” is one of many beautiful pictures ____ by Vincent vanGogh.',
            correctAnswer: 'painted',
            wrongAnswer1: 'was painted',
            wrongAnswer2: 'it was painted ',
            wrongAnswer3: 'when it was painted',
            lessonId: '2',
            blockId: '1',
        },
        {
            id: '13',
            description: 'I have dissuaded Mary ____ involving the police.',
            correctAnswer: 'from',
            wrongAnswer1: 'to',
            wrongAnswer2: 'in',
            wrongAnswer3: 'for',
            lessonId: '2',
            blockId: '1',
        },
        {
            id: '14',
            description: 'He looked ____ he had seen a ghost.',
            correctAnswer: 'as if',
            wrongAnswer1: 'as',
            wrongAnswer2: 'like',
            wrongAnswer3: 'because',
            lessonId: '2',
            blockId: '1',
        },
        {
            id: '15',
            description: 'It is less expensive for me to take the bus to work, but ____ to takemy car.',
            correctAnswer: 'it is faster',
            wrongAnswer1: 'for I will',
            wrongAnswer2: 'it is less than',
            wrongAnswer3: 'I will',
            lessonId: '2',
            blockId: '1',
        },
        {
            id: '16',
            description: '____ he does his work, I don’t mind what time he arrives at theoffice.',
            correctAnswer: 'As long as',
            wrongAnswer1: 'As',
            wrongAnswer2: 'Unless',
            wrongAnswer3: 'So',
            lessonId: '2',
            blockId: '1',
        },
        {
            id: '17',
            description: '____ by the noise, the bird flew away.',
            correctAnswer: 'Frightened',
            wrongAnswer1: 'Afraid',
            wrongAnswer2: 'Fearing',
            wrongAnswer3: 'Building',
            lessonId: '2',
            blockId: '1',
        },
        {
            id: '18',
            description: '____ to see that you are feeling better.',
            correctAnswer: 'It is nice',
            wrongAnswer1: 'Therefore',
            wrongAnswer2: 'That’s fine',
            wrongAnswer3: 'I went',
            lessonId: '2',
            blockId: '1',
        },
        {
            id: '19',
            description: 'They prohibited him ____ going in.',
            correctAnswer: 'from',
            wrongAnswer1: 'to',
            wrongAnswer2: 'for',
            wrongAnswer3: 'in',
            lessonId: '2',
            blockId: '1',
        },
        {
            id: '20',
            description: '____she needs is a good rest.',
            correctAnswer: 'What',
            wrongAnswer1: 'That',
            wrongAnswer2: 'The thing what',
            wrongAnswer3: 'Which',
            lessonId: '2',
            blockId: '1',
        },
        {
            id: '21',
            description: 'Anyone ____ in hunting can come with me.',
            correctAnswer: 'interested',
            wrongAnswer1: 'interesting',
            wrongAnswer2: 'was interested',
            wrongAnswer3: 'was interesting',
            lessonId: '3',
            blockId: '1',
        },
        {
            id: '22',
            description: 'Not for one moment ____ my friend’s innocence.',
            correctAnswer: 'did I doubt',
            wrongAnswer1: 'I did doubt',
            wrongAnswer2: 'I doubted',
            wrongAnswer3: 'I doubt',
            lessonId: '3',
            blockId: '1',
        },
        {
            id: '23',
            description: 'He meets ____ people that he can’t remember all their names.',
            correctAnswer: 'so many',
            wrongAnswer1: 'so much',
            wrongAnswer2: 'very many',
            wrongAnswer3: 'too many',
            lessonId: '3',
            blockId: '1',
        },
        {
            id: '24',
            description: 'Don’t make him ____ it if he doesn’t want to.',
            correctAnswer: 'do',
            wrongAnswer1: 'doing',
            wrongAnswer2: 'to do',
            wrongAnswer3: 'done',
            lessonId: '3',
            blockId: '1',
        },
        {
            id: '25',
            description: 'Don’t use the car ____ it is absolutely necessary.',
            correctAnswer: 'unless',
            wrongAnswer1: 'so',
            wrongAnswer2: 'because',
            wrongAnswer3: 'if',
            lessonId: '3',
            blockId: '1',
        },
        {
            id: '26',
            description: '____ in my first visit to Turkey that I went to Bodrum.',
            correctAnswer: 'It was',
            wrongAnswer1: 'It is',
            wrongAnswer2: 'It has been',
            wrongAnswer3: 'Its',
            lessonId: '3',
            blockId: '1',
        },
        {
            id: '27',
            description: 'The east of Argentina is agricultural, ____the west is industrialized.',
            correctAnswer: 'whereas',
            wrongAnswer1: 'because',
            wrongAnswer2: 'so',
            wrongAnswer3: 'since',
            lessonId: '3',
            blockId: '1',
        },
        {
            id: '28',
            description:
                'They would rather cut down on a few luxuries now ____ not be ableto go away on holiday in the summer.',
            correctAnswer: 'than',
            wrongAnswer1: 'on',
            wrongAnswer2: 'to',
            wrongAnswer3: 'for',
            lessonId: '3',
            blockId: '1',
        },
        {
            id: '29',
            description: 'War and Peace is a long novel ____by Leo Tolstoy.',
            correctAnswer: 'written',
            wrongAnswer1: 'it was written',
            wrongAnswer2: 'was written ',
            wrongAnswer3: 'wrote',
            lessonId: '3',
            blockId: '1',
        },
        {
            id: '30',
            description: '____a good thing you didn’t get caught.',
            correctAnswer: 'It’s',
            wrongAnswer1: 'It is not',
            wrongAnswer2: 'What is',
            wrongAnswer3: 'There is',
            lessonId: '3',
            blockId: '1',
        },
    ],
];
