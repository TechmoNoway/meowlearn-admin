import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosRounded from '@mui/icons-material/ArrowBackIosRounded';
import Swal from 'sweetalert2';

// @mui
import { Typography, Stack, Autocomplete, TextField, Container, Box, Button, Grid, IconButton, Popover, MenuItem, Divider, Modal, Fade, Alert } from '@mui/material';

// @component
import Iconify from '../components/iconify';
import SpinnerLoader from '../components/spinner-loader/SpinnerLoader';
import { sqlDate } from '../utils/formatDate';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    border: '1px solid transparent',
    borderRadius: '7px',
    boxShadow: 24,
    p: 4,
};

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
    const [currentShowQuestion, setCurrentShowQuestion] = useState({});
    const [showEditLessonModal, setShowEditLessonModal] = useState(false);
    const [lessonCardForm, setLessonCardForm] = useState({});
    const [lessonEditError, setLessonEditError] = useState('');

    const [questionSentence, setQuestionSentence] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [wrongAnswer1, setWrongAnswer1] = useState('');
    const [wrongAnswer2, setWrongAnswer2] = useState('');
    const [wrongAnswer3, setWrongAnswer3] = useState('');
    const [wrongAnswer4, setWrongAnswer4] = useState('');

    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(null);

    const { title, id, description, blockId, createdAt } = lessonCardForm;


    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const fetchQuestions = async () => {
        const { data: lessonResponse } = await axios.get('http://localhost:8871/api/lesson/getalllessons');

        // const { data: lessonResponse } = await axios.get(
        //     'https://course-backend-meolearn.onrender.com/api/lesson/getalllessons',
        // );

        const { data: questionResponse } = await axios.get('http://localhost:8871/api/question/getallquestions');
        const { data: questionTypeResponse } = await axios.get(
            'http://localhost:8871/api/questiontype/getallquestiontypes',
        );

        const lessonList = lessonResponse.data;
        const questionList = questionResponse.data;

        const filteredQuestionTypes = questionTypeResponse.data.filter(
            (item) => item.questionCategoryId === param.lessonId,
        );

        const filteredQuestionList = questionList.filter((question) =>
            filteredQuestionTypes.some((questionType) => questionType.questionId === question.id),
        );

        console.log(filteredQuestionList);

        const lessonFound = lessonList.find((item) => item.id === param.lessonId);

        const newProp = 'label';

        filteredQuestionList.forEach((item, index) => {
            item[newProp] = `Question ${index + 1}`;
        });

        setLessonCardForm(lessonFound)
        setLesson(lessonFound);
        setQuestions(filteredQuestionList);
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
            setWrongAnswer4(currentShowQuestion.wrongAnswer4 || '');
        }
    }, [currentShowQuestion]);

    const handleOpenModal = () => {
        handleCloseLessonEditMenu();
        setShowEditLessonModal(true);
    };

    const handleCloseModal = () => {
        setLessonCardForm(lesson);
        setShowEditLessonModal(false);
    };

    const handleModalTextfieldChange = (e) => {
        setLessonCardForm({ ...lessonCardForm, [e.target.name]: e.target.value });
    };

    const handleUpdateLesson = async () => {
        const newLesson = {
            id,
            title,
            description,
            blockId,
            createdAt,
            updatedAt: sqlDate(),
        };

        const { data: response } = await axios.put(`http://localhost:8871/api/lesson/updateLesson`, newLesson);

        // const { data: response } = await axios.put(
        //     `https://course-backend-meolearn.onrender.com/api/lesson/updateLesson`,
        //     newBlock,
        // );

        if (response.success === false) {
            Swal.fire({
                title: 'Update Block Failed!',
                text: 'Fail to update your block',
                icon: 'error',
            });
        } else {
            setShowEditLessonModal(false);
            Swal.fire({
                title: 'Update Block Success!',
                text: 'Success to update your block',
                icon: 'success',
            });
        }
    };

    const handleDeleteLesson = () => {
        handleCloseLessonEditMenu();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data: response } = await axios.delete(`http://localhost:8871/api/lesson/deleteLesson/${id}`);

                // const { data: response } = await axios.delete(
                //     `https://course-backend-meolearn.onrender.com/api/lesson/deleteLesson/${id}`,
                // );

                if (response.success === false) {
                    Swal.fire({
                        title: 'Deleting Failed!',
                        text: 'Fail to delete your lesson',
                        icon: 'error',
                    });
                } else {
                    handleCloseModal();
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your Lesson has been deleted.',
                        icon: 'success',
                    });
                    navigate(-1);
                }
            }
        });
    };

    const handleOpenLessonEditMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseLessonEditMenu = () => {
        setOpen(null);
    };

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
            case 'wrongAnswer4':
                setWrongAnswer4(newValue);
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
        newQuestions[index].wrongAnswer4 = '';
        setQuestions(newQuestions);
    };

    const handleSaveQuestions = async (e) => {
        e.preventDefault();

        const propertyToRemove = 'label';
        const filteredQuestions = questions.map((question) => {
            const { [propertyToRemove]: removeProperty, ...rest } = question;
            return rest;
        });

        setCurrentShowQuestion(filteredQuestions.find((q) => q.id === currentShowQuestion.id));

        let saveSuccess = true

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

    const handleNavigateBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Container maxWidth="lg">
                {loading && (
                    <Stack display="flex" alignItems="center" justifyContent="center">
                        <SpinnerLoader />
                    </Stack>
                )}
                {!loading && (
                    <>
                        <Stack>
                            <Typography variant="h3" mb={1} display="flex" alignItems="center">
                                <Button onClick={handleNavigateBack} sx={{ minWidth: '36px', marginRight: 1 }}>
                                    <ArrowBackIosRounded />
                                </Button>
                                Lesson: {lesson.title}
                                <IconButton
                                    sx={{ width: '44px', height: '44px' }}
                                    size="large"
                                    color="inherit"
                                    onClick={handleOpenLessonEditMenu}
                                >
                                    <Iconify icon={'eva:more-vertical-fill'} />
                                </IconButton>
                            </Typography>

                            <Stack direction="row" spacing={2} my={2}>
                                <Autocomplete
                                    onChange={(e, value) => handleChangeShowCurrentQuestion(value)}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={questionLabels}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Choose question" />}
                                />

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
                                    disabled={JSON.stringify(currentShowQuestion) === undefined}
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

                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '40ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="standard-basic"
                                        label="Wrong answer 4"
                                        name="wrongAnswer4"
                                        variant="standard"
                                        value={wrongAnswer4}
                                        onChange={(e) => handleChangeTextfieldValue(e.target.name, e.target.value)}
                                    />
                                </Box>
                            </>
                        )}
                    </>
                )}
            </Container>
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseLessonEditMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={handleOpenModal}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Detail
                </MenuItem>
                <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteLesson}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            <Modal
                open={showEditLessonModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={showEditLessonModal}>
                    <Stack sx={style} spacing={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit your lesson
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Stack spacing={3}>
                                {lessonEditError && <Alert severity="error">{lessonEditError}</Alert>}

                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '50ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField
                                        value={title}
                                        onChange={(e) => handleModalTextfieldChange(e)}
                                        name="title"
                                        label={'Title'}
                                        multiline
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '50ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField
                                        value={description}
                                        onChange={(e) => handleModalTextfieldChange(e)}
                                        name="description"
                                        variant="filled"
                                        multiline
                                        rows={4}
                                        label={'Description'}
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                        <Divider sx={{ borderStyle: '3px dashed #000000', color: 'black' }} />
                        <Stack direction="row" justifyContent={'end'} spacing={1}>
                            <Button color="inherit" variant="outlined" onClick={handleCloseModal}>
                                <Typography>Cancel</Typography>
                            </Button>
                            <Button color="primary" variant="contained" onClick={handleUpdateLesson}>
                                <Typography>Update</Typography>
                            </Button>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>
        </>
    );
}

export default LessonEditPage;
