import React from 'react';
import { Timer, Trophy } from 'lucide-react';
import styles from './MatchTimeline.module.css';

export const MatchTimeline: React.FC = () => {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.scoreBoard}>
        <div className={styles.team}>
          <span className={styles.teamName}>HOME</span>
          <span className={styles.score}>14</span>
        </div>
        
        <div className={styles.matchStatus}>
          <div className={styles.period}>Q2</div>
          <div className={styles.timer}>
            <Timer size={16} className={styles.timerIcon} />
            <span>12:45</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} style={{ width: '40%' }}></div>
          </div>
        </div>

        <div className={styles.team}>
          <span className={styles.score}>10</span>
          <span className={styles.teamName}>AWAY</span>
        </div>
      </div>
    </div>
  );
};
