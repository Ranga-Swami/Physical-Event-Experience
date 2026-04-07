'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { VenueMap } from '@/components/VenueMap';
import { AssistantChat } from '@/components/AssistantChat';
import { MatchTimeline } from '@/components/MatchTimeline';
import { BroadcastBanner } from '@/components/BroadcastBanner';
import { PreOrderPanel } from '@/components/PreOrderPanel';
import { Clock, Users, Activity, Coffee, Navigation } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const [currentLocation] = useState('Section 104');
  
  return (
    <div className={styles.dashboard}>
      <MatchTimeline />
      <BroadcastBanner 
        type="promo" 
        message="FLASH SALE: 20% off all merchandise at the Team Store in Section 102 until the end of the quarter!" 
      />

      <div className={styles.grid}>
        <div className={styles.mainColumn}>
          {/* Live Metrics */}
          <div className={styles.metricsRow}>
            <Card variant="glass" className={styles.metricCard}>
              <div className={styles.metricLabel}>
                <Users size={16} /> Total Attendance
              </div>
              <div className={styles.metricValue}>68,432</div>
              <div className={styles.metricTrend}>98% Capacity</div>
            </Card>
            
            <Card variant="glass" className={styles.metricCard}>
              <div className={styles.metricLabel}>
                <Coffee size={16} /> Avg Concession Wait
              </div>
              <div className={styles.metricValue}>12m</div>
              <div className={styles.metricTrend}>Peaking now</div>
            </Card>

            <Card variant="glass" className={styles.metricCard}>
              <div className={styles.metricLabel}>
                <Activity size={16} /> Crowd Flow
              </div>
              <div className={styles.metricValue}>High</div>
              <div className={styles.metricTrend}>West exits congested</div>
            </Card>
          </div>

          {/* Interactive Map */}
          <div className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>Live Venue Map</h2>
            <Card variant="glass" style={{ padding: 0, overflow: 'hidden' }}>
              <VenueMap currentLocation={currentLocation} />
            </Card>
          </div>
        </div>

        <div className={styles.sideColumn}>
          {/* Smart Assistant */}
          <div className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>Ask Assistant</h2>
            <AssistantChat />
          </div>

          <PreOrderPanel />
        </div>
      </div>
    </div>
  );
}
