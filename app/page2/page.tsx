"use client"
import dynamic from 'next/dynamic';
import styles from '../styles/dataupload.module.css';

const DynamicFileInput = dynamic(() => import('../project/dataupload'), { ssr: false });

const Dataupload : React.FC = () => {
  
  return (
    <div className={styles.main}>
   <h1>UPLOAD EXCEL FILES</h1>

      <DynamicFileInput />
    </div>
  );
};

export default Dataupload ;
