import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

// @mui
import {
    Box,
    Card,
    Link,
    Typography,
    Stack,
    Button,
    MenuItem,
    Popover,
    IconButton,
    Modal,
    Fade,
    Alert,
    TextField,
    Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// @component
import Iconify from '../../../components/iconify';
import { sqlDate } from '../../../utils/formatDate';

const StyledMainCardImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

const StyledModalEditImg = styled('img')({
    width: '100%',
    height: 310,
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
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
    const navigate = useNavigate();

    const [randomImage, setRandomImage] = useState('');
    const [open, setOpen] = useState(null);
    const [showEditBlockModal, setShowEditBlockModal] = useState(false);
    const [blockEditError, setBlockEditError] = useState('');
    const [courseCardForm, setCourseCardForm] = useState(course);

    const { title, id, description, courseId, createdAt } = courseCardForm;

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

    const handleOpenBlockEditMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseBlockEditMenu = () => {
        setOpen(null);
    };

    const handleOpenModal = () => {
        handleCloseBlockEditMenu();
        setShowEditBlockModal(true);
    };

    const handleCloseModal = () => {
        setCourseCardForm(course);
        setShowEditBlockModal(false);
    };

    const handleModalTextfieldChange = (e) => {
        setCourseCardForm({ ...courseCardForm, [e.target.name]: e.target.value });
    };

    const handleUpdateBlock = async () => {
        const newBlock = {
            id,
            title,
            description,
            courseId,
            createdAt,
            updatedAt: sqlDate(),
        };

        const { data: response } = await axios.put(`http://localhost:8871/api/block/updateBlock`, newBlock);

        // const { data: response } = await axios.put(
        //     `https://course-backend-meolearn.onrender.com/api/block/updateBlock`,
        //     newBlock,
        // );

        if (response.success === false) {
            Swal.fire({
                title: 'Update Block Failed!',
                text: 'Fail to update your block',
                icon: 'error',
            });
        } else {
            setShowEditBlockModal(false);
            Swal.fire({
                title: 'Update Block Success!',
                text: 'Success to update your block',
                icon: 'success',
            });
        }
    };

    const handleDeleteBlock = () => {
        handleCloseBlockEditMenu();

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
                const { data: response } = await axios.delete(`http://localhost:8871/api/block/deleteBlock/${id}`);

                // const { data: response } = await axios.delete(
                //     `https://course-backend-meolearn.onrender.com/api/block/deleteBlock/${id}`,
                // );

                if (response.success === false) {
                    Swal.fire({
                        title: 'Deleting Failed!',
                        text: 'Fail to delete your block',
                        icon: 'error',
                    });
                } else {
                    handleCloseModal();
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your Block has been deleted.',
                        icon: 'success',
                    });
                    navigate(0);
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
                <Box sx={{ pt: '100%', position: 'relative', cursor: 'pointer' }} onClick={handleNavigate}>
                    <StyledMainCardImg alt={title} src={randomImage} />
                </Box>

                <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ p: 2 }}>
                    <Link onClick={handleNavigate} color="inherit" underline="hover">
                        <Typography variant="subtitle2">{title}</Typography>
                    </Link>
                    <IconButton
                        sx={{ width: '44px', height: '44px' }}
                        size="large"
                        color="inherit"
                        onClick={handleOpenBlockEditMenu}
                    >
                        <Iconify icon={'eva:more-vertical-fill'} />
                    </IconButton>
                </Stack>
            </Card>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseBlockEditMenu}
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
                <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteBlock}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            {/* </Button> */}

            <Modal
                open={showEditBlockModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={showEditBlockModal}>
                    <Stack sx={style} spacing={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit your block
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Box boxShadow={3}>
                                <StyledModalEditImg alt={title} src={randomImage} />
                            </Box>

                            <Stack spacing={3}>
                                {blockEditError && <Alert severity="error">{blockEditError}</Alert>}

                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '37ch' },
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
                                        '& > :not(style)': { width: '37ch' },
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
                            <Button color="primary" variant="contained" onClick={handleUpdateBlock}>
                                <Typography>Update</Typography>
                            </Button>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>
        </>
    );
}
