import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { NavbarMenuProps } from './Models/NavbarProps';
import * as navigationStoreModule from '../../../stores/navigationStore';
import '@testing-library/jest-dom';

// Mock para o módulo completo do store
jest.mock('../../../stores/navigationStore', () => {
  const original = jest.requireActual('../../../stores/navigationStore');
  return {
    ...original,
    useNavigationStore: jest.fn(),
  };
});

// Mock para o componente Text local
jest.mock('@/components/ui', () => ({
  Text: ({ children, ...props }: any) => (
    <div data-testid="text" {...props}>
      {children}
    </div>
  ),
}));

// Mock para os estilos
jest.mock('./Navbar.scss', () => ({}));

describe('Navbar Component', () => {
  // Dados de teste baseados na estrutura real
  const mockNavbarProps: NavbarMenuProps[] = [
    {
      page: 'Empresa',
      url: '/inventario/consultas-cadastro/empresa',
    },
    {
      page: 'Redes',
      url: '/inventario/consultas-cadastro/redes',
    },
    {
      page: 'Site',
      url: '/inventario/consultas-cadastro/site',
    },
  ];

  // Função mock para updateNavigation
  const mockUpdateNavigation = jest.fn();

  beforeEach(() => {
    // Configurar o mock do useNavigationStore com tipagem correta
    const mockUseNavigationStore =
      navigationStoreModule.useNavigationStore as jest.MockedFunction<
        typeof navigationStoreModule.useNavigationStore
      >;

    mockUseNavigationStore.mockImplementation(() => ({
      navigationProps: {
        page: 'Consultas / Cadastro',
        url: '/inventario/consultas-cadastro',
        navbarUrl: '/inventario/consultas-cadastro',
        breadcrumb: [
          { page: 'Home', url: '/' },
          { page: 'Inventário', url: '/inventario' },
          {
            page: 'Consultas / Cadastro',
            url: '/inventario/consultas-cadastro',
          },
        ],
      },
      setNavigation: jest.fn(),
      updateNavigation: mockUpdateNavigation,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar todos os links da navbar', () => {
    render(
      <BrowserRouter>
        <Navbar navbarProps={mockNavbarProps} />
      </BrowserRouter>
    );

    // Verificar se todos os textos dos links estão presentes
    expect(screen.getByText('Empresa')).toBeInTheDocument();
    expect(screen.getByText('Redes')).toBeInTheDocument();
    expect(screen.getByText('Site')).toBeInTheDocument();

    // Verificar se todos os links estão presentes
    const navLinks = screen.getAllByRole('link');
    expect(navLinks).toHaveLength(3);
    expect(navLinks[0]).toHaveAttribute(
      'href',
      '/inventario/consultas-cadastro/empresa'
    );
    expect(navLinks[1]).toHaveAttribute(
      'href',
      '/inventario/consultas-cadastro/redes'
    );
    expect(navLinks[2]).toHaveAttribute(
      'href',
      '/inventario/consultas-cadastro/site'
    );
  });

  test('deve renderizar uma estrutura completa de navbar com a configuração completa', () => {
    // Usando uma estrutura mais completa similar ao navbarConfig real
    const fullNavbarConfig: NavbarMenuProps[] = [
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
    ];

    // Renderizando com os filhos do primeiro item
    render(
      <BrowserRouter>
        <Navbar
          navbarProps={fullNavbarConfig[0].children as NavbarMenuProps[]}
        />
      </BrowserRouter>
    );

    // Verificar se os links dos filhos estão presentes
    expect(screen.getByText('Empresa')).toBeInTheDocument();
    expect(screen.getByText('Redes')).toBeInTheDocument();
  });

  test('deve lidar com array vazio de navbarProps', () => {
    render(
      <BrowserRouter>
        <Navbar navbarProps={[]} />
      </BrowserRouter>
    );

    const navbarContainer = screen.getByRole('generic');
    expect(navbarContainer).toBeInTheDocument();
    expect(navbarContainer.children).toHaveLength(0);
  });
});
