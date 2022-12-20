import styles from './loginForm.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getToken, loginUser, logoutUser } from './../../store/slice';

const LoginForm = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const mytoken = getToken();

  console.log('mytoken', mytoken);
  
  useEffect(() => {
    if (mytoken !== null) {
      navigate('/user');
    } else {
      dispatch(logoutUser());
    }
  }, [dispatch, navigate]);

  const [user, setUser] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser(user))
    getToken()
    navigate('/user');
  };
  return (
    <form>
      <div className={styles.input_wrapper}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" onChange={(e)=> setUser({...user, email: e.target.value})} required/>
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={(e)=> setUser({...user, password: e.target.value})} required/>
      </div>
      <div className={styles.input_remember}>
        <input type="checkbox" id="remember-me" onChange={(e)=> setUser({...user, remember: e.target.checked})}/>
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button onClick={handleSubmit} className={styles.sign_in_button}>Sign In</button>
    </form>
  );
}

export default LoginForm;
