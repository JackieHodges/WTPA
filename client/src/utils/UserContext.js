import {createContext} from 'react';

export const UserContext = createContext({
    id: "",
    user_name: "",
    email: "",
    auth_o_id: ""
});