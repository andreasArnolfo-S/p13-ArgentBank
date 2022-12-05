import React, { FC } from 'react';
import styles from './home.module.css';
import Hero from './../../components/hero/hero';
import { Item } from './../../components/item/item';
import iconSecurity from '../../img/icon-security.png';
import iconChat from '../../img/icon-chat.png';
import iconMoney from '../../img/icon-money.png';

interface HomeProps {}

const Home: FC<HomeProps> = () => {

  return (
  <div className={styles.Home}>
    <Hero />
    <div className={styles.items}>
      <Item title='You are our #1 priority' description='Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.' img={iconChat}/>
      <Item title='More savings means higher rates' description='The more you save with us, the higher your interest rate will be!' img={iconMoney}/>
      <Item title='Security you can trust' description='We use top of the line encryption to make sure your data and money is always safe.' img={iconSecurity}/>
    </div>
  </div>
);}

export default Home;
