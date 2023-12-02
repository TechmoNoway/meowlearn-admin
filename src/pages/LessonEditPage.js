import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded';
import Swal from 'sweetalert2';

// @mui
import { Typography, Stack, Autocomplete, TextField, Container, Box, Button } from '@mui/material';

// @component
import Iconify from '../components/iconify';
import { getAllLessons } from '../api/lesson';

const questionLabels = [
    'Question 1',
    'Question 2',
    'Question 3',
    'Question 4',
    'Question 5',
    'Question 6',
    'Question 7',
    'Question 8',
    'Question 9',
    'Question 10',
];

function LessonEditPage() {
    const navigate = useNavigate();
    const param = useParams();

    const [questions, setQuestions] = useState([]);
    const [lesson, setLesson] = useState({});
    const [currentShowQuestion, setCurrentShowQuestion] = useState({
        id: '',
        label: '',
        description: '',
        correctAnswer: '',
        wrongAnswer1: '',
        wrongAnswer2: '',
        wrongAnswer3: '',
        blockId: '',
        lessonId: '',
    });

    const [questionSentence, setQuestionSentence] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [wrongAnswer1, setWrongAnswer1] = useState('');
    const [wrongAnswer2, setWrongAnswer2] = useState('');
    const [wrongAnswer3, setWrongAnswer3] = useState('');

    const fetchQuestions = async () => {
        const { data: lessonResponse } = await axios.get('http://localhost:8871/api/lesson/getalllessons');

        // setQuestions(questionsResponse.data);
        const lessonFound = lessonResponse.data.find((item) => item.title === param.lessonId);
        const questionList = JSON.parse(localStorage.getItem('questionlist'));
        const filterdQuestionList = questionList.filter((question) => question.lessonId === lessonFound.id);

        const newProp = 'label';

        filterdQuestionList.forEach((item, index) => {
            item[newProp] = `Question ${index + 1}`;
        });

        console.log(currentShowQuestion);

        setLesson(lessonFound);
        setQuestions(filterdQuestionList);
        setCurrentShowQuestion(questions?.find((question) => question.label === currentShowQuestion.label));
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (currentShowQuestion) {
            setQuestionSentence(currentShowQuestion.description || '');
            setCorrectAnswer(currentShowQuestion.correctAnswer || '');
            setWrongAnswer1(currentShowQuestion.wrongAnswer1 || '');
            setWrongAnswer2(currentShowQuestion.wrongAnswer2 || '');
            setWrongAnswer3(currentShowQuestion.wrongAnswer3 || '');
        }
    }, [currentShowQuestion]);

    useEffect(() => {}, [questions]);

    const handleChangeShowCurrentQuestion = (currentLabel) => {
        const questionOption = questions.find((question) => question.label === currentLabel);
        setCurrentShowQuestion(questionOption);
    };

    const handleChangeTextfieldValue = (fieldName, newValue) => {
        const index = questions.findIndex((question) => question.id === currentShowQuestion.id);
        const newQuestions = [...questions];
        newQuestions[index][fieldName] = newValue;

        switch (fieldName) {
            case 'description':
                setQuestionSentence(newValue);
                break;
            case 'correctAnswer':
                setCorrectAnswer(newValue);
                break;
            case 'wrongAnswer1':
                setWrongAnswer1(newValue);
                break;
            case 'wrongAnswer2':
                setWrongAnswer2(newValue);
                break;
            case 'wrongAnswer3':
                setWrongAnswer3(newValue);
                break;
            default:
                break;
        }
    };

    const handleClearAllQuestionInfo = (e) => {
        e.preventDefault();

        const index = questions.findIndex((question) => question.id === currentShowQuestion.id);
        const newQuestions = [...questions];
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

    const handleSaveQuestions = (e) => {
        e.preventDefault();

        const initialQuestions = JSON.parse(localStorage.getItem('questionlist'));

        const updatedQuestions = initialQuestions.map((initQuestion) => {
            const matchingObj = questions.find((newQuestion) => newQuestion.id === initQuestion.id);
            return matchingObj ? { ...initQuestion, ...matchingObj } : initQuestion;
        });

        const propertyToRemove = 'label';

        const filterdQuestions = updatedQuestions.map((question) => {
            const { [propertyToRemove]: removeProperty, ...rest } = question;
            return rest;
        });

        setCurrentShowQuestion(updatedQuestions.find((q) => q.id === currentShowQuestion.id));

        localStorage.removeItem('questionlist');
        localStorage.setItem('questionlist', JSON.stringify(filterdQuestions));

        fetchQuestions();

        Swal.fire({
            title: 'Good job!',
            text: 'Save lession successfully!',
            icon: 'success',
        });
    };

    const handleNavigateBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Container maxWidth="lg">
                <Stack>
                    <Typography variant="h3" mb={1} display="flex" alignItems="center">
                        <Button onClick={handleNavigateBack} sx={{ minWidth: '36px', marginRight: 1 }}>
                            <ArrowBackIosRounded />
                        </Button>
                        Lesson: {lesson.title}
                    </Typography>

                    <Stack direction="row" spacing={2} my={2}>
                        <Autocomplete
                            onChange={(e, value) => handleChangeShowCurrentQuestion(value)}
                            disablePortal
                            // getOptionLabel={(question) => question.label}
                            // isOptionEqualToValue={(option, value) => option.label === value.label}
                            id="combo-box-demo"
                            options={questionLabels}
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
                            onClick={handleSaveQuestions}
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
                            name="description"
                            multiline
                            rows={4}
                            size="lg"
                            value={questionSentence}
                            onChange={(e) => handleChangeTextfieldValue(e.target.name, e.target.value)}
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
                                name="correctAnswer"
                                variant="standard"
                                value={correctAnswer}
                                onChange={(e) => handleChangeTextfieldValue(e.target.name, e.target.value)}
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
                                name="wrongAnswer1"
                                variant="standard"
                                value={wrongAnswer1}
                                onChange={(e) => handleChangeTextfieldValue(e.target.name, e.target.value)}
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
                                name="wrongAnswer2"
                                variant="standard"
                                value={wrongAnswer2}
                                onChange={(e) => handleChangeTextfieldValue(e.target.name, e.target.value)}
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
                                name="wrongAnswer3"
                                variant="standard"
                                value={wrongAnswer3}
                                onChange={(e) => handleChangeTextfieldValue(e.target.name, e.target.value)}
                            />
                        </Box>
                    </>
                )}
            </Container>
        </>
    );
}

export default LessonEditPage;
