import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import Footer from '../Footer/Footer';
import Link from 'next/link';

const HomePage = () => {
  
  return (
    <div className={styles.background}>
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
        <Image
            src="/stars.jpg"
            alt="Stars"
            layout="fill"
            objectFit="cover"
        />
        </div>
      </div>
      
      <div className={styles.main}>
        <div className={styles.intro}>
          <h1>Contact</h1>
          <h2 className={styles.text}>@rsu.ac.th</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, incidunt pariatur consequuntur doloribus temporibus architecto facere esse quisquam quo voluptates!
          </p>
        </div>

        <div className={styles.subscribe}>
          <div className={styles.subscribetext}>
            <h3>SINCE</h3>
            <p>1990</p>
          </div>

          <div className={styles.subscribeform}>
            <input type="email" placeholder="Enter your email here" /> 
            <button type="submit" className={styles.button29}>Subscribe</button>
            <button className={styles.button29}>
              <Link href="/welcome">HomePage</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default HomePage;
