import jwt from 'jsonwebtoken';

export const setAuthToken = (token) => {
    const expiredAt = new Date(Date.now() + 7200000).toString(); // 2 hours

    const encryptedToken = jwt.sign(
        {
            userId: 123,
            exp: expiredAt,
        },
        'secretkey',
    );

    document.cookie = `token=${encryptedToken};expires=${expiredAt};path=/`;
};

export const getAuthToken = () => document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

export const removeAuthToken = () => {
    document.cookie = 'token=';
};
