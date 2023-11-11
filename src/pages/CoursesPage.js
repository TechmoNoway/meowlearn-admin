import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Button, Modal, Fade, Box, TextField, Divider } from '@mui/material';
import axios from 'axios';

import Iconify from '../components/iconify';
import { CourseList } from '../sections/@dashboard/courses';
// import COURSES from '../_mock/courses';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 555,
    bgcolor: 'background.paper',
    border: '1px solid transparent',
    borderRadius: '7px',
    boxShadow: 24,
    p: 4,
};

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);

    const [showAddCourseModal, setShowAddCourseModal] = useState(false);
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [newCourseDes, setNewCourseDes] = useState('');

    const fetchCourses = async () => {
        const { data: response } = await axios.get('http://localhost:8871/api/block/getallblocks');
        // const { data: response } = await axios.get('http://localhost:8871/api/course/getallcourses');
        setCourses(response.data);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleOpenModal = () => {
        setShowAddCourseModal(true);
    };

    const handleCloseModal = () => {
        setShowAddCourseModal(false);
    };

    const handleAddNewCourse = async () => {
        const newCourse = {
            id: `${courses.length + 1}`,
            title: newCourseTitle,
            description: newCourseDes,
            courseId: '9',
            createdAt: '2023-11-01',
            updatedAt: null,
        };

        const { data: response } = await axios.post('http://localhost:8871/api/block/insertblock', newCourse);

        console.log(response.data);

        if (response.data !== null) {
            setShowAddCourseModal(false);
            fetchCourses();
        }
    };

    return (
        <>
            <Helmet>
                <title> Courses | MeowLearn </title>
            </Helmet>

            <Container>
                <Typography variant="h4" mb={5}>
                    Courses
                </Typography>

                <CourseList courses={courses} />

                <Stack
                    sx={{ marginLeft: '8px', marginTop: '20px' }}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Button
                        sx={{ padding: 2 }}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={handleOpenModal}
                    >
                        New Course Theme
                    </Button>
                </Stack>

                <Modal
                    open={showAddCourseModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Fade in={showAddCourseModal}>
                        <Stack sx={style} spacing={2}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add your new course
                            </Typography>
                            <Stack spacing={3}>
                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '50ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField
                                        name="title"
                                        label={'Title'}
                                        onChange={(e) => setNewCourseTitle(e.target.value)}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '50ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField
                                        name="description"
                                        variant="filled"
                                        multiline
                                        rows={4}
                                        label={'Description'}
                                        onChange={(e) => setNewCourseDes(e.target.value)}
                                    />
                                </Box>
                            </Stack>
                            <Divider sx={{ borderStyle: '3px dashed #000000', color: 'black' }} />
                            <Stack direction="row" justifyContent={'end'} spacing={1}>
                                <Button color="inherit" variant="outlined" onClick={() => setShowAddCourseModal(false)}>
                                    <Typography>Cancel</Typography>
                                </Button>
                                <Button color="primary" variant="contained" onClick={handleAddNewCourse}>
                                    <Typography>Add New</Typography>
                                </Button>
                            </Stack>
                        </Stack>
                    </Fade>
                </Modal>
            </Container>
        </>
    );
}
