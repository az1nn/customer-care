import { Button } from "light-portal-components";
import React, { useState } from "react";
import styles from "./Chamados.module.scss";
import Carousel, { TicketData } from "@/pages/Chamados/components/Carousel";
import Table from "@/pages/Chamados/components/Table/TableTicketsExample";
import { IFormData } from "@/models/IFormData";

const Chamados: React.FC = () => {

  // Estado para o formulário
  const [formData, setFormData] = useState<IFormData>({
    text_field_1: '',
    text_field_2: '',
    search: ''
  });

  // Dados de exemplo para os tickets do carousel (baseados na imagem)
  const ticketsData: TicketData[] = [
    {
      id: '5283164',
      title: 'Internet Indisponível',
      status: ['waiting', 'in-progress'],
      lastUpdate: '26/fev - 12:42'
    },
    {
      id: '5283164',
      title: 'Instabilidade na rede',
      status: ['in-progress'],
      lastUpdate: '26/fev - 12:42'
    },
    {
      id: '5283164',
      title: 'Erro de fatura',
      status: ['delayed'],
      lastUpdate: '26/fev - 12:42'
    },
    {
      id: '5283165',
      title: 'Configuração de equipamento',
      status: ['pending-client'],
      lastUpdate: '26/fev - 11:30'
    },
    {
      id: '5283166',
      title: 'Falha crítica no sistema',
      status: ['critical'],
      lastUpdate: '26/fev - 10:15'
    },
    {
      id: '5283167',
      title: 'Solicitação de upgrade',
      status: ['in-progress'],
      lastUpdate: '25/fev - 16:20'
    },
    {
      id: '5283168',
      title: 'Manutenção preventiva',
      status: ['waiting'],
      lastUpdate: '25/fev - 14:30'
    },
    {
      id: '5283169',
      title: 'Mudança de endereço',
      status: ['pending-client'],
      lastUpdate: '24/fev - 09:15'
    }
  ];

  const handleNewTicket = () => {
    console.log('Abrir novo chamado');
    // Aqui seria implementada a navegação para a página de criação de chamados
  };

  const handleViewAllTickets = () => {
    console.log('Ver todos os chamados');
    // Aqui seria implementada a navegação para a lista completa de chamados
  };

  return (
    <main className={styles["main-page"]}>



      <section >
        <Carousel
          tickets={ticketsData}
          spaceBetween={24}
        />

      </section>

      <section >
        {/* Substitua pelos componente Form */}
        <Table />
      </section>

    </main>
  );
};

export default Chamados;
