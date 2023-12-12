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
    Autocomplete,
} from '@mui/material';

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

const intervalOptions = ['25 minutes', '30 minutes', '60 minutes'];
const quantityOptions = ['25', '30', '40'];

// ----------------------------------------------------------------------

export default function PracticePage() {
    const [practices, setPractices] = useState([]);
    const [showAddPracticeModal, setShowAddPracticeModal] = useState(false);
    const [newPracticeTitle, setNewPracticeTitle] = useState('');
    const [newPracticeDescription, setNewPracticeDescription] = useState('');
    const [addPracticeError, setAddPracticeError] = useState(null);

    const [practiceIntervalOption, setPracticeIntervalOption] = useState(intervalOptions[0]);
    const [practiceIntervalValue, setPracticeIntervalValue] = useState('');

    const [practiceQuantityOption, setPracticeQuantityOption] = useState(quantityOptions[0]);
    const [practiceQuantityValue, setPracticeQuantityValue] = useState('');

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

    const handleAddNewPractice = async () => {
        if (newPracticeTitle === '') {
            setAddPracticeError('Do not let any info empty!');
        } else {
            const newPractice = {
                id: `${practices.length + 1}`,
                title: newPracticeTitle,
                description: newPracticeDescription,
                interval: '',
                requireQuestionAmount: 30,
                level: 1,
                createdAt: sqlDate(),
                updatedAt: null,
            };

            const { data: response } = await axios.post(
                'http://localhost:8871/api/practice/insertpractice',
                newPractice,
            );

            // const { data: response } = await axios.post(
            //     'https://course-backend-meolearn.onrender.com/api/practice/insertpractice',
            //     newPractice,
            // );

            if (response.data !== null) {
                setShowAddPracticeModal(false);
                setAddPracticeError(null);
                fetchPractices();
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
                                        onChange={(e) => setNewPracticeDescription(e.target.value)}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '50ch' },
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
                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '50ch' },
                                    }}
                                >
                                    <Autocomplete
                                        value={practiceQuantityOption}
                                        onChange={(event, newValue) => {
                                            setPracticeQuantityOption(newValue);
                                        }}
                                        inputValue={practiceQuantityValue}
                                        onInputChange={(event, newInputValue) => {
                                            setPracticeQuantityValue(newInputValue);
                                        }}
                                        id="quantity-options"
                                        options={quantityOptions}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Question quantity" />}
                                    />
                                </Box>
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
