import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';

// components
import { useUserContext } from '../../../context/UserContext';

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//     {
//         label: 'Home',
//         icon: 'eva:home-fill',
//         to: '/dashboard/app',
//     },
//     {
//         label: 'Profile',
//         icon: 'eva:person-fill',
//         to: '/dashboard/profile',
//     },
//     {
//         label: 'Settings',
//         icon: 'eva:settings-2-fill',
//         to: '/dashboard/settings',
//     },
// ];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const { user, setUser } = useUserContext();

    const [currentUser, setCurrentUser] = useState({});

    const navigate = useNavigate();

    const [open, setOpen] = useState(null);

    useEffect(() => {
        const handleFetchUser = async () => {
            if (localStorage.getItem('token')) {
                const { data: userListResponse } = await axios.get(`http://localhost:8870/api/user/getallusers`);

                // const { data: userListResponse } = await axios.get(
                //     `https://user-backend-meolearn.onrender.com/api/user/getallusers`,
                // );

                const result = userListResponse.data.find(
                    (obj) => obj.username === jwtDecode(localStorage.getItem('token')).sub,
                );

                setCurrentUser(result);
            }
        };

        handleFetchUser();
    }, []);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleNavigatePage = (href) => {
        navigate(href);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const handleNavigateHome = () => {
        setOpen(false);
        navigate('/dashboard/app');
    };

    const handleNavigateProfile = () => {
        setOpen(false);
        navigate('/dashboard/profile');
    };

    const handleNavigateSettings = () => {
        setOpen(false);
        navigate('/dashboard/settings');
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    p: 0,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <Avatar src={currentUser.avatar} alt="photoURL" />
                {/* <Avatar src={account.photoURL} alt="photoURL" /> */}
            </IconButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        maxWidth: 250,
                        '& .MuiMenuItem-root': {
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        {currentUser.username}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {currentUser.email}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                {/* <Stack sx={{ p: 1 }}>
                    {MENU_OPTIONS.map((option) => (
                        <MenuItem key={option.label} onClick={handleClose}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack> */}

                <Stack sx={{ p: 1 }}>
                    <MenuItem onClick={handleNavigateHome}>Home</MenuItem>
                    <MenuItem onClick={handleNavigateProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleNavigateSettings}>Settings</MenuItem>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
                    Logout
                </MenuItem>
            </Popover>
        </>
    );
}
