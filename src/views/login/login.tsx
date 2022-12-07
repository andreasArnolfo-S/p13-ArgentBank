import { FC } from 'react';
import styles from './login.module.css';
import LoginForm from './../../components/loginForm/loginForm';

interface LoginProps {}

const Login: FC<LoginProps> = () => (
  <div className={styles.Login}>
    <main className={styles.main}>
      <section className={styles.sign_in_content}>
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <LoginForm />
      </section>
    </main>
  </div>
);

export default Login;
