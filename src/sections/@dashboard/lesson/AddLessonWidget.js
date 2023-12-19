import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
    Badge,
    Divider,
    Fade,
    Modal,
    Stack,
    Typography,
    Button,
    TextField,
    Box,
    Alert,
    CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    zIndex: 999,
    right: 0,
    display: 'flex',
    cursor: 'pointer',
    position: 'fixed',
    alignItems: 'center',
    top: theme.spacing(16),
    height: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    boxShadow: theme.customShadows.z20,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
    borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
    transition: theme.transitions.create('opacity'),
    '&:hover': { opacity: 0.72 },
}));

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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

// ----------------------------------------------------------------------

export default function AddLessonWidget() {
    const navigate = useNavigate();
    const param = useParams();

    const [showAddLessonModal, setShowAddLessonModal] = useState(false);
    const [newLessonTitle, setNewLessonTitle] = useState('');
    const [newLessonDescription, setNewLessonDescription] = useState('');
    const [addLessonError, setAddLessonError] = useState(null);
    const [lessonFile, setLessonFile] = useState(null);
    const [lessonFileName, setLessonFileName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOpenModal = () => {
        setLessonFileName('');
        setLessonFile(null);
        setShowAddLessonModal(true);
    };

    const handleCloseModal = () => {
        setShowAddLessonModal(false);
        setLessonFileName('');
        setLessonFile(null);
        setAddLessonError(null);
    };

    const handleLessonFileUpload = (e) => {
        const file = e.target.files[0];
        setLessonFile(file);
        setLessonFileName(file.name);
    };

    const handleAddNewLesson = async () => {
        if (newLessonTitle === '' || lessonFile === null) {
            setAddLessonError('Do not let any info empty!');
        } else {
            setLoading(true);

            const newLesson = {
                title: newLessonTitle,
                description: newLessonDescription,
                blockId: `${param.courseId}`,
            };

            const formData = new FormData();

            formData.append('lesson', JSON.stringify(newLesson));
            formData.append('file', lessonFile);

            const params = new URLSearchParams();
            params.append('lesson', JSON.stringify(newLesson));
            params.append('file', lessonFile);

            const url = `http://localhost:8871/api/lesson/insertlesson`;

            const { data: response } = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data !== null) {
                setShowAddLessonModal(false);
                setLessonFileName('');
                setLessonFile(null);
                setAddLessonError(null);
                setLoading(false);
                navigate(0);
                Swal.fire({
                    title: 'Create Lesson Successfully!',
                    text: 'Success to create your lesson',
                    icon: 'success',
                });

            } else {
                setShowAddLessonModal(false);
                Swal.fire({
                    title: 'Create Lesson Fail!',
                    text: 'Fail to create your lesson',
                    icon: 'error',
                });
            }
        }
    };

    return (
        <>
            <StyledRoot>
                <Badge showZero color="error" onClick={handleOpenModal}>
                    <Iconify icon="material-symbols:box-add" width={24} height={24} />
                    <Typography ml={1} fontSize={18}>
                        New lesson
                    </Typography>
                </Badge>
            </StyledRoot>
            <Modal
                open={showAddLessonModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={showAddLessonModal}>
                    <Stack sx={style} spacing={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create new lesson
                        </Typography>
                        <Stack spacing={3}>
                            {addLessonError && <Alert severity="error">{addLessonError}</Alert>}

                            <Box
                                sx={{
                                    '& > :not(style)': { width: '50ch' },
                                }}
                                autoComplete="off"
                            >
                                <TextField
                                    name="title"
                                    label={'Title'}
                                    onChange={(e) => setNewLessonTitle(e.target.value)}
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
                                    onChange={(e) => setNewLessonDescription(e.target.value)}
                                />
                            </Box>

                            <Stack spacing={1} direction="row" alignItems="center">
                                <Button
                                    sx={{ height: 50 }}
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload practice file
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleLessonFileUpload}
                                    />
                                </Button>
                                {lessonFileName && <span>{lessonFileName}</span>}
                            </Stack>
                        </Stack>
                        <Divider sx={{ borderStyle: '3px dashed #000000', color: 'black' }} />
                        <Stack direction="row" justifyContent={'end'} spacing={1}>
                            <Button color="inherit" variant="outlined" onClick={() => setShowAddLessonModal(false)}>
                                <Typography>Cancel</Typography>
                            </Button>
                            <Button color="primary" variant="contained" disabled={loading} onClick={handleAddNewLesson}>
                                {loading ? <CircularProgress size={22} sx={{ px: 2 }} /> : <Typography>Add New</Typography>}
                            </Button>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>
        </>
    );
}
