import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        return localStorage.getItem('token');
    };
    
    const [token, setToken] = useState(getToken());

    const saveToken = tkn => {
        localStorage.setItem('token', tkn);
        setToken(tkn);
    };

    return {
        setToken: saveToken,
        token
    }
}