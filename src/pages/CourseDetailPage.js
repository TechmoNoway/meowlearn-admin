import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CourseDetail } from '../sections/@dashboard/courses';
import AddLessonWidget from '../sections/@dashboard/lesson/AddLessonWidget';

function CourseDetailPage() {
    const param = useParams();

    const [courses, setCourses] = useState([]);
    const [courseFound, setCourseFound] = useState({});

    useEffect(() => {
        const fetchCourses = async () => {
            const { data: response } = await axios.get('http://localhost:8871/api/block/getallblocks');

            // const { data: response } = await axios.get(
            //     'https://course-backend-meolearn.onrender.com/api/block/getallblocks',
            // );

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

            <CourseDetail block={courseFound} />
            <AddLessonWidget />
        </>
    );
}

export default CourseDetailPage;
