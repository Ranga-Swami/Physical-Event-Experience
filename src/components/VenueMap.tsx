import React, { useState } from 'react';
import { MapPin, Users, Navigation } from 'lucide-react';
import styles from './VenueMap.module.css';

interface VenueMapProps {
  currentLocation: string;
}

export const VenueMap: React.FC<VenueMapProps> = ({ currentLocation }) => {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showRestroomPath, setShowRestroomPath] = useState(false);

  return (
    <div className={styles.mapContainer}>
      <div className={`${styles.mapOverlay} ${showHeatmap ? styles.heatmapActive : ''}`}>
        {/* Mock Stadium Graphic */}
        <div className={styles.stadium}>
          <div className={styles.pitch}></div>
          <div className={`${styles.section} ${styles.topSection}`}>North Stand</div>
          <div className={`${styles.section} ${styles.bottomSection}`}>South Stand</div>
          <div className={`${styles.section} ${styles.leftSection}`}>West Stand</div>
          <div className={`${styles.section} ${styles.rightSection}`}>East Stand</div>
          
          {/* Active User Pin */}
          <div className={`${styles.pin} ${styles.userPin}`}>
            <MapPin size={24} />
            <span className={styles.pinLabel}>You ({currentLocation})</span>
          </div>

          {/* Points of Interest with mock heatmap data */}
          <div className={`${styles.pin} ${styles.poiPin} ${showHeatmap ? styles.heatmapHot : ''}`} style={{ top: '20%', left: '15%' }}>
            <Users size={16} />
            <div className={styles.waitBadge}>12m Wait</div>
          </div>
          <div className={`${styles.pin} ${styles.poiPin} ${styles.clearPoi} ${showRestroomPath ? styles.highlightedRestroom : ''}`} style={{ top: '80%', left: '85%' }}>
            <Navigation size={16} />
            <div className={`${styles.waitBadge} ${styles.clearBadge}`}>2m Wait</div>
          </div>
        </div>
      </div>
      <div className={styles.mapControls}>
        <button 
          className={`${styles.controlBtn} ${showHeatmap ? styles.activeBtn : ''}`}
          onClick={() => setShowHeatmap(!showHeatmap)}
        >
          Overlay Heatmap
        </button>
        <button 
          className={`${styles.controlBtn} ${showRestroomPath ? styles.activeBtn : ''}`}
          onClick={() => setShowRestroomPath(!showRestroomPath)}
        >
          Find Restroom
        </button>
      </div>
    </div>
  );
};
