import PropTypes from 'prop-types';
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

CourseCard.propTypes = {
    course: PropTypes.object,
};

export default function CourseCard({ course }) {
    const { title, id } = course;
    const [randomImage, setRandomImage] = useState('');

    const navigate = useNavigate();

    const courseCovers = [
        '/assets/images/courses/course_1.jpg',
        '/assets/images/courses/course_2.jpg',
        '/assets/images/courses/course_3.jpg',
        '/assets/images/courses/course_4.jpg',
        '/assets/images/courses/course_5.jpg',
        '/assets/images/courses/course_6.jpg',
    ];

    useEffect(() => {
        const randomingCover = () => {
            const randomIndex = Math.floor(Math.random() * courseCovers.length);
            const randomImage = courseCovers[randomIndex];

            setRandomImage(randomImage);
        };

        randomingCover();
    }, []);

    const handleNavigate = () => {
        navigate(`/dashboard/coursedetail/${id}`);
    };

    return (
        <Button onClick={handleNavigate}>
            <Card>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    <StyledProductImg alt={title} src={randomImage} />
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                    <Link color="inherit" underline="hover">
                        <Typography variant="subtitle2">{title}</Typography>
                    </Link>
                </Stack>
            </Card>
        </Button>
    );
}
