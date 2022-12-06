import React, { FC, useState, useEffect } from 'react';
import styles from './user.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router';
import Login from './../login/login';
import { updateUser } from './../../store/slice';

interface UserProps { }

const User: FC<UserProps> = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch<any>();
  const [isShowing, setIsShowing] = useState(false);

  const openModalHandler = () => {
    setIsShowing(true);
  };
  const closeModalHandler = () => {
    setIsShowing(false);
  };

  useEffect(() => {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = isShowing ? 'block' : 'none';
    }
  }, [isShowing]);

  const handleInput = (e: any) => {
    e.preventDefault();
    const firstName = e.target.parentElement.firstName.value;
    const lastName = e.target.parentElement.lastName.value;
    console.log(firstName, lastName);
    dispatch(updateUser({ firstName, lastName }));
    closeModalHandler();
  };

  const mockData = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      amountDescription: 'Available Balance'
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      amountDescription: 'Available Balance'
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      amountDescription: 'Current Balance'
    }
  ]


  return (
    user.status === 'success' ?
      <div className={styles.User}>
        <div className={styles.header}>
          <h1>Welcome back<br />{user.user.firstName} {user.user.lastName}</h1>
          <button className={styles.edit_button} onClick={openModalHandler}>Edit Name</button>
          <div id="modal" className={styles.modal}>
            <div className={styles.modal_content}>
              <span className={styles.close} onClick={closeModalHandler}>&times;</span>
              <p>Edit name</p>
              <form className={styles.edit}>
                <label htmlFor="firstName">First name :</label>
                <input type="text" id="firstName" name="firstName" placeholder="First name" />
                <label htmlFor="lastName">Last name :</label>
                <input type="text" id="lastName" name="lastName" placeholder="Last name" />
                <button className={styles.save_button} onClick={handleInput}>Save</button>
              </form>
            </div>
          </div>
        </div>
        <h2 className={styles.sr_only}>Accounts</h2>
        {mockData.map((data, index) => (
          <section className={styles.account}>
            <div className={styles.account_content_wrapper}>
              <h3 className={styles.account_title}>{data.title}</h3>
              <p className={styles.account_amount}>{data.amount}</p>
              <p className={styles.account_amount_description}>{data.amountDescription}</p>
            </div>
            <div className={styles.cta}>
              <button className={styles.transaction_button}>View transactions</button>
            </div>
          </section>))}
      </div> :
      (<Routes><Route path='/*' element={<Login />} /></Routes>)
  );
}

export default User;
