import { useCallback, useState } from 'react';

type AlertType = 'success' | 'error';

interface AlertState {
  message: string | null;
  type: AlertType;
  isVisible: boolean;
}

interface UseAlertReturn {
  alertState: AlertState;
  showSuccessAlert: (message: string) => void;
  showErrorAlert: (message: string) => void;
  clearAlert: () => void;
}

const useAlert = (): UseAlertReturn => {
  const [alertState, setAlertState] = useState<AlertState>({
    message: null,
    type: 'success',
    isVisible: false,
  });

  const showAlert = useCallback((message: string, type: AlertType) => {
    setAlertState({
      message,
      type,
      isVisible: true,
    });
  }, []);

  const showSuccessAlert = useCallback(
    (message: string) => {
      showAlert(message, 'success');
    },
    [showAlert]
  );

  const showErrorAlert = useCallback(
    (message: string) => {
      showAlert(message, 'error');
    },
    [showAlert]
  );

  const clearAlert = useCallback(() => {
    setAlertState((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  return {
    alertState,
    showSuccessAlert,
    showErrorAlert,
    clearAlert,
  };
};

export default useAlert;
