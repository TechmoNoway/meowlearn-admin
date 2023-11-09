import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CourseDetail } from '../sections/@dashboard/courses';
import COURSES from '../_mock/courses';

function CourseDetailPage() {
    const param = useParams();

    const [courses, setCourses] = useState([]);
    const [courseFound, setCourseFound] = useState({});

    useEffect(() => {
        const fetchCourses = async () => {
            const { data: response } = await axios.get('https://mocki.io/v1/5748652a-fa7b-4060-8ed9-bf40a64528f9');

            setCourses(response.data);
            setCourseFound(response.data.find((item) => item.id === param.courseId));
        };

        fetchCourses();
    }, []);

    // const courseFound = courses.find((item) => item.id === param.courseId);

    return (
        <>
            <Helmet>
                <title> CoursesDetail | MeowLearn </title>
            </Helmet>

            <CourseDetail course={courseFound} />
        </>
    );
}

export default CourseDetailPage;
