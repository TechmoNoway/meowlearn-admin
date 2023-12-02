import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AnimatePresence, motion } from 'framer-motion';
import Swal from 'sweetalert2';

// @mui
import { makeStyles } from '@mui/styles';
import { Alert, Box, Button, Container, Divider, Fade, Modal, Stack, TextField, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

// @component
import Iconify from '../components/iconify';
import { useUserContext } from '../context/UserContext';
import { sqlDate } from '../utils/formatDate';
import { getAllUsers, updateUserApi } from '../api/user';

const useStyles = makeStyles(() => ({
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
    const [newPasswordError, setNewPasswordError] = useState(null);

    const handleFetchUser = async () => {
        if (localStorage.getItem('token')) {
            const { data: userListResponse } = await getAllUsers();

            const result = userListResponse.data.find(
                (obj) => obj.username === jwtDecode(localStorage.getItem('token')).sub,
            );

            console.log(result);

            setCurrentUser(result);
            setNewUsername(result.username);
            setNewEmail(result.email);
        }
    };

    useEffect(() => {
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

    const handleSaveChangeProfile = async () => {
        const newUser = {
            id: currentUser.id,
            username: newUsername,
            email: newEmail,
            password: currentUser.password,
            avatar: currentUser.avatar,
            roleId: '2',
            createdAt: currentUser.createdAt,
            updatedAt: sqlDate(),
        };

        const { data: response } = await updateUserApi(newUser);

        if (response.data.token === null) {
            Swal.fire({
                title: 'Update Fail!',
                text: 'Something went wrong',
                icon: 'error',
            });
        } else {
            localStorage.removeItem('token');
            localStorage.setItem('token', response.data.token);
            handleFetchUser();
            setShowSaveBar(false);
        }
    };

    const handleResetProfileInfo = () => {
        setNewUsername(currentUser.username);
        setNewEmail(currentUser.email);
        setShowSaveBar(false);
        setPreview(null);
    };

    const handleSaveChangePassword = async () => {
        const newUser = {
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            password: newPassword,
            avatar: currentUser.avatar,
            roleId: '2',
            createdAt: currentUser.createdAt,
            updatedAt: sqlDate(),
            oldPassword,
        };

        if (newPassword === oldPassword) {
            setNewPasswordError('Your new password is same as the old password!');
        } else {
            const { data: response } = await updateUserApi(newUser);

            if (response.data.token === null) {
                Swal.fire({
                    title: 'Update Fail!',
                    text: 'Something went wrong',
                    icon: 'error',
                });
            } else {
                Swal.fire({
                    title: 'Update Success!',
                    text: 'Update Successfully!',
                    icon: 'success',
                });
                localStorage.removeItem('token');
                localStorage.setItem('token', response.data.token);
                handleFetchUser();
                setPasswordOpen(false);
            }
        }
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
                        onChange={handleOnChangeUsername}
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
            </Stack>

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
                            {newPasswordError && <Alert severity="error">{newPasswordError}</Alert>}

                            <Box
                                sx={{
                                    '& > :not(style)': { width: '50ch' },
                                }}
                                autoComplete="off"
                            >
                                <TextField
                                    type="password"
                                    name="current-password"
                                    label={'Current password'}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </Box>
                            <Box
                                sx={{
                                    '& > :not(style)': { width: '50ch' },
                                }}
                                autoComplete="off"
                            >
                                <TextField
                                    type="password"
                                    name="new-password"
                                    label={'New password'}
                                    helperText="New password must be at least 8 and not longer than 15 characters long"
                                    onChange={(e) => setNewPassword(e.target.value)}
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
                                    onClick={handleSaveChangeProfile}
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
