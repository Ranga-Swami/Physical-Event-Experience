import React, { useState } from 'react';
import { ShoppingBag, CheckCircle, Clock } from 'lucide-react';
import styles from './PreOrderPanel.module.css';

export const PreOrderPanel: React.FC = () => {
  const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'ready'>('idle');

  const handleOrder = () => {
    setOrderStatus('processing');
    // Mock processing delay
    setTimeout(() => {
      setOrderStatus('ready');
    }, 2000);
  };

  return (
    <div className={styles.panelContainer}>
      <div className={styles.header}>
        <ShoppingBag size={20} className={styles.headerIcon} />
        <h3 className={styles.title}>Express Concessions</h3>
      </div>
      
      {orderStatus === 'idle' && (
        <div className={styles.orderForm}>
          <p className={styles.description}>Skip the line! Order now and pick up at the Express Lane in Section 105.</p>
          <div className={styles.menuItems}>
            <div className={styles.item}>
              <span>2x Stadium Hot Dog</span>
              <span className={styles.price}>$14.00</span>
            </div>
            <div className={styles.item}>
              <span>1x Large Soda</span>
              <span className={styles.price}>$6.50</span>
            </div>
          </div>
          <button className={styles.orderBtn} onClick={handleOrder}>
            Place Order ($20.50)
          </button>
        </div>
      )}

      {orderStatus === 'processing' && (
        <div className={styles.statusProcessing}>
          <Clock size={32} className={styles.spinIcon} />
          <p>Processing your payment...</p>
        </div>
      )}

      {orderStatus === 'ready' && (
        <div className={styles.statusReady}>
          <CheckCircle size={48} className={styles.successIcon} />
          <h4>Order Confirmed!</h4>
          <p>Your order #8842 is being prepared. Head to Section 105 Express Lane.</p>
          <div className={styles.qrMock}></div>
        </div>
      )}
    </div>
  );
};
