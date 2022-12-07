import { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser, profileUser } from '../../store/slice';
import UseSelector from '../../store/selector';


const Navbar = () => {
  const user = UseSelector();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();


  console.log(user.token);
  
  
  useEffect(() => {
    if (user.status === 'success') {
      dispatch(profileUser(user.token));
    } 
  }, [dispatch, user.status, user.token]);

  const logout = () => {
    dispatch(logoutUser())
    navigate('/login');
  }

  return (
    <nav className={styles.main_nav}>
      <a className={styles.main_nav_logo} href="./index.html">
        <img
          className={styles.main_nav_logo_img}
          src="https://user.oc-static.com/upload/2020/08/14/1597410191519_image2.png"
          alt="Argent Bank Logo"
        />
        <h1 className={styles.sr_only}>Argent Bank</h1>
      </a>
      <div>
        {
          user.status === 'success' ?
            <div className={styles.profile}>
              <p>{user.user.firstName} {user.user.lastName}</p>
              <NavLink to="/" onClick={logout}>Logout</NavLink>
            </div>
            :
            <NavLink className={styles.main_nav_item} to="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
        }
      </div>
    </nav>
  );
}

export default Navbar;
