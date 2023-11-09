import { useContext, useState, createContext } from 'react';
import { updateUserApi } from '../api/user';

const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMesage] = useState('');

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const updateUser = async (oldPassword) => {
        const userInput = {
            username: user.username,
            password: user.password,
            email: user.email,
            avatar: user.avatar,
            id: user.id,
            roleId: user.roleId,
            oldPassword,
        };
        const { data } = await updateUserApi(userInput);
        if (data.data.token) {
            localStorage.setItem('token', JSON.stringify(data.data.token));
        } else {
            setErrorMesage(data.data.message);
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                errorMessage,
                setUser,
                logout,
                updateUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
