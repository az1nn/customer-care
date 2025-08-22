import { Text } from 'mondrian-react';
import React from 'react';
import styles from './ErrorScreen.module.scss';

const ErrorScreen: React.FC<{ message?: string }> = ({ message }) => (
  <span className={styles.ErrorScreen}>
    <Text xl bold inverse>
      Ops! Algo deu errado.
    </Text>
    <Text xl inverse>
      {message || 'O conteúdo não está disponível no momento.'}
    </Text>
  </span>
);

export default ErrorScreen;
