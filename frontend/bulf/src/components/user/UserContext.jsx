import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = Cookies.get('jwt');
        return token ? jwt_decode(token) : null;
    });

    const login = (token) => {
        Cookies.set('jwt', token);
        setUser(jwt_decode(token));
    };

    const logout = () => {
        Cookies.remove('jwt');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useUser = () => {
    return useContext(UserContext);
};
