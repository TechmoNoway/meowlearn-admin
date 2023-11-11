import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AnimatePresence, motion } from 'framer-motion';

// @mui
import { makeStyles } from '@mui/styles';
import { Box, Button, Container, Divider, Fade, Modal, Stack, TextField, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

// @component
import Iconify from '../components/iconify';
import { useUserContext } from '../context/UserContext';

const useStyles = makeStyles((theme) => ({
    avatarUpload: {
        position: 'relative',
    },
    avatarEdit: {
        position: 'absolute',
        zIndex: 1,
        left: '145px',
        top: '10px',
    },
    imageUpload: {
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '34px',
        height: '34px',
        marginBottom: 0,
        borderRadius: '50%',
        background: '#ffffff',
        border: '1px solid transparent',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.12)',
        cursor: 'pointer',
        fontWeight: 'normal',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            background: '#f1f1f1',
            borderColor: '#d6d6d6',
        },
    },
    cameraIcon: {
        fontSize: '16px',
        '&:hover': {
            color: 'lightcoral',
        },
    },
    avatarPreview: {
        width: '192px',
        height: '192px',
        position: 'relative',
        borderRadius: '50%',
        border: '6px solid #f8f8f8',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        transition: 'all 0.2s ease-in-out',
    },
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

function ProfilePage() {
    const classes = useStyles();
    const { user, setUser } = useUserContext();

    const [preview, setPreview] = useState(null);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showSaveBar, setShowSaveBar] = useState(false);

    useEffect(() => {
        const handleFetchUser = async () => {
            if (localStorage.getItem('token')) {
                const { data: userListResponse } = await axios.get(
                    'https://mocki.io/v1/5086a0ab-a71b-41d5-b02f-333f3f20f09a',
                );

                const result = userListResponse.data.find(
                    (obj) => obj.username === jwtDecode(localStorage.getItem('token')).sub,
                );

                setCurrentUser(result);
                setNewUsername(result.username);
                setNewEmail(result.email);
            }
        };

        handleFetchUser();
    }, []);

    useEffect(() => {
        if (preview !== currentUser.avatar && preview !== null) {
            setShowSaveBar(true);
        }
    }, [preview]);

    const handleOpenPasswordModal = () => setPasswordOpen(true);

    const handleClosePasswordModal = () => setPasswordOpen(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOnChangeUsername = (e) => {
        setNewUsername(e.target.value);

        if (e.target.value !== currentUser.username) {
            setShowSaveBar(true);
        } else {
            setShowSaveBar(false);
        }
    };

    const handleOnChangeEmail = (e) => {
        setNewEmail(e.target.value);

        if (e.target.value !== currentUser.email) {
            setShowSaveBar(true);
        } else {
            setShowSaveBar(false);
        }
    };

    const handleSaveChangeProfile = () => {
        setShowSaveBar(false);
    };

    const handleResetProfileInfo = () => {
        setNewUsername(currentUser.username);
        setNewEmail(currentUser.email);
        setShowSaveBar(false);
        setPreview(null);
    };

    const handleSaveChangePassword = async () => {
        setPasswordOpen(false);

        // const newUser = {
        //     id: '2',
        //     username: 'Kenny Will',
        //     email: 'nguyentriky@gmail.com',
        //     password: newPassword,
        //     avatar: 'https://i.ibb.co/mhJM5g0/cat-ocean-eyes-xh-1920x1080.jpg',
        //     roleId: '2',
        //     createdAt: null,
        //     updatedAt: null,
        //     oldPassword,
        // };

        // const { data: response } = await axios.put('http://localhost:8870/api/user/updateUser', newUser);

        // save password here
    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" mb={3}>
                <Typography variant="h4" gutterBottom>
                    Profile
                </Typography>
            </Stack>

            <Box sx={{ display: 'flex', flex: 'row' }}>
                <Stack className={classes.avatarUpload}>
                    <div className={classes.avatarEdit}>
                        <label htmlFor="imageUpload" className={classes.imageUpload}>
                            <input
                                type="file"
                                id="imageUpload"
                                name="avatar"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleFileChange}
                                hidden
                            />
                            <PhotoCamera className={classes.cameraIcon} />
                        </label>
                    </div>
                    <div className={classes.avatarPreview}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7 }}
                            className={classes.imagePreview}
                            style={{ backgroundImage: `url(${preview || currentUser.avatar})` }}
                        >
                            <></>
                        </motion.div>
                    </div>
                </Stack>
                <Stack sx={{ marginLeft: 4 }}>
                    <Typography sx={{ fontSize: '2.5rem' }}>
                        {currentUser.username}#{currentUser.id}
                    </Typography>
                    <Typography sx={{ fontSize: '1.5rem' }}>{currentUser.email}</Typography>
                    <Typography sx={{ fontSize: '1rem' }}>Online</Typography>
                </Stack>
            </Box>

            <Stack spacing={3} mt={4} direction="row">
                <Box
                    sx={{
                        '& > :not(style)': { width: '30ch' },
                    }}
                    autoComplete="off"
                >
                    <TextField
                        name="username"
                        label={'Username'}
                        value={newUsername}
                        onChange={(e) => handleOnChangeUsername(e)}
                    />
                </Box>

                <Box
                    sx={{
                        '& > :not(style)': { width: '30ch' },
                    }}
                    autoComplete="off"
                >
                    <TextField name="email" label={'Email'} value={newEmail} onChange={(e) => handleOnChangeEmail(e)} />
                </Box>

                <Button color="inherit" variant="outlined" onClick={handleOpenPasswordModal}>
                    <Iconify icon="material-symbols:change-circle-outline" color="#1C9CEA" width={22} height={22} />
                    <Typography ml={1}>Change Your password</Typography>
                </Button>

                <Modal
                    open={passwordOpen}
                    onClose={handleClosePasswordModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Fade in={passwordOpen}>
                        <Stack sx={style} spacing={2}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Change Password
                            </Typography>
                            <Stack spacing={3}>
                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '50ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField name="old-password" label={'Old password'} />
                                </Box>
                                <Box
                                    sx={{
                                        '& > :not(style)': { width: '50ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField
                                        name="new-password"
                                        label={'New password'}
                                        helperText="New password must be at least 8 characters long"
                                    />
                                </Box>
                            </Stack>
                            <Divider sx={{ borderStyle: '3px dashed #000000', color: 'black' }} />
                            <Stack direction="row" justifyContent={'end'} spacing={1}>
                                <Button color="inherit" variant="outlined" onClick={() => setPasswordOpen(false)}>
                                    <Typography>Back</Typography>
                                </Button>
                                <Button color="inherit" variant="outlined" onClick={handleSaveChangePassword}>
                                    <Typography>Save</Typography>
                                </Button>
                            </Stack>
                        </Stack>
                    </Fade>
                </Modal>
            </Stack>

            <AnimatePresence>
                {showSaveBar && (
                    <motion.div
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 60, opacity: 0, transition: { type: 'spring', bounce: 0.5, duration: 0.7 } }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20, bounce: 0.7 }}
                        style={{
                            position: 'fixed',
                            bottom: 30,
                            width: '900px',
                            display: 'flex',
                            justifyContent: 'center',
                            zIndex: 9999,
                        }}
                    >
                        <Stack
                            sx={{ width: '650px', backgroundColor: '#000000', borderRadius: '5px' }}
                            justifyContent="space-between"
                            direction="row"
                            alignItems="center"
                            p={1}
                        >
                            <Typography ml={1} variant="subtitle2" color="white">
                                Careful-you have unsaved changes!
                            </Typography>
                            <Stack direction="row" justifyContent="end" spacing={1}>
                                <Button
                                    variant="text"
                                    sx={{ color: 'white', fontSize: '14px', fontWeight: 'normal' }}
                                    onClick={handleResetProfileInfo}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        color: 'white',
                                        fontSize: '14px',
                                        fontWeight: 'normal',
                                        backgroundColor: '#1b49b2',
                                    }}
                                    color="primary"
                                >
                                    Save Changes
                                </Button>
                            </Stack>
                        </Stack>
                    </motion.div>
                )}
            </AnimatePresence>
        </Container>
    );
}

export default ProfilePage;
