import React from 'react';
import { AlertCircle, Megaphone } from 'lucide-react';
import styles from './BroadcastBanner.module.css';

interface BroadcastBannerProps {
  type?: 'alert' | 'promo';
  message: string;
}

export const BroadcastBanner: React.FC<BroadcastBannerProps> = ({ type = 'alert', message }) => {
  return (
    <div className={`${styles.bannerContainer} ${type === 'alert' ? styles.alert : styles.promo}`}>
      <div className={styles.iconContainer}>
        {type === 'alert' ? <AlertCircle size={20} /> : <Megaphone size={20} />}
      </div>
      <div className={styles.marquee}>
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  );
};
