import PropTypes from 'prop-types';
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StyledPracticeImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

TestCard.propTypes = {
    test: PropTypes.object,
};

export default function TestCard({ test }) {
    const { title, id } = test;
    const [randomImage, setRandomImage] = useState('');

    const navigate = useNavigate();

    const testCovers = [
        '/assets/images/courses/course_1.jpg',
        '/assets/images/courses/course_2.jpg',
        '/assets/images/courses/course_3.jpg',
        '/assets/images/courses/course_4.jpg',
        '/assets/images/courses/course_5.jpg',
        '/assets/images/courses/course_6.jpg',
    ];

    useEffect(() => {
        const randomingCover = () => {
            const randomIndex = Math.floor(Math.random() * testCovers.length);
            const randomImage = testCovers[randomIndex];

            setRandomImage(randomImage);
        };

        randomingCover();
    }, []);

    const handleNavigate = () => {
        navigate(`/dashboard/testdetail/${title}`);
    };

    return (
        <Button onClick={handleNavigate}>
            <Card>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    <StyledPracticeImg alt={title} src={randomImage} />
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
