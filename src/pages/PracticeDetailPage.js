import React, { useEffect, useState } from 'react';
import {
    Container,
    Card,
    Typography,
    Radio,
    Button,
    LinearProgress,
    FormGroup,
    FormControlLabel,
    Grid,
    TextField,
    Stack,
    Box,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBackIosRounded } from '@mui/icons-material';
import axios from 'axios';

export default function PracticeDetailPage() {
    const [questions, setQuestions] = useState([
        {
            text: 'What is the capital of France?',
            options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        },
        {
            text: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        },
        {
            text: 'Who wrote "Romeo and Juliet"?',
            options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
        },
        {
            text: 'What is the capital of France?',
            options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        },
        {
            text: 'Which planet is known as the Red Planet?',
            options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        },
        {
            text: 'Who painted the Mona Lisa?',
            options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
        },
        {
            text: 'What is the largest mammal?',
            options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        },
        {
            text: 'In which year did World War II end?',
            options: ['1943', '1945', '1950', '1939'],
        },
        {
            text: 'What is the capital of Japan?',
            options: ['Beijing', 'Tokyo', 'Seoul', 'Bangkok'],
        },
        {
            text: 'Who wrote "To Kill a Mockingbird"?',
            options: ['J.K. Rowling', 'Ernest Hemingway', 'Harper Lee', 'F. Scott Fitzgerald'],
        },
        {
            text: 'What is the chemical symbol for gold?',
            options: ['Au', 'Ag', 'Fe', 'Hg'],
        },
        {
            text: 'Which country is known as the Land of the Rising Sun?',
            options: ['China', 'Japan', 'South Korea', 'Vietnam'],
        },
        {
            text: 'Who developed the theory of relativity?',
            options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Stephen Hawking'],
        },
        {
            text: 'Which ocean is the largest?',
            options: ['Atlantic Ocean', 'Indian Ocean', 'Southern Ocean', 'Pacific Ocean'],
        },
        {
            text: 'What is the capital of Australia?',
            options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        },
        {
            text: 'Who is the author of "1984"?',
            options: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'J.R.R. Tolkien'],
        },
        {
            text: 'What is the currency of Brazil?',
            options: ['Peso', 'Rupiah', 'Real', 'Yen'],
        },
        {
            text: 'Which element has the chemical symbol "O"?',
            options: ['Oxygen', 'Osmium', 'Oganesson', 'Osmium'],
        },
        {
            text: 'Who was the first woman to win a Nobel Prize?',
            options: ['Marie Curie', 'Rosalind Franklin', 'Jane Goodall', 'Ada Lovelace'],
        },
        {
            text: 'What is the main ingredient in guacamole?',
            options: ['Tomato', 'Onion', 'Avocado', 'Cilantro'],
        },
        {
            text: 'Which country is known as the Land of the Midnight Sun?',
            options: ['Norway', 'Canada', 'Russia', 'Sweden'],
        },
        {
            text: 'Who played the character Jack Dawson in the movie "Titanic"?',
            options: ['Leonardo DiCaprio', 'Brad Pitt', 'Tom Hanks', 'Johnny Depp'],
        },
        {
            text: 'What is the largest desert in the world?',
            options: ['Sahara Desert', 'Gobi Desert', 'Antarctica', 'Arabian Desert'],
        },
        {
            text: 'Which planet is known as the "Red Planet"?',
            options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        },
        {
            text: 'Who is the author of "Pride and Prejudice"?',
            options: ['Charlotte Brontë', 'Emily Brontë', 'Jane Austen', 'Charles Dickens'],
        },
        {
            text: 'What is the tallest mountain in the world?',
            options: ['Mount Kilimanjaro', 'Mount Everest', 'Denali', 'Mount Fuji'],
        },
        {
            text: 'Who is known as the "Father of Computer Science"?',
            options: ['Alan Turing', 'Charles Babbage', 'Ada Lovelace', 'Tim Berners-Lee'],
        },
        {
            text: 'What is the speed of light in a vacuum?',
            options: [
                '299,792 kilometers per second',
                '150,000 kilometers per second',
                '450,000 kilometers per second',
                '600,000 kilometers per second',
            ],
        },
        {
            text: 'Which animal is known as the "King of the Jungle"?',
            options: ['Elephant', 'Lion', 'Tiger', 'Giraffe'],
        },
        {
            text: 'Who painted "Starry Night"?',
            options: ['Vincent van Gogh', 'Pablo Picasso', 'Claude Monet', 'Leonardo da Vinci'],
        },
        {
            text: 'What is the largest island in the world?',
            options: ['Greenland', 'Australia', 'Borneo', 'Madagascar'],
        },
        {
            text: "Which gas makes up the majority of Earth's atmosphere?",
            options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        },
        {
            text: 'Who is the author of "The Great Gatsby"?',
            options: ['F. Scott Fitzgerald', 'Ernest Hemingway', 'J.D. Salinger', 'Charles Dickens'],
        },
        {
            text: 'What is the smallest prime number?',
            options: ['0', '1', '2', '3'],
        },
        {
            text: 'Who is known as the "Queen of Pop"?',
            options: ['Madonna', 'Beyoncé', 'Lady Gaga', 'Rihanna'],
        },
        {
            text: 'What is the currency of Japan?',
            options: ['Yuan', 'Won', 'Yen', 'Ringgit'],
        },
        {
            text: 'Who discovered penicillin?',
            options: ['Marie Curie', 'Alexander Fleming', 'Louis Pasteur', 'Antoine Lavoisier'],
        },
        {
            text: 'What is the largest bird in the world?',
            options: ['Penguin', 'Ostrich', 'Albatross', 'Eagle'],
        },
        {
            text: 'Who painted "The Persistence of Memory"?',
            options: ['Vincent van Gogh', 'Pablo Picasso', 'Claude Monet', 'Salvador Dalí'],
        },
        {
            text: 'Who painted "The Persistence of Memory"?',
            options: ['Vincent van Gogh', 'Pablo Picasso', 'Claude Monet', 'Salvador Dalí'],
        },
    ]);

    const param = useParams();
    const navigate = useNavigate();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(null));
    const [editMode, setEditMode] = useState(false);
    const [currentPractice, setCurrentPractice] = useState({});

    const fetchPracticeList = async () => {
        const { data: response } = await axios.get('http://localhost:8871/api/practice/getallpractices');

        const foundPractice = response.data.find((practice) => practice.title === param.practiceTitle);

        console.log(foundPractice);

        setCurrentPractice(foundPractice);

        if (foundPractice.requiredQuestionAmount < 40) {
            setQuestions((prevQuestions) => prevQuestions.slice(0, foundPractice.requiredQuestionAmount - 40));
        }
    };

    useEffect(() => {
        fetchPracticeList();
    }, []);

    const handleOptionSelect = (selectedOption) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = selectedOption;
        setUserAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        setCurrentQuestion((prev) => prev + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestion((prev) => prev - 1);
    };

    const handleSubmission = () => {
        // Handle submission logic, e.g., send answers to the server
        console.log('User Answers:', userAnswers);
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleQuestionEdit = (index, newText) => {
        const newQuestions = [...questions];
        newQuestions[index].text = newText;
        setQuestions(newQuestions);
    };

    const handleOptionEdit = (questionIndex, optionIndex, newOption) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = newOption;
        setQuestions(newQuestions);
    };

    const handleNavigateBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Helmet>
                <title> Practices Detail </title>
            </Helmet>

            <Container>
                <Typography variant="h4" mb={5} display="flex" alignItems="center">
                    <Button onClick={handleNavigateBack} sx={{ minWidth: '36px', marginRight: 1 }}>
                        <ArrowBackIosRounded />
                    </Button>
                    {param.practiceTitle}
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Card sx={{ padding: 2 }}>
                            <Typography variant="h6">Question list</Typography>
                            <Box spacing={1} mt={2} height={400}>
                                {questions.map((q, index) => (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        sx={{ margin: '2px', minWidth: '50px', minHeight: '50px' }}
                                        onClick={() => setCurrentQuestion(index)}
                                    >
                                        {index === currentQuestion ? <strong>{index + 1}</strong> : index + 1}
                                    </Button>
                                ))}
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <Stack p={2} spacing={2}>
                                {/* Edit mode toggle button */}
                                <Button variant="outlined" onClick={handleEditToggle}>
                                    {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
                                </Button>

                                {/* Question display area */}
                                {editMode ? (
                                    // Edit mode for questions
                                    <TextField
                                        label="Edit Question"
                                        multiline
                                        fullWidth
                                        value={questions[currentQuestion].text}
                                        onChange={(e) => handleQuestionEdit(currentQuestion, e.target.value)}
                                    />
                                ) : (
                                    // Display mode for questions
                                    <>
                                        <Typography variant="h5">Question {currentQuestion + 1}</Typography>
                                        <Typography>{questions[currentQuestion].text}</Typography>
                                    </>
                                )}

                                {/* Answer options */}
                                <FormGroup>
                                    {questions[currentQuestion].options.map((option, optionIndex) => (
                                        <FormControlLabel
                                            sx={{ marginTop: 2 }}
                                            key={optionIndex}
                                            control={
                                                <Radio
                                                    checked={userAnswers[currentQuestion] === optionIndex}
                                                    onChange={() => handleOptionSelect(optionIndex)}
                                                />
                                            }
                                            label={
                                                editMode ? (
                                                    // Edit mode for options
                                                    <TextField
                                                        value={option}
                                                        onChange={(e) =>
                                                            handleOptionEdit(
                                                                currentQuestion,
                                                                optionIndex,
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    // Display mode for options
                                                    option
                                                )
                                            }
                                        />
                                    ))}
                                </FormGroup>

                                {/* Navigation buttons */}
                                <Stack direction="row" spacing={1}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handlePreviousQuestion}
                                        disabled={currentQuestion === 0 || editMode}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNextQuestion}
                                        disabled={currentQuestion === questions.length - 1 || editMode}
                                    >
                                        Next
                                    </Button>
                                </Stack>

                                {/* Submit button */}
                                {currentQuestion === questions.length - 1 && !editMode && (
                                    <Button variant="contained" color="primary" onClick={handleSubmission}>
                                        Save
                                    </Button>
                                )}

                                {/* Progress bar */}
                                <LinearProgress
                                    variant="determinate"
                                    value={(currentQuestion / (questions.length - 1)) * 100}
                                />
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
