import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
import axios from 'axios';

import Iconify from '../components/iconify';
import { TestList } from '../sections/@dashboard/test';
import { sqlDate } from '../utils/formatDate';

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

export default function TestPage() {
    const [tests, setTests] = useState([]);
    const [showAddTestModal, setShowAddTestModal] = useState(false);
    const [newTestTitle, setNewTestTitle] = useState('');
    const [addTestError, setAddTestError] = useState(null);

    const [testIntervalOption, setTestIntervalOption] = useState(intervalOptions[0]);
    const [testIntervalValue, setTestIntervalValue] = useState('');

    const [testQuantityOption, setTestQuantityOption] = useState(quantityOptions[0]);
    const [testQuantityValue, setTestQuantityValue] = useState('');

    const fetchTests = async () => {
        const { data: response } = await axios.get('http://localhost:8871/api/test/getalltests');
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

    const handleAddNewTest = async () => {
        if (newTestTitle === '') {
            setAddTestError('Do not let any info empty!');
        } else {
            const newTest = {
                id: `${tests.length + 1}`,
                title: newTestTitle,
                interval: '',
                requireQuestionAmount: 30,
                level: 1,
                createdAt: sqlDate(),
                updatedAt: null,
            };

            const { data: response } = await axios.post('http://localhost:8871/api/test/inserttest', newTest);

            if (response.data !== null) {
                setShowAddTestModal(false);
                setAddTestError(null);
                fetchTests();
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
                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '50ch' },
                                    }}
                                >
                                    <Autocomplete
                                        value={testQuantityOption}
                                        onChange={(event, newValue) => {
                                            setTestQuantityOption(newValue);
                                        }}
                                        inputValue={testQuantityValue}
                                        onInputChange={(event, newInputValue) => {
                                            setTestQuantityValue(newInputValue);
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
