import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom'; // Importando o BrowserRouter
import Header from './Header'; // Caminho correto para o seu componente
import { NavbarMenuProps } from './Models/NavbarProps'; // Importando o tipo de NavbarMenuProps

const meta = {
  title: 'Components/Header', // Título do componente no Storybook
  component: Header, // Referência ao componente Header
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen', // Exibe o componente em tela cheia
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock de navbarConfig (dados reais de navbar)
const navbarConfigMock: NavbarMenuProps[] = [
  {
    page: 'Consultas / Cadastro',
    url: '/inventario/consultas-cadastro',
    children: [
      {
        page: 'Empresa',
        url: '/inventario/consultas-cadastro/empresa',
      },
      {
        page: 'Redes',
        url: '/inventario/consultas-cadastro/redes',
      },
    ],
  },
  {
    page: 'Página 2',
    url: '/pagina-2',
  },
];

// Envolvendo as histórias no BrowserRouter para fornecer o contexto de roteamento
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

// Exemplo de story com navigationProps (com dados)
export const WithNavigationProps: Story = {
  args: {
    navigationProps: {
      page: 'Página Inicial', // Exemplo de título de página
      url: '/', // URL da página
      navbarUrl: '/inventario/consultas-cadastro', // Navbar URL que corresponde ao navbarConfig
      breadcrumb: [
        { page: 'Home', navbarUrl: '/' },
        { page: 'Consultas', navbarUrl: '/consultas' },
      ], // Exemplo de Breadcrumb com 2 tabs
    },
    navbarConfig: navbarConfigMock, // Passando navbarConfig para o componente
  },
  // Envolvendo a história no RouterWrapper
  render: (args) => (
    <RouterWrapper>
      <Header {...args} />
    </RouterWrapper>
  ),
};

// Exemplo de story sem dados de navigationProps válidos
export const WithoutValidNavigationProps: Story = {
  args: {
    navigationProps: {
      page: 'Página Sem Navbar', // Título da página
      url: '/', // URL da página
      navbarUrl: '/pagina-nao-encontrada', // URL que não existe no navbarConfig
      breadcrumb: [], // Não há Breadcrumb
    },
    navbarConfig: navbarConfigMock, // Passando navbarConfig para o componente
  },
  // Envolvendo a história no RouterWrapper
  render: (args) => (
    <RouterWrapper>
      <Header {...args} />
    </RouterWrapper>
  ),
};

// Exemplo de story com navigationProps sem filhos
export const WithNavigationPropsNoChildren: Story = {
  args: {
    navigationProps: {
      page: 'Página Inicial', // Título da página
      url: '/', // URL da página
      navbarUrl: '/inventario/consultas-cadastro', // Navbar URL que corresponde ao navbarConfig
      breadcrumb: [], // Não há Breadcrumb
    },
    navbarConfig: navbarConfigMock, // Passando navbarConfig para o componente
  },
  // Envolvendo a história no RouterWrapper
  render: (args) => (
    <RouterWrapper>
      <Header {...args} />
    </RouterWrapper>
  ),
};
