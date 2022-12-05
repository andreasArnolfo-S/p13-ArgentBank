import React, { FC } from 'react';
import styles from './hero.module.css';

interface HeroProps {}

const Hero: FC<HeroProps> = () => (
  <div className={styles.Hero}>
    <section className={styles.hero_section}>
        <h2> Promoted Content </h2>
        <p className={styles.subtitle}> No fees. </p>
        <p className={styles.subtitle}> No minimum deposit. </p>
        <p className={styles.subtitle}> High interest rates. </p>
        <p> Open a savings account with Argent Bank today ! </p>
      </section>
  </div>
);

export default Hero;
