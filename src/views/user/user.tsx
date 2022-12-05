import React, { FC } from 'react';
import styles from './user.module.css';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router';
import Login from './../login/login';

interface UserProps { }

const User: FC<UserProps> = () => {
  const status = useSelector((state: any) => state.user.status);

  return (
    status === 'success' ?
    <div className={styles.User}>
      User Component
    </div> : (<Routes><Route path='/*' element={<Login />} /></Routes>)
  );
}

export default User;
