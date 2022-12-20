import { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser, profileUser } from '../../store/slice';
import { BiLogOut, BiUserCircle } from 'react-icons/bi';
import { GetConnected, GetToken, GetUser } from '../../store/selectors';

const Navbar = () => {
  const user = GetUser();
  const token = GetToken();
  const connected = GetConnected();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();


  useEffect(() => {
    if (connected === true) {
      dispatch(profileUser(token));
    }
  }, [dispatch, connected, token]);

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
          connected ?
            <div className={styles.profile}>
              <BiUserCircle className={styles.Ucircle} />
              <p> {user.firstName} {user.lastName}</p>
              <BiLogOut className={styles.logout} />
              <NavLink to="/" onClick={logout}>Logout</NavLink>
            </div>
            :
            <NavLink className={styles.main_nav_item} to="/login">
              Sign In
            </NavLink>
        }
      </div>
    </nav>
  );
}

export default Navbar;
