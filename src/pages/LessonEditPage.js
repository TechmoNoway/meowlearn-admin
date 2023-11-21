import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded';

// @mui
import { Typography, Stack, Autocomplete, TextField, Container, Box, Button } from '@mui/material';

// @component
import Iconify from '../components/iconify';

function LessonEditPage() {
    // const [questions, setQuestions] = useState([
    //     { id: 1, label: 'Question 1', description: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    //     { id: 2, label: 'Question 2', description: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    //     { id: 3, label: 'Question 3', description: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    //     { id: 4, label: 'Question 4', description: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    //     { id: 5, label: 'Question 5', description: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    //     { id: 6, label: 'Question 6', description: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    //     { id: 7, label: 'Question 7', description: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    //     { id: 8, label: 'Question 8', description: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    //     { id: 9, label: 'Question 9', description: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    //     { id: 10, label: 'Question 10', description: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    // ]);

    const navigate = useNavigate();
    const param = useParams();

    const [questions, setQuestions] = useState([]);
    const [lessonFound, setLessonFound] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            // const { data: questionsResponse } = await axios.get('http://localhost:8871/api/question/getallquestions');

            const { data: lessonResponse } = await axios.get('http://localhost:8871/api/lesson/getalllessons');

            // setQuestions(response.data);
            setLessonFound(lessonResponse.data.find((item) => item.id === param.lessonId));
            const questionList = JSON.parse(localStorage.getItem('questionlist'));
            const newProp = 'label';
            questionList.forEach((item, index) => {
                item[newProp] = `Question ${index + 1}`;
            });
            setQuestions(questionList);
        };

        fetchQuestions();
    }, []);

    const [currentShowQuestion, setCurrentShowQuestion] = useState(null);

    const handleChangeQuestionSentence = (newValue, index) => {
        const newQuestions = [...questions];
        newQuestions[index].description = newValue;
        setQuestions(newQuestions);
    };

    const handleChangeQuestionCorrectAnswer = (newValue, index) => {
        const newQuestions = [...questions];
        newQuestions[index].correctAnswer = newValue;
        setQuestions(newQuestions);
    };

    const handleChangeQuestionAnswer2 = (newValue, index) => {
        const newQuestions = [...questions];
        newQuestions[index].wrongAnswer1 = newValue;
        setQuestions(newQuestions);
    };

    const handleChangeQuestionAnswer3 = (newValue, index) => {
        const newQuestions = [...questions];
        newQuestions[index].wrongAnswer2 = newValue;
        setQuestions(newQuestions);
    };

    const handleChangeQuestionAnswer4 = (newValue, index) => {
        const newQuestions = [...questions];
        newQuestions[index].wrongAnswer3 = newValue;
        setQuestions(newQuestions);
    };

    const handleClearAllQuestionInfo = () => {
        const newQuestions = [...questions];
        const index = currentShowQuestion.id - 1;
        newQuestions[index].description = '';
        newQuestions[index].correctAnswer = '';
        newQuestions[index].wrongAnswer1 = '';
        newQuestions[index].wrongAnswer2 = '';
        newQuestions[index].wrongAnswer3 = '';
        setQuestions(newQuestions);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
    };

    const handleSaveQuestion = () => {
        const propertyToRemove = 'label';
        questions.forEach((item) => {
            delete item[propertyToRemove];
        });
    };

    const handleNavigateBack = () => {
        navigate(-1);
    };

    console.log(currentShowQuestion);
    console.log(lessonFound);

    return (
        <>
            <Container maxWidth="lg">
                <Stack>
                    <Typography variant="h3" mb={1} display="flex" alignItems="center">
                        <Button onClick={handleNavigateBack} sx={{ minWidth: '36px', marginRight: 1 }}>
                            <ArrowBackIosRounded />
                        </Button>
                        Lesson {lessonFound.id}: {lessonFound.title}
                    </Typography>

                    <Stack direction="row" spacing={2} my={2}>
                        <Autocomplete
                            onChange={(event, value) => setCurrentShowQuestion(value)}
                            disablePortal
                            getOptionLabel={(question) => question.label}
                            isOptionEqualToValue={(option, value) => option.label === value.label}
                            id="combo-box-demo"
                            options={questions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Choose question" />}
                        />

                        {/* <Button
                            sx={{ width: 140 }}
                            variant="contained"
                            component="label"
                            startIcon={<Iconify icon="mdi:import" />}
                        >
                            Import <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
                        </Button> */}

                        <Button
                            onClick={handleClearAllQuestionInfo}
                            sx={{ width: 140 }}
                            variant="contained"
                            startIcon={<Iconify icon="material-symbols:save" />}
                        >
                            Save
                        </Button>

                        <Button
                            onClick={handleClearAllQuestionInfo}
                            sx={{ width: 140 }}
                            variant="contained"
                            startIcon={<Iconify icon="icon-park-twotone:clear" />}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Stack>

                {currentShowQuestion && (
                    <>
                        <TextField
                            sx={{ marginY: 3, width: 700 }}
                            variant="filled"
                            placeholder="Question sentence go here"
                            label="Edit question"
                            multiline
                            rows={4}
                            size="lg"
                            value={currentShowQuestion.description}
                            onChange={(e) => handleChangeQuestionSentence(e.target.value, currentShowQuestion.id - 1)}
                        />

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                            }}
                            autoComplete="off"
                        >
                            <TextField
                                id="standard-basic"
                                label="Correct answer"
                                variant="standard"
                                value={currentShowQuestion.correctAnswer}
                                onChange={(e) =>
                                    handleChangeQuestionCorrectAnswer(e.target.value, currentShowQuestion.id - 1)
                                }
                            />
                        </Box>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                            }}
                            autoComplete="off"
                        >
                            <TextField
                                id="standard-basic"
                                label="Wrong answer 1"
                                variant="standard"
                                value={currentShowQuestion.wrongAnswer1}
                                onChange={(e) =>
                                    handleChangeQuestionAnswer2(e.target.value, currentShowQuestion.id - 1)
                                }
                            />
                        </Box>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                            }}
                            autoComplete="off"
                        >
                            <TextField
                                id="standard-basic"
                                label="Wrong answer 2"
                                variant="standard"
                                value={currentShowQuestion.wrongAnswer2}
                                onChange={(e) =>
                                    handleChangeQuestionAnswer3(e.target.value, currentShowQuestion.id - 1)
                                }
                            />
                        </Box>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                            }}
                            autoComplete="off"
                        >
                            <TextField
                                id="standard-basic"
                                label="Wrong answer 3"
                                variant="standard"
                                value={currentShowQuestion.wrongAnswer3}
                                onChange={(e) =>
                                    handleChangeQuestionAnswer4(e.target.value, currentShowQuestion.id - 1)
                                }
                            />
                        </Box>
                    </>
                )}
            </Container>
        </>
    );
}

export default LessonEditPage;
