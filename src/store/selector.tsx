
import { useSelector } from 'react-redux';

const UseSelector = () => {
     const user = useSelector((state: any) => state.user);
     return user;
};

export default UseSelector;