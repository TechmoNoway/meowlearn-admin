import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBackIosRounded } from '@mui/icons-material';
// @mui
import {
    Container,
    Card,
    Typography,
    Radio,
    Button,
    FormGroup,
    FormControlLabel,
    Grid,
    TextField,
    Stack,
    Box,
} from '@mui/material';
import Swal from 'sweetalert2';

export default function PracticeDetailPage() {
    const param = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [currentPractice, setCurrentPractice] = useState({});
    const [currentIndex, setCurrentIndex] = useState(1);

    const fetchPracticeList = async () => {
        const { data: practiceResponse } = await axios.get('http://localhost:8871/api/practice/getallpractices');

        // const { data: response } = await axios.get(
        //     'https://course-backend-meolearn.onrender.com/api/practice/getallpractices',
        // );

        const { data: questionResponse } = await axios.get('http://localhost:8871/api/question/getallquestions');
        const { data: questionTypeResponse } = await axios.get(
            'http://localhost:8871/api/questiontype/getallquestiontypes',
        );

        const practiceList = practiceResponse.data;
        const questionList = questionResponse.data;

        const filteredQuestionTypes = questionTypeResponse.data.filter(
            (item) => item.questionCategoryId === param.practiceId,
        );

        const filteredQuestionList = questionList.filter((question) =>
            filteredQuestionTypes.some((questionType) => questionType.questionId === question.id),
        );

        console.log(filteredQuestionList);

        const foundPractice = practiceList.find((practice) => practice.id === param.practiceId);

        setQuestions(filteredQuestionList);
        setCurrentQuestion(filteredQuestionList[0]);
        setCurrentPractice(foundPractice);
    };

    useEffect(() => {
        fetchPracticeList();
    }, []);

    const handleNextQuestion = () => {
        setCurrentQuestion((prev) => questions[questions.indexOf(prev) + 1]);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestion((prev) => questions[questions.indexOf(prev) - 1]);
    };

    const handleSubmission = () => {
        console.log(questions);

        let saveSuccess = true;

        questions.every(async (question) => {
            const { data: questionResponse } = await axios.put('http://localhost:8871/api/question/updateQuestion', question);
            console.log(questionResponse);
            if (questionResponse.success === false) {
                saveSuccess = false;
                Swal.fire({
                    title: 'Oobs!Something went wrong!',
                    text: 'Save lession failed!',
                    icon: 'error',
                });
                return false;
            }

            return true
        })

        if (saveSuccess === true) {
            Swal.fire({
                title: 'Good job!',
                text: 'Save lession successfully!',
                icon: 'success',
            });
        }
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleQuestionEdit = (e) => {
        const newQuestions = [...questions];
        newQuestions[questions.indexOf(currentQuestion)].description = e.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswerEdit = (e) => {
        const newQuestions = [...questions];
        newQuestions[questions.indexOf(currentQuestion)][e.target.name] = e.target.value;
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
                    {currentPractice.title}
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Card sx={{ padding: 2 }}>
                            <Typography variant="h6">Question list</Typography>
                            <Box spacing={1} mt={2} height={436}>
                                {questions.map((q, index) => (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        sx={{ margin: '2px', minWidth: '50px', minHeight: '50px' }}
                                        onClick={() => setCurrentQuestion(questions[index])}
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
                                    <TextField
                                        label="Edit Question"
                                        multiline
                                        fullWidth
                                        value={currentQuestion?.description}
                                        onChange={(e) => handleQuestionEdit(e)}
                                    />
                                ) : (
                                    <>
                                        <Typography variant="h5">
                                            Question{' '}
                                            {questions.indexOf(currentQuestion) + 1 === 0
                                                ? currentIndex
                                                : questions.indexOf(currentQuestion) + 1}
                                        </Typography>
                                        <Typography>{currentQuestion?.description}</Typography>
                                    </>
                                )}

                                <FormGroup>
                                    <>
                                        <FormControlLabel
                                            sx={{ marginTop: 2 }}
                                            control={
                                                <Radio
                                                    checked
                                                // onChange={() => handleOptionSelect(optionIndex)}
                                                />
                                            }
                                            label={
                                                editMode ? (
                                                    <TextField
                                                        name="correctAnswer"
                                                        label="Correct Answer"
                                                        value={currentQuestion?.correctAnswer}
                                                        onChange={(e) =>
                                                            handleAnswerEdit(e)
                                                        }
                                                    />
                                                ) : (
                                                    currentQuestion?.correctAnswer
                                                )
                                            }
                                        />
                                        <FormControlLabel
                                            sx={{ marginTop: 2 }}
                                            control={
                                                <Radio
                                                    checked={false}
                                                // onChange={() => handleOptionSelect(optionIndex)}
                                                />
                                            }
                                            label={
                                                editMode ? (
                                                    <TextField
                                                        name="wrongAnswer1"
                                                        label="Wrong Answer 1"
                                                        value={currentQuestion?.wrongAnswer1}
                                                        onChange={(e) => handleAnswerEdit(e)}
                                                    />
                                                ) : (
                                                    currentQuestion?.wrongAnswer1
                                                )
                                            }
                                        />
                                        <FormControlLabel
                                            sx={{ marginTop: 2 }}
                                            control={
                                                <Radio
                                                    checked={false}
                                                // onChange={() => handleOptionSelect(optionIndex)}
                                                />
                                            }
                                            label={
                                                editMode ? (
                                                    <TextField
                                                        name="wrongAnswer2"
                                                        label="Wrong Answer 2"
                                                        value={currentQuestion?.wrongAnswer2}
                                                        onChange={(e) => handleAnswerEdit(e)}
                                                    />
                                                ) : (
                                                    currentQuestion?.wrongAnswer2
                                                )
                                            }
                                        />
                                        <FormControlLabel
                                            sx={{ marginTop: 2 }}
                                            control={
                                                <Radio
                                                    checked={false}
                                                // onChange={() => handleOptionSelect(optionIndex)}
                                                />
                                            }
                                            label={
                                                editMode ? (
                                                    <TextField
                                                        name="wrongAnswer3"
                                                        label="Wrong Answer 3"
                                                        value={currentQuestion?.wrongAnswer3}
                                                        onChange={(e) => handleAnswerEdit(e)}
                                                    />
                                                ) : (
                                                    currentQuestion?.wrongAnswer3
                                                )
                                            }
                                        />
                                        <FormControlLabel
                                            sx={{ marginTop: 2 }}
                                            control={
                                                <Radio
                                                    checked={false}
                                                // onChange={() => handleOptionSelect(optionIndex)}
                                                />
                                            }
                                            label={
                                                editMode ? (
                                                    <TextField
                                                        name="wrongAnswer4"
                                                        label="Wrong Answer 4"
                                                        value={currentQuestion?.wrongAnswer4}
                                                        onChange={(e) => handleAnswerEdit(e)}
                                                    />
                                                ) : (
                                                    currentQuestion?.wrongAnswer4
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
                                        disabled={
                                            questions.indexOf(currentQuestion) + 1 === 0 ||
                                            editMode ||
                                            questions.indexOf(currentQuestion) + 1 === 1
                                        }
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNextQuestion}
                                        disabled={currentQuestion === questions[questions.length - 1] || editMode}
                                    >
                                        Next
                                    </Button>

                                </Stack>

                                <Button variant="contained" color="primary" onClick={handleSubmission} disabled={editMode}>
                                    Save
                                </Button>


                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
