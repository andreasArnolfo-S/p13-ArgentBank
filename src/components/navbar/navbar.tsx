import { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, profileUser } from '../../store/slice';
import { BiLogOut, BiUserCircle } from 'react-icons/bi';
import { IwantToGet } from '../../store/selectors';

const Navbar = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const select = useSelector(IwantToGet(['user', 'token', 'connected']))

  const user = select[0].user;
  const token = select[1].token;
  const connected = select[2].connected;

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
