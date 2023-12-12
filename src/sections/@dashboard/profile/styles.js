import { makeStyles } from '@mui/styles';

export const useProfileStyles = makeStyles(() => ({
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

export const profileModalStyle = {
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
