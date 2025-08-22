import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ErrorScreen from './ErrorScreen';

describe('CompanyFilter', () => {
  test('should render the filter component', () => {
    render(
      <MemoryRouter>
        <ErrorScreen />
      </MemoryRouter>
    );

    expect(screen.getByText('Ops! Algo deu errado.')).toBeInTheDocument();
  });
});
