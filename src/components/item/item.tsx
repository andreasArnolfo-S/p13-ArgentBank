import React, { FC } from 'react';
import styles from './item.module.css';

interface ItemProps {
  title: string;
  description: string;
  img: string;
}

export const Item: FC<ItemProps> = (props) => (
  <div className={styles.Item}>
    <img src={props.img} alt='item' />
    <h3>{props.title}</h3>
    <p>{props.description}</p>
  </div>
);

export default Item;
