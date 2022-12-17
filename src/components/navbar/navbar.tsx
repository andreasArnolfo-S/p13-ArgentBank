import { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser, profileUser } from '../../store/slice';
import UseSelector from '../../store/selector';
import { BiLogOut, BiUserCircle } from 'react-icons/bi';

const Navbar = () => {
  const user = UseSelector();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();


  useEffect(() => {
    if (user.connected === true) {
      dispatch(profileUser(user.token));
    }

  }, [dispatch, user.connected, user.token]);

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
          user.connected === true ?
            <div className={styles.profile}>
              <BiUserCircle className={styles.Ucircle} />
              <p> {user.user.firstName} {user.user.lastName}</p>
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
