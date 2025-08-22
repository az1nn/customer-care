import { render, screen } from '@testing-library/react';
import Header from './Header';
import { NavigationProps } from '../../stores/navigationStore';
import { NavbarMenuProps } from './Navbar/Models/NavbarProps';
import '@testing-library/jest-dom';

// Mock dos componentes de mondrian-react
jest.mock('mondrian-react', () => ({
  Text: ({ children, ...props }: any) => (
    <div data-testid="text" {...props}>
      {children}
    </div>
  ),
  Breadcrumb: ({ data }: any) => (
    <div data-testid="breadcrumb">{JSON.stringify(data)}</div>
  ),
}));

// Mock do componente Navbar
jest.mock('./Navbar/Navbar', () => ({
  __esModule: true,
  default: ({ navbarProps }: any) => (
    <div data-testid="navbar">{JSON.stringify(navbarProps)}</div>
  ),
}));

describe('Header Component', () => {
  const mockNavigationProps: NavigationProps = {
    page: 'Test Page',
    navbarUrl: '/test-url',
    breadcrumb: [
      { page: 'Home', url: '/' },
      { page: 'Test', url: '/test' },
    ],
  };

  const mockNavbarConfig: NavbarMenuProps[] = [
    {
      url: '/test-url',
      page: 'Test URL',
      children: [
        { url: '/child-1', page: 'Child 1' },
        { url: '/child-2', page: 'Child 2' },
      ],
    },
    {
      url: '/another-url',
      page: 'Another URL',
      children: [{ url: '/another-child', page: 'Another Child' }],
    },
  ];

  test('deve renderizar o título da página corretamente', () => {
    render(
      <Header
        navigationProps={mockNavigationProps}
        navbarConfig={mockNavbarConfig}
      />
    );

    const titleElement = screen.getByTestId('text');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe('Test Page');
  });

  test('deve renderizar o breadcrumb quando disponível', () => {
    render(
      <Header
        navigationProps={mockNavigationProps}
        navbarConfig={mockNavbarConfig}
      />
    );

    const breadcrumbElement = screen.getByTestId('breadcrumb');
    expect(breadcrumbElement).toBeInTheDocument();
    // Verificando se os dados do breadcrumb contêm as informações corretas
    expect(breadcrumbElement.textContent).toContain('Home');
    expect(breadcrumbElement.textContent).toContain('Test');
  });

  test('deve renderizar o Navbar quando a configuração correspondente for encontrada', () => {
    render(
      <Header
        navigationProps={mockNavigationProps}
        navbarConfig={mockNavbarConfig}
      />
    );

    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toBeInTheDocument();
  });

  test('não deve renderizar o Navbar quando a configuração não for encontrada', () => {
    const propsWithoutNavbar = {
      ...mockNavigationProps,
      navbarUrl: '/url-not-found',
    };

    render(
      <Header
        navigationProps={propsWithoutNavbar}
        navbarConfig={mockNavbarConfig}
      />
    );

    expect(screen.queryByTestId('navbar')).not.toBeInTheDocument();
  });

  test('não deve renderizar o título quando a propriedade page não estiver disponível', () => {
    const propsWithoutPage = {
      ...mockNavigationProps,
      page: undefined as unknown as string, // Forçando typescript a aceitar undefined
    };

    render(
      <Header
        navigationProps={propsWithoutPage}
        navbarConfig={mockNavbarConfig}
      />
    );

    expect(screen.queryByTestId('text')).not.toBeInTheDocument();
  });

  test('não deve renderizar o breadcrumb quando não houver dados de breadcrumb', () => {
    const propsWithoutBreadcrumb = {
      ...mockNavigationProps,
      breadcrumb: [],
    };

    render(
      <Header
        navigationProps={propsWithoutBreadcrumb}
        navbarConfig={mockNavbarConfig}
      />
    );

    expect(screen.queryByTestId('breadcrumb')).not.toBeInTheDocument();
  });

  test('não deve renderizar o breadcrumb quando breadcrumb for undefined', () => {
    const propsWithoutBreadcrumb = {
      ...mockNavigationProps,
      breadcrumb: undefined,
    };

    render(
      <Header
        navigationProps={propsWithoutBreadcrumb}
        navbarConfig={mockNavbarConfig}
      />
    );

    expect(screen.queryByTestId('breadcrumb')).not.toBeInTheDocument();
  });
});
