import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import axios from 'axios';

// mui
import {
    Box,
    Card,
    Link,
    Typography,
    Stack,
    Button,
    Popover,
    MenuItem,
    Divider,
    TextField,
    Autocomplete,
    Fade,
    Modal,
    IconButton,
    Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Iconify from '../../../components/iconify';
import { sqlDate } from '../../../utils/formatDate';

const StyledTestImg = styled('img')({
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

const intervalOptions = ['25 minutes', '30 minutes', '60 minutes'];

TestCard.propTypes = {
    test: PropTypes.object,
};

export default function TestCard({ test }) {
    const navigate = useNavigate();

    const [randomImage, setRandomImage] = useState('');
    const [openPopover, setOpenPopover] = useState(null);
    const [showEditTestModal, setShowEditTestModal] = useState(false);
    const [testEditError, setTestEditError] = useState('');
    const [testCardForm, setTestCardForm] = useState(test);

    const { title, id, createdAt, interval, requiredQuestionAmount, description } = testCardForm;

    const [testIntervalOption, setTestIntervalOption] = useState(intervalOptions[intervalOptions.indexOf(interval)]);
    const [testIntervalValue, setTestIntervalValue] = useState('');

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

    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const handleOpenModal = () => {
        handleClosePopover();
        setShowEditTestModal(true);
    };

    const handleCloseModal = () => {
        setTestCardForm(test);
        setShowEditTestModal(false);
    };

    const handleModalTextfieldChange = (e) => {
        setTestCardForm({ ...testCardForm, [e.target.name]: e.target.value });
    };

    const handleUpdateTest = async () => {
        const newTest = {
            id,
            title,
            description,
            interval: testIntervalValue,
            requiredQuestionAmount,
            createdAt,
            updatedAt: sqlDate(),
        };

        console.log(newTest);

        const { data: response } = await axios.put(`http://localhost:8871/api/test/updateTest`, newTest);

        // const { data: response } = await axios.put(
        //     `https://course-backend-meolearn.onrender.com/api/test/updateTest`,
        //     newTest,
        // );

        if (response.success === false) {
            setShowEditTestModal(false);
            setTestCardForm(test);
            Swal.fire({
                title: 'Update Test Failed!',
                text: 'Fail to update your test',
                icon: 'error',
            });
        } else {
            setShowEditTestModal(false);
            Swal.fire({
                title: 'Update Test Successfully!',
                text: 'Success to update your test',
                icon: 'success',
            });
        }
    };

    const handleDeleteTest = () => {
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
                const { data: response } = await axios.delete(`http://localhost:8871/api/test/deleteTest/${id}`);

                // const { data: response } = await axios.delete(
                //     `https://course-backend-meolearn.onrender.com/api/test/deleteTest/${id}`,
                // );

                if (response.success === false) {
                    Swal.fire({
                        title: 'Deleting Failed!',
                        text: 'Fail to delete your test',
                        icon: 'error',
                    });
                } else {
                    handleCloseModal();
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your test has been deleted.',
                        icon: 'success',
                    });
                    navigate(0);
                }
            }
        });
    };

    const handleNavigate = () => {
        navigate(`/dashboard/testdetail/${id}`);
    };

    return (
        <>
            <Card>
                <Box sx={{ pt: '100%', position: 'relative', cursor: 'pointer' }} onClick={handleNavigate}>
                    <StyledTestImg alt={title} src={randomImage} />
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
                <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteTest}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>

            <Modal
                open={showEditTestModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={showEditTestModal}>
                    <Stack sx={style} spacing={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit your test
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Box boxShadow={3}>
                                <StyledModalEditImg alt={title} src={randomImage} />
                            </Box>

                            <Stack spacing={3}>
                                {testEditError && <Alert severity="error">{testEditError}</Alert>}

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
                                        value={testIntervalOption}
                                        onChange={(event, newValue) => {
                                            setTestIntervalOption(newValue);
                                        }}
                                        inputValue={testIntervalValue}
                                        onInputChange={(event, newInputValue) => {
                                            setTestIntervalValue(newInputValue);
                                        }}
                                        id="interval-options"
                                        options={intervalOptions}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Test interval" />}
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                        <Divider sx={{ borderStyle: '3px dashed #000000', color: 'black' }} />
                        <Stack direction="row" justifyContent={'end'} spacing={1}>
                            <Button color="inherit" variant="outlined" onClick={handleCloseModal}>
                                <Typography>Cancel</Typography>
                            </Button>
                            <Button color="primary" variant="contained" onClick={handleUpdateTest}>
                                <Typography>Update</Typography>
                            </Button>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>
        </>
    );
}
