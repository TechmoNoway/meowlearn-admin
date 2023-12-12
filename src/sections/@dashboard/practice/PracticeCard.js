import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

// mui
import {
    Box,
    Card,
    Link,
    Typography,
    Stack,
    Button,
    MenuItem,
    Modal,
    Fade,
    Divider,
    TextField,
    Alert,
    Popover,
    IconButton,
    Autocomplete,
} from '@mui/material';

// component
import Iconify from '../../../components/iconify';
import { sqlDate } from '../../../utils/formatDate';
import { StyledModalEditImg, StyledPracticeImg, practiceModalStyle } from './styles';

const intervalOptions = ['25 minutes', '30 minutes', '60 minutes'];

PracticeCard.propTypes = {
    practice: PropTypes.object,
};

export default function PracticeCard({ practice }) {
    const navigate = useNavigate();

    const [openPopover, setOpenPopover] = useState(null);
    const [randomImage, setRandomImage] = useState('');
    const [showEditPracticeModal, setShowEditPracticeModal] = useState(false);
    const [practiceEditError, setPracticeEditError] = useState('');
    const [practiceCardForm, setPracticeCardForm] = useState(practice);

    const { title, id, interval, requiredQuestionAmount, description, createdAt } = practiceCardForm;

    const [practiceIntervalOption, setPracticeIntervalOption] = useState(
        intervalOptions[intervalOptions.indexOf(interval)],
    );
    const [practiceIntervalValue, setPracticeIntervalValue] = useState('');

    const practiceCovers = [
        '/assets/images/courses/course_1.jpg',
        '/assets/images/courses/course_2.jpg',
        '/assets/images/courses/course_3.jpg',
        '/assets/images/courses/course_4.jpg',
        '/assets/images/courses/course_5.jpg',
        '/assets/images/courses/course_6.jpg',
    ];

    useEffect(() => {
        const randomingCover = () => {
            const randomIndex = Math.floor(Math.random() * practiceCovers.length);
            const randomImage = practiceCovers[randomIndex];

            setRandomImage(randomImage);
        };

        randomingCover();
    }, []);

    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const handleOpenModal = () => {
        handleClosePopover();
        setShowEditPracticeModal(true);
    };

    const handleCloseModal = () => {
        setPracticeCardForm(practice);
        setShowEditPracticeModal(false);
    };

    const handleModalTextfieldChange = (e) => {
        setPracticeCardForm({ ...practiceCardForm, [e.target.name]: e.target.value });
    };

    const handleUpdatePractice = async () => {
        const newPractice = {
            id,
            title,
            description,
            interval: practiceIntervalValue,
            requiredQuestionAmount,
            createdAt,
            updatedAt: sqlDate(),
        };

        const { data: response } = await axios.put(`http://localhost:8871/api/practice/updatePractice`, newPractice);

        // const { data: response } = await axios.put(
        //     `https://course-backend-meolearn.onrender.com/api/practice/updatePractice`,
        //     newPractice,
        // );

        if (response.success === false) {
            setShowEditPracticeModal(false);
            Swal.fire({
                title: 'Update Practice Failed!',
                text: 'Fail to update your practice',
                icon: 'error',
            });
        } else {
            setShowEditPracticeModal(false);
            Swal.fire({
                title: 'Update Practice Success!',
                text: 'Success to update your practice',
                icon: 'success',
            });
        }
    };

    const handleDeletePractice = () => {
        handleClosePopover();

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
                const { data: response } = await axios.delete(
                    `http://localhost:8871/api/practice/deletePractice/${id}`,
                );

                // const { data: response } = await axios.delete(
                //     `https://course-backend-meolearn.onrender.com/api/practice/deletePractice/${id}`,
                // );

                if (response.success === false) {
                    Swal.fire({
                        title: 'Deleting Failed!',
                        text: 'Fail to delete your practice',
                        icon: 'error',
                    });
                } else {
                    handleCloseModal();
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your practice has been deleted.',
                        icon: 'success',
                    });
                    navigate(0);
                }
            }
        });
    };

    const handleNavigate = () => {
        navigate(`/dashboard/practicedetail/${title}`);
    };

    return (
        <>
            {/* <Button onClick={handleNavigate}> */}
            <Card>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    <StyledPracticeImg alt={title} src={randomImage} />
                </Box>

                <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ p: 2 }}>
                    <Link onClick={handleNavigate} color="inherit" underline="hover">
                        <Typography variant="subtitle2">{title}</Typography>
                    </Link>
                    <IconButton
                        sx={{ width: '44px', height: '44px' }}
                        size="large"
                        color="inherit"
                        onClick={handleOpenPopover}
                    >
                        <Iconify icon={'eva:more-vertical-fill'} />
                    </IconButton>
                </Stack>
            </Card>

            <Popover
                open={Boolean(openPopover)}
                anchorEl={openPopover}
                onClose={handleClosePopover}
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
                <MenuItem sx={{ color: 'error.main' }} onClick={handleDeletePractice}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
            {/* </Button> */}

            <Modal
                open={showEditPracticeModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={showEditPracticeModal}>
                    <Stack sx={practiceModalStyle} spacing={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit your practice
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Box boxShadow={3}>
                                <StyledModalEditImg alt={title} src={randomImage} />
                            </Box>

                            <Stack spacing={3}>
                                {practiceEditError && <Alert severity="error">{practiceEditError}</Alert>}

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
                                        name="description"
                                        variant="filled"
                                        multiline
                                        rows={4}
                                        label={'Description'}
                                        onChange={(e) => handleModalTextfieldChange(e)}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '37ch' },
                                    }}
                                >
                                    <Autocomplete
                                        value={practiceIntervalOption}
                                        onChange={(event, newValue) => {
                                            setPracticeIntervalOption(newValue);
                                        }}
                                        inputValue={practiceIntervalValue}
                                        onInputChange={(event, newInputValue) => {
                                            setPracticeIntervalValue(newInputValue);
                                        }}
                                        id="interval-options"
                                        options={intervalOptions}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Practice interval" />}
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                        <Divider sx={{ borderStyle: '3px dashed #000000', color: 'black' }} />
                        <Stack direction="row" justifyContent={'end'} spacing={1}>
                            <Button color="inherit" variant="outlined" onClick={handleCloseModal}>
                                <Typography>Cancel</Typography>
                            </Button>
                            <Button color="primary" variant="contained" onClick={handleUpdatePractice}>
                                <Typography>Update</Typography>
                            </Button>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>
        </>
    );
}
