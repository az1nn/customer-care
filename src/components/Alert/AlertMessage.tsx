import { Alert, Text } from 'mondrian-react';
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import styles from './AlertMessage.module.scss';

interface AlertMessageProps {
  message: string;
  type: 'success' | 'error';
  duration?: number;
  onClose?: () => void;
  isVisible?: boolean;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
  isVisible = false,
}) => {
  const [visibility, setVisibility] = useState<'hidden' | 'showing' | 'hiding'>(
    isVisible ? 'showing' : 'hidden'
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCurrentTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const hideAlert = () => {
    setVisibility('hiding');

    setTimeout(() => {
      setVisibility('hidden');
      if (onClose) onClose();
    }, 500);
  };

  useEffect(() => {
    if (isVisible && visibility !== 'showing') {
      setVisibility('showing');
      clearCurrentTimer();

      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          hideAlert();
        }, duration);
      }
    } else if (!isVisible && visibility === 'showing') {
      hideAlert();
    }

    return () => clearCurrentTimer();
  }, [isVisible, duration]);

  if (!message || (visibility === 'hidden' && !isVisible)) return null;

  let visibilityClass = '';
  if (visibility === 'showing') visibilityClass = styles.show;
  else if (visibility === 'hiding') visibilityClass = styles.hide;

  return (
    <div className={`${styles.alertContainer} ${visibilityClass}`}>
      {type === 'error' ? (
        <Alert error light>
          <Text icon="checkbox-circulo" sm>
            {message}
          </Text>
        </Alert>
      ) : (
        <Alert success light>
          <Text icon="checkbox-circulo" sm>
            {message}
          </Text>
        </Alert>
      )}
    </div>
  );
};

export default AlertMessage;
