import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Swal from 'sweetalert2';

// mui
import {
    Container,
    Stack,
    Typography,
    Button,
    Modal,
    Fade,
    Box,
    TextField,
    Divider,
    Alert,
    Autocomplete,
    styled,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// components
import Iconify from '../components/iconify';
import { PracticeList } from '../sections/@dashboard/practice';
import { sqlDate } from '../utils/formatDate';

// ----------------------------------------------------------------------

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

export default function PracticePage() {
    const [practices, setPractices] = useState([]);
    const [showAddPracticeModal, setShowAddPracticeModal] = useState(false);
    const [newPracticeTitle, setNewPracticeTitle] = useState('');
    const [newPracticeDescription, setNewPracticeDescription] = useState('');
    const [addPracticeError, setAddPracticeError] = useState(null);
    const [practiceFile, setPracticeFile] = useState(null);
    const [practiceFileName, setPracticeFileName] = useState('');

    const fetchPractices = async () => {
        const { data: response } = await axios.get('http://localhost:8871/api/practice/getallpractices');

        // const { data: response } = await axios.get(
        //     'https://course-backend-meolearn.onrender.com/api/practice/getallpractices',
        // );

        setPractices(response.data);
    };

    useEffect(() => {
        fetchPractices();
    }, []);

    const handleOpenModal = () => {
        setShowAddPracticeModal(true);
    };

    const handleCloseModal = () => {
        setShowAddPracticeModal(false);
        setAddPracticeError(null);
    };

    const handlePracticeFileUpload = (e) => {
        const file = e.target.files[0];
        setPracticeFile(file)
        setPracticeFileName(file.name);
    };

    const handleAddNewPractice = async () => {
        if (newPracticeTitle === '' || practiceFile === null) {
            setAddPracticeError('Do not let any info empty!');
        } else {
            const newPractice = {
                title: newPracticeTitle,
                description: newPracticeDescription,
                interval: '60 minutes',
                requireQuestionAmount: 40,
                level: 1,
                courseId: "2701034384",
            };

            const formData = new FormData();

            formData.append('practice', JSON.stringify(newPractice));
            formData.append('file', practiceFile);

            const params = new URLSearchParams();
            params.append('practice', JSON.stringify(newPractice));
            params.append('file', practiceFile);

            const url = `http://localhost:8871/api/practice/insertpractice`;

            const { data: response } = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data !== null) {
                setShowAddPracticeModal(false);
                setPracticeFileName('');
                setPracticeFile(null);
                setAddPracticeError(null);
                fetchPractices();

                Swal.fire({
                    title: 'Create Practice Successfully!',
                    text: 'Success to create your practice',
                    icon: 'success',
                });
            } else {
                setShowAddPracticeModal(false);
                Swal.fire({
                    title: 'Create Practice Fail!',
                    text: 'Fail to create your practice',
                    icon: 'error',
                });
            }
        }
    };

    return (
        <>
            <Helmet>
                <title> Practices | MeowLearn </title>
            </Helmet>

            <Container>
                <Typography variant="h4" mb={5}>
                    English Practice
                </Typography>

                <PracticeList practices={practices} />

                <Stack
                    sx={{ marginLeft: '8px', marginTop: '20px' }}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Button
                        sx={{ padding: 2 }}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={handleOpenModal}
                    >
                        New English Practice
                    </Button>
                </Stack>

                <Modal
                    open={showAddPracticeModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Fade in={showAddPracticeModal}>
                        <Stack sx={style} spacing={2}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Create new practice
                            </Typography>
                            <Stack spacing={3}>
                                {addPracticeError && <Alert severity="error">{addPracticeError}</Alert>}

                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '50ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField
                                        name="title"
                                        label={'Title'}
                                        onChange={(e) => setNewPracticeTitle(e.target.value)}
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
                                            onChange={handlePracticeFileUpload}
                                        />
                                    </Button>
                                    {practiceFileName && <span>{practiceFileName}</span>}
                                </Stack>
                            </Stack>
                            <Divider sx={{ borderStyle: '3px dashed #000000', color: 'black' }} />
                            <Stack direction="row" justifyContent={'end'} spacing={1}>
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    onClick={() => setShowAddPracticeModal(false)}
                                >
                                    <Typography>Cancel</Typography>
                                </Button>
                                <Button color="primary" variant="contained" onClick={handleAddNewPractice}>
                                    <Typography>Add New</Typography>
                                </Button>
                            </Stack>
                        </Stack>
                    </Fade>
                </Modal>
            </Container>
        </>
    );
}
