
import { useSelector } from 'react-redux';

export const GetStatus = () => {
     const status = useSelector((state: any) => state.user.status);
     return status;
}

export const GetToken = () => {
     const token = useSelector((state: any) => state.user.token);
     return token;
}

export const GetUser = () => {
     const user = useSelector((state: any) => state.user.user);
     return user;
}

export const GetConnected = () => {
     const connected = useSelector((state: any) => state.user.connected);
     return connected;
}