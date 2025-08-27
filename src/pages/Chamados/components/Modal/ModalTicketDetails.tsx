import React from 'react';
import { Modal } from 'light-portal-components';
import styles from './ModalTicketDetails.module.scss';

// Definindo os tipos para os dados dos tickets
export interface TicketData {
  id: string;
  title: string;
  status: ('waiting' | 'in-progress' | 'delayed' | 'pending-client' | 'critical')[];
  lastUpdate: string;
  description?: string;
}

interface ModalTicketDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketData | null;
}

// Função para obter o texto do status em português
const getStatusText = (statusType: string) => {
  switch (statusType) {
    case 'waiting':
      return 'Aguardando';
    case 'in-progress':
      return 'Em tratamento';
    case 'delayed':
      return 'Em atraso';
    case 'pending-client':
      return 'Pendente cliente';
    case 'critical':
      return 'Crítico';
    default:
      return 'Desconhecido';
  }
};

const ModalTicketDetails: React.FC<ModalTicketDetailsProps> = ({
  isOpen,
  onClose,
  ticket
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={ticket ? `Chamado ${ticket.id}` : "Detalhes do Ticket"}
    >
      {ticket ? (
        <div className={styles['modal-content']}>
          <div className={styles['modal-field']}>
            <strong>ID:</strong> {ticket.id}
          </div>
          <div className={styles['modal-field']}>
            <strong>Título:</strong> {ticket.title}
          </div>
          <div className={styles['modal-field']}>
            <strong>Status:</strong>
            <div className={styles['modal-status-list']}>
              {ticket.status.map((statusType, index) => (
                <span
                  key={index}
                  className={`${styles['modal-status']} ${styles[`modal-status--${statusType}`]}`}
                >
                  {getStatusText(statusType)}
                </span>
              ))}
            </div>
          </div>
          <div className={styles['modal-field']}>
            <strong>Última Atualização:</strong> {ticket.lastUpdate}
          </div>
          {ticket.description && (
            <div className={styles['modal-field']}>
              <strong>Descrição:</strong> 
              <p>{ticket.description}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Nenhum ticket selecionado</p>
      )}
    </Modal>
  );
};

export default ModalTicketDetails;
