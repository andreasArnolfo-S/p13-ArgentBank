import React, { FC } from 'react';
import styles from './footer.module.css';

interface FooterProps { }

const Footer: FC<FooterProps> = () => (
  <footer className={styles.footer}>
    <p className={styles.footer_text}>Copyright 2020 Argent Bank</p>
  </footer>
);

export default Footer;
