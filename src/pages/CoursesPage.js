import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Button } from '@mui/material';
import axios from 'axios';

import Iconify from '../components/iconify';
import { CourseList } from '../sections/@dashboard/courses';
// import COURSES from '../_mock/courses';

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const { data: response } = await axios.get('https://mocki.io/v1/5748652a-fa7b-4060-8ed9-bf40a64528f9');
            // const { data: response } = await axios.get('http://localhost:8871/api/course/getallcourses');
            setCourses(response.data);
        };

        fetchCourses();
    }, []);

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
                    <Button sx={{ padding: 2 }} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Course Theme
                    </Button>
                </Stack>
            </Container>
        </>
    );
}
