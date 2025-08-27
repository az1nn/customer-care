import React, { useState } from 'react';
import { Button, Text } from 'light-portal-components';
import TableComponent from '@/components/TableComponent/TableComponent';
import { Column, DataRow } from '@/components/TableComponent/types/ITable';
import styles from './TableTickets.module.scss';

// Interface para os dados do ticket
export interface TicketData {
  id: string;
  ticket: string;
  site: string;
  uf: string;
  tipo: string;
  sintoma: string;
  abertura: string;
  posicionamento: string;
  status: 'pendente-cliente' | 'em-tratamento' | 'concluido';
}

// Props do componente TableTickets
interface TableTicketsProps {
  tickets: TicketData[];
  isLoading?: boolean;
  onNewTicket?: () => void;
  onFilterOrganize?: () => void;
  onSearch?: (searchTerm: string) => void;
}

const TableTickets: React.FC<TableTicketsProps> = ({
  tickets,
  isLoading = false,
  onNewTicket,
  onFilterOrganize,
  onSearch
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Configuração das colunas da tabela
  const columns: Column[] = [
    { label: '#', value: 'id' },
    { label: 'Ticket', value: 'ticket' },
    { label: 'Site', value: 'site' },
    { label: 'UF', value: 'uf' },
    { label: 'Tipo', value: 'tipo' },
    { label: 'Sintoma', value: 'sintoma' },
    { label: 'Abertura', value: 'abertura' },
    { label: 'Posicionamento', value: 'posicionamento' },
    { label: 'Status', value: 'statusFormatted' }
  ];

  // Função para formatar o status do ticket
  const getStatusDisplay = (status: TicketData['status']) => {
    switch (status) {
      case 'pendente-cliente':
        return 'Pendente cliente';
      case 'em-tratamento':
        return 'Em tratamento';
      case 'concluido':
        return 'Concluído';
      default:
        return status;
    }
  };

  // Função para obter a classe CSS do status
  const getStatusClass = (status: TicketData['status']) => {
    switch (status) {
      case 'pendente-cliente':
        return styles['status-pending'];
      case 'em-tratamento':
        return styles['status-in-progress'];
      case 'concluido':
        return styles['status-completed'];
      default:
        return '';
    }
  };

  // Transformar os dados dos tickets para o formato esperado pela TableComponent
  const tableData: DataRow[] = tickets
    .filter(ticket => 
      searchTerm === '' || 
      Object.values(ticket).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .map(ticket => ({
      ...ticket,
      statusFormatted: getStatusDisplay(ticket.status),
      statusClass: getStatusClass(ticket.status)
    }));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div className={styles['table-tickets']}>
      {/* Header da tabela */}
      <div className={styles['table-tickets__header']}>
        <div className={styles['table-tickets__title-section']}>
          <Text body lg className={styles['table-tickets__title']}>
            Tickets abertos
          </Text>
        </div>
        
        <div className={styles['table-tickets__actions']}>
          <Button
            permissionId="new-ticket"
            onClick={onNewTicket}
            className={styles['table-tickets__new-button']}
          >
            <span className="mdn-Icon-adicionar mdn-Icon--sm" aria-label="adicionar"></span>
            Novo Chamado
          </Button>
          
          <Button
            permissionId="filter-tickets"
            onClick={onFilterOrganize}
            className={styles['table-tickets__filter-button']}
          >
            <span className="mdn-Icon-filtrar mdn-Icon--sm" aria-label="filtrar"></span>
            Filtrar e Organizar
          </Button>
          
          <div className={styles['table-tickets__search']}>
            <div className={styles['table-tickets__search-input-wrapper']}>
              <span className="mdn-Icon-buscar mdn-Icon--sm" aria-label="buscar"></span>
              <input
                type="text"
                placeholder="Buscar chamados"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles['table-tickets__search-input']}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de tickets */}
      <div className={styles['table-tickets__content']}>
        <TableComponent
          data={tableData}
          columns={columns}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default TableTickets;
