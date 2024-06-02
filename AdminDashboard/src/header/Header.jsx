import React, { useState, useEffect } from 'react'
import { MdOutlineSpeed, MdHistory, MdQuestionMark, MdTrain, MdLocationOn, MdSearch, MdFormatAlignJustify, MdOutlineNotificationsActive, MdPerson } from 'react-icons/md'
import axios from 'axios';
import styles from './Header.module.css'; // Import CSS module

function Header({ toggleSidebar }) {
  const [hasNotification, setHasNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    //simulasi pengecekan data yang melebihi batas yang ditentukan
    const checkData = async () => {
      try {
        const response = await axios.get('http://localhost:5001');
        if (response.data.dataLimitExceeded) {
          setHasNotification(true);
          setNotificationMessage('Data melebihi batas yang diizinkan!');
        } else {
          setHasNotification(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setHasNotification(false);
      }
    };

    checkData();
  }, []);

  const handleNotificationClick = () => {
    setShowMessage(!showMessage);
  };

  return (
    <header className={styles.header}>
      <div className={styles.menuIcon}>
        <MdFormatAlignJustify className={styles.icon} onClick={toggleSidebar} />
      </div>
      <div className={styles.headerRight}>
        <div className={styles.notificationIcon} onClick={handleNotificationClick}>
          <MdOutlineNotificationsActive className={styles.icon} />
          {hasNotification && <span className={styles.notificationDot}></span>}
        </div>
        <MdPerson className={styles.icon} />
      </div>
      {showMessage && hasNotification && (
        <div className={styles.notificationMessage}>
          {notificationMessage}
        </div>
      )}
    </header>
  )
}

export default Header

