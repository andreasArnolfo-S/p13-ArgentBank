import styles from './loginForm.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser, rememberMe, getToken } from './../../store/slice';
import UseSelector from '../../store/selector';

const LoginForm = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const status = UseSelector();
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    setCheck(!check);
  }

  useEffect(() => {
    if (status.status === 'success') {
      navigate('/user');
    }
    if (status.status === 'failed') {
      navigate('/login');
    }
    if (status.status === 'loading') {
        <div>
          <h1>Loading...</h1>
        </div>
    }
    if (getToken() !== null) {
      navigate('/user');
    }
  }, [status.status, navigate]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (check === true) {
      rememberMe(status.token);
    }
    dispatch(loginUser(user))
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
        <input type="checkbox" id="remember-me" onClick={handleCheck}/>
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button onClick={handleSubmit} className={styles.sign_in_button}>Sign In</button>
    </form>
  );
}

export default LoginForm;
