import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// mui
import { ArrowBackIosRounded } from '@mui/icons-material';
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

// ----------------------------------------------------------------------

export default function TestDetailPage() {
    const param = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [currentTest, setCurrentTest] = useState({});

    const fetchTestList = async () => {
        const { data: testResponse } = await axios.get('http://localhost:8871/api/test/getalltests');

        // const { data: response } = await axios.get('https://course-backend-meolearn.onrender.com/api/test/getalltests');

        const { data: questionResponse } = await axios.get('http://localhost:8871/api/question/getallquestions');
        const { data: questionTypeResponse } = await axios.get(
            'http://localhost:8871/api/questiontype/getallquestiontypes',
        );

        const testList = testResponse.data;
        const questionList = questionResponse.data;

        const filteredQuestionTypes = questionTypeResponse.data.filter(
            (item) => item.questionCategoryId === param.testId,
        );

        const filteredQuestionList = questionList.filter((question) =>
            filteredQuestionTypes.some((questionType) => questionType.questionId === question.id),
        );

        console.log(filteredQuestionList);

        const foundTest = testList.find((test) => test.id === param.testId);

        console.log(foundTest);

        setCurrentTest(foundTest);

        setQuestions(filteredQuestionList);
        setCurrentQuestion(filteredQuestionList[currentQuestion]);
        setCurrentTest(foundTest)
    };

    useEffect(() => {
        fetchTestList();
    }, []);

    const handleNextQuestion = () => {
        setCurrentQuestion((prev) => prev + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestion((prev) => prev - 1);
    };

    const handleSubmission = () => {
        console.log(questions);
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleQuestionEdit = (e) => {
        const newQuestions = [...questions];
        newQuestions[currentQuestion].text = e.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionEdit = (e) => {
        const newQuestions = [...questions];
        newQuestions[currentQuestion][e.target.name] = e.target.value;
        setQuestions(newQuestions);
    };

    const handleNavigateBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Helmet>
                <title> Test Detail </title>
            </Helmet>

            <Container>
                <Typography variant="h4" mb={5} display="flex" alignItems="center">
                    <Button onClick={handleNavigateBack} sx={{ minWidth: '36px', marginRight: 1 }}>
                        <ArrowBackIosRounded />
                    </Button>
                    {currentTest.title}
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
                                        value={questions[currentQuestion].description}
                                        onChange={(e) => handleQuestionEdit(e)}
                                    />
                                ) : (
                                    // Display mode for questions
                                    <>
                                        <Typography variant="h5">Question {currentQuestion + 1}</Typography>
                                        <Typography>{questions[currentQuestion].description}</Typography>
                                    </>
                                )}

                                {/* Answer options */}
                                <FormGroup>
                                    <>
                                        <FormControlLabel
                                            sx={{ marginTop: 2 }}
                                            control={
                                                <Radio
                                                    checked
                                                />
                                            }
                                            label={
                                                editMode ? (
                                                    // Edit mode for options
                                                    <TextField
                                                        name="correctAnswer"
                                                        label="Correct Answer"
                                                        value={questions[currentQuestion].correctAnswer}
                                                        onChange={(e) =>
                                                            handleOptionEdit(e)
                                                        }
                                                    />
                                                ) : (
                                                    questions[currentQuestion].correctAnswer
                                                )
                                            }
                                        />

                                        <FormControlLabel
                                            sx={{ marginTop: 2 }}
                                            control={
                                                <Radio
                                                    checked={false}
                                                />
                                            }
                                            label={
                                                editMode ? (
                                                    <TextField
                                                        name="wrongAnswer1"
                                                        label="Wrong Answer 1"
                                                        value={questions[currentQuestion].wrongAnswer1}
                                                        onChange={(e) =>
                                                            handleOptionEdit(e)
                                                        }
                                                    />
                                                ) : (
                                                    questions[currentQuestion].wrongAnswer1
                                                )
                                            }
                                        />

                                        <FormControlLabel
                                            sx={{ marginTop: 2 }}
                                            control={
                                                <Radio
                                                    checked={false}
                                                />
                                            }
                                            label={
                                                editMode ? (
                                                    <TextField
                                                        name="wrongAnswer2"
                                                        label="Wrong Answer 2"
                                                        value={questions[currentQuestion].wrongAnswer1}
                                                        onChange={(e) =>
                                                            handleOptionEdit(e)
                                                        }
                                                    />
                                                ) : (
                                                    questions[currentQuestion].wrongAnswer1
                                                )
                                            }
                                        />

                                        <FormControlLabel
                                            sx={{ marginTop: 2 }}
                                            control={
                                                <Radio
                                                    checked={false}
                                                />
                                            }
                                            label={
                                                editMode ? (
                                                    <TextField
                                                        name="wrongAnswer3"
                                                        label="Wrong Answer 3"
                                                        value={questions[currentQuestion].wrongAnswer1}
                                                        onChange={(e) =>
                                                            handleOptionEdit(e)
                                                        }
                                                    />
                                                ) : (
                                                    questions[currentQuestion].wrongAnswer1
                                                )
                                            }
                                        />

                                        <FormControlLabel
                                            sx={{ marginTop: 2 }}
                                            control={
                                                <Radio
                                                    checked={false}
                                                />
                                            }
                                            label={
                                                editMode ? (
                                                    <TextField
                                                        name="wrongAnswer4"
                                                        label="Wrong Answer 4"
                                                        value={questions[currentQuestion].wrongAnswer1}
                                                        onChange={(e) =>
                                                            handleOptionEdit(e)
                                                        }
                                                    />
                                                ) : (
                                                    questions[currentQuestion].wrongAnswer1
                                                )
                                            }
                                        />
                                    </>
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

                                <Button variant="contained" color="primary" onClick={handleSubmission} disabled={editMode}>
                                    Save
                                </Button>



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
