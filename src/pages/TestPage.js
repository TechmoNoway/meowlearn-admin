import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

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
    styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// component
import Iconify from '../components/iconify';
import { TestList } from '../sections/@dashboard/test';

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

export default function TestPage() {
    const [tests, setTests] = useState([]);
    const [showAddTestModal, setShowAddTestModal] = useState(false);
    const [newTestTitle, setNewTestTitle] = useState('');
    const [newTestDescription, setNewTestDescription] = useState('');
    const [addTestError, setAddTestError] = useState(null);
    const [testFile, setTestFile] = useState(null);
    const [testFileName, setTestFileName] = useState('');


    const fetchTests = async () => {
        const { data: response } = await axios.get('http://localhost:8871/api/test/getalltests');

        // const { data: response } = await axios.get('https://course-backend-meolearn.onrender.com/api/test/getalltests');

        setTests(response.data);
    };

    useEffect(() => {
        fetchTests();
    }, []);

    const handleOpenModal = () => {
        setShowAddTestModal(true);
    };

    const handleCloseModal = () => {
        setShowAddTestModal(false);
        setAddTestError(null);
    };

    // const handleAddNewTest = async () => {
    //     if (newTestTitle === '') {
    //         setAddTestError('Do not let any info empty!');
    //     } else {
    //         const newTest = {
    //             id: `${tests.length + 1}`,
    //             title: newTestTitle,
    //             interval: '',
    //             description: newTestDescription,
    //             requireQuestionAmount: 30,
    //             level: 1,
    //             createdAt: sqlDate(),
    //             updatedAt: null,
    //         };

    //         const { data: response } = await axios.post('http://localhost:8871/api/test/inserttest', newTest);

    //         // const { data: response } = await axios.post(
    //         //     'https://course-backend-meolearn.onrender.com/api/test/inserttest',
    //         //     newTest,
    //         // );

    //         if (response.data !== null) {
    //             setShowAddTestModal(false);
    //             setAddTestError(null);
    //             fetchTests();
    //         }
    //     }
    // };

    const handlePracticeFileUpload = (e) => {
        const file = e.target.files[0];
        setTestFile(file);
        setTestFileName(file.name);
    };

    const handleAddNewTest = async () => {
        if (newTestTitle === '' || testFile === null) {
            setAddTestError('Do not let any info empty!');
        } else {
            const newTest = {
                title: newTestTitle,
                description: newTestDescription,
                interval: '60 minutes',
                requireQuestionAmount: 40,
                level: 1,
                courseId: "2701034384",
            };

            const formData = new FormData();

            formData.append('test', JSON.stringify(newTest));
            formData.append('file', testFile);

            const params = new URLSearchParams();
            params.append('test', JSON.stringify(newTest));
            params.append('file', testFile);

            console.log(formData);
            console.log(params.toString());

            const url = `http://localhost:8871/api/practice/insertpractice`;

            const { data: response } = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data !== null) {
                setShowAddTestModal(false);
                setTestFileName('');
                setTestFile(null);
                setAddTestError(null);
                fetchTests();

                Swal.fire({
                    title: 'Create Test Successfully!',
                    text: 'Success to create your test',
                    icon: 'success',
                });
            } else {
                setShowAddTestModal(false);
                Swal.fire({
                    title: 'Create Test Fail!',
                    text: 'Fail to create your test',
                    icon: 'error',
                });
            }
        }
    };

    return (
        <>
            <Helmet>
                <title> Tests | MeowLearn </title>
            </Helmet>

            <Container>
                <Typography variant="h4" mb={5}>
                    English Test
                </Typography>

                <TestList tests={tests} />

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
                        New English Test
                    </Button>
                </Stack>

                <Modal
                    open={showAddTestModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Fade in={showAddTestModal}>
                        <Stack sx={style} spacing={2}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Create new test
                            </Typography>
                            <Stack spacing={3}>
                                {addTestError && <Alert severity="error">{addTestError}</Alert>}

                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '50ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField
                                        name="title"
                                        label={'Title'}
                                        onChange={(e) => setNewTestTitle(e.target.value)}
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
                                        onChange={(e) => setNewTestDescription(e.target.value)}
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
                                    {testFileName && <span>{testFileName}</span>}
                                </Stack>
                            </Stack>
                            <Divider sx={{ borderStyle: '3px dashed #000000', color: 'black' }} />
                            <Stack direction="row" justifyContent={'end'} spacing={1}>
                                <Button color="inherit" variant="outlined" onClick={() => setShowAddTestModal(false)}>
                                    <Typography>Cancel</Typography>
                                </Button>
                                <Button color="primary" variant="contained" onClick={handleAddNewTest}>
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
