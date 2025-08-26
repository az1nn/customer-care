import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styles from './Carousel.module.scss';

// Definindo os tipos para os dados dos tickets
export interface TicketData {
  id: string;
  title: string;
  status: ('waiting' | 'in-progress' | 'delayed' | 'pending-client' | 'critical')[];
  lastUpdate: string;
  description?: string;
}

interface CarouselProps {
  tickets: TicketData[];
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  className?: string;
}

// Função para obter as classes CSS baseadas no status
const getStatusClasses = (status: TicketData['status']) => {
  const baseClasses = styles['carousel-ticket'];
  
  // Usa o primeiro status para definir a classe principal do ticket
  const primaryStatus = status[0];
  
  switch (primaryStatus) {
    case 'waiting':
      return `${baseClasses} ${styles['carousel-ticket--waiting']}`;
    case 'in-progress':
      return `${baseClasses} ${styles['carousel-ticket--in-progress']}`;
    case 'delayed':
      return `${baseClasses} ${styles['carousel-ticket--delayed']}`;
    case 'pending-client':
      return `${baseClasses} ${styles['carousel-ticket--pending-client']}`;
    case 'critical':
      return `${baseClasses} ${styles['carousel-ticket--critical']}`;
    default:
      return baseClasses;
  }
};

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

const Carousel: React.FC<CarouselProps> = ({
  tickets,
  slidesPerView = 'auto',
  spaceBetween = 24,
  className = ''
}) => {
  const swiperRef = useRef<any>(null);

  const handlePrevSlide = () => {
    if (swiperRef.current && !swiperRef.current.destroyed) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current && !swiperRef.current.destroyed) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className={`${styles['carousel-container']} ${className}`}>
      <div className={styles['carousel-title']}>
        <span>Últimas atualizações</span>
        <div className={styles['navigation-arrows']}>
          <button onClick={handlePrevSlide} aria-label="Slide anterior">
            &#8249;
          </button>
          <button onClick={handleNextSlide} aria-label="Próximo slide">
            &#8250;
          </button>
        </div>
      </div>
      
      <Swiper
        modules={[Navigation]}
        spaceBetween={spaceBetween}
        slidesPerView="auto"
        freeMode={true}
        grabCursor={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          320: {
            spaceBetween: 12,
          },
          768: {
            spaceBetween: 20,
          },
          1024: {
            spaceBetween: 24,
          },
          1200: {
            spaceBetween: 32,
          },
          1400: {
            spaceBetween: 40,
          },
          1600: {
            spaceBetween: 32,
          }
        }}
        className={styles['carousel-swiper']}
      >
        {tickets.map((ticket) => (
          <SwiperSlide key={ticket.id} className={styles['carousel-slide']}>
            <div className={getStatusClasses(ticket.status)}>
              <div className={styles['carousel-ticket__header']}>
                <h3 className={styles['carousel-ticket__id']}>Ticket {ticket.id}</h3>
              </div>
              
              <div className={styles['carousel-ticket__content']}>
                <h4 className={styles['carousel-ticket__title']}>{ticket.title}</h4>
              </div>

              <div className={styles['carousel-ticket__status-wrapper']}>
                {ticket.status.map((statusType, index) => (
                  <span 
                    key={index}
                    className={`${styles['carousel-ticket__status']} ${styles[`carousel-ticket__status--${statusType}`]}`}
                  >
                    {getStatusText(statusType)}
                  </span>
                ))}
              </div>
              
              <div className={styles['carousel-ticket__footer']}>
                <span className={styles['carousel-ticket__update']}>
                  Atualização: {ticket.lastUpdate}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;