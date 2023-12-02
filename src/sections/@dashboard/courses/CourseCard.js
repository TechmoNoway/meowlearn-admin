import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

// @mui
import { Box, Card, Link, Typography, Stack, Button, MenuItem, Popover, IconButton, Modal, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

// @component
import Iconify from '../../../components/iconify';

const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

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

CourseCard.propTypes = {
    course: PropTypes.object,
};

export default function CourseCard({ course }) {
    const { title, id } = course;
    const [randomImage, setRandomImage] = useState('');
    const [open, setOpen] = useState(null);
    const [showAddCourseModal, setShowAddCourseModal] = useState(false);

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

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleOpenModal = () => {
        setShowAddCourseModal(true);
    };

    const handleCloseModal = () => {
        setShowAddCourseModal(false);
    };

    const handleEditBlock = () => {};

    const handleDeleteBlock = () => {
        handleCloseMenu();

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
                const { data: response } = await axios.post('');

                if (response.data === null || response) {
                    Swal.fire({
                        title: 'Deleting Failed!',
                        text: 'Fail to delete your block',
                        icon: 'error',
                    });
                } else {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your Block has been deleted.',
                        icon: 'success',
                    });
                }
            }
        });
    };

    const handleNavigate = () => {
        navigate(`/dashboard/coursedetail/${id}`);
    };

    return (
        <>
            {/* <Button onClick={handleNavigate}> */}
            <Card>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    <StyledProductImg alt={title} src={randomImage} />
                </Box>

                <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                    <Link href={`/dashboard/coursedetail/${id}`} color="inherit" underline="hover">
                        <Typography variant="subtitle2">{title}</Typography>
                    </Link>
                    <IconButton
                        sx={{ width: '44px', height: '44px' }}
                        size="large"
                        color="inherit"
                        onClick={handleOpenMenu}
                    >
                        <Iconify icon={'eva:more-vertical-fill'} />
                    </IconButton>
                </Stack>
            </Card>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
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
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Detail
                </MenuItem>
                <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteBlock}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            {/* </Button> */}

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
                            {addCourseError && <Alert severity="error">{addCourseError}</Alert>}

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
        </>
    );
}
