// Exemplo de uso do componente TableTickets
import React from 'react';
import TableTickets, { TicketData } from './TableTickets';

const TableTicketsExample: React.FC = () => {
  // Dados de exemplo baseados na imagem fornecida
  const exampleTickets: TicketData[] = [
    {
      id: '01',
      ticket: '5283164',
      site: 'Lorem Ipsum',
      uf: 'PB',
      tipo: 'Falha',
      sintoma: 'Internet Indisponível',
      abertura: '15/08/2024\n10:22:05',
      posicionamento: '22/08/2024\n10:28:06',
      status: 'pendente-cliente'
    },
    {
      id: '02',
      ticket: '5283164',
      site: 'Lorem Ipsum',
      uf: 'MG',
      tipo: 'Falha',
      sintoma: 'Instabilidade na rede',
      abertura: '15/08/2024\n10:22:05',
      posicionamento: '22/08/2024\n10:28:06',
      status: 'em-tratamento'
    },
    {
      id: '03',
      ticket: '5283164',
      site: 'Lorem Ipsum',
      uf: 'PI',
      tipo: 'Falha',
      sintoma: 'Internet Indisponível',
      abertura: '15/08/2024\n10:22:05',
      posicionamento: '22/08/2024\n10:28:06',
      status: 'em-tratamento'
    },
    {
      id: '04',
      ticket: '5283164',
      site: 'Lorem Ipsum',
      uf: 'SE',
      tipo: 'Falha',
      sintoma: 'Internet Indisponível',
      abertura: '15/08/2024\n10:22:05',
      posicionamento: '22/08/2024\n10:28:06',
      status: 'concluido'
    },
    {
      id: '05',
      ticket: '5283164',
      site: 'Lorem Ipsum',
      uf: 'SE',
      tipo: 'Falha',
      sintoma: 'Internet Indisponível',
      abertura: '15/08/2024\n10:22:05',
      posicionamento: '22/08/2024\n10:28:06',
      status: 'em-tratamento'
    },
    {
      id: '06',
      ticket: '5283164',
      site: 'Lorem Ipsum',
      uf: 'PI',
      tipo: 'Falha',
      sintoma: 'Internet Indisponível',
      abertura: '15/08/2024\n10:22:05',
      posicionamento: '22/08/2024\n10:28:06',
      status: 'concluido'
    },
    {
      id: '07',
      ticket: '5283164',
      site: 'Lorem Ipsum',
      uf: 'MG',
      tipo: 'Falha',
      sintoma: 'Internet Indisponível',
      abertura: '15/08/2024\n10:22:05',
      posicionamento: '22/08/2024\n10:28:06',
      status: 'pendente-cliente'
    }
  ];

  const handleNewTicket = () => {
    console.log('Criar novo chamado');
    // Implementar navegação para criação de novo chamado
  };

  const handleFilterOrganize = () => {
    console.log('Filtrar e organizar chamados');
    // Implementar modal ou dropdown de filtros
  };

  const handleSearch = (searchTerm: string) => {
    console.log('Buscar por:', searchTerm);
    // Implementar lógica de busca
  };

  return (
    <div>
      <TableTickets
        tickets={exampleTickets}
        isLoading={false}
        onNewTicket={handleNewTicket}
        onFilterOrganize={handleFilterOrganize}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default TableTicketsExample;
