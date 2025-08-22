import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TableComponent from './TableComponent';
import { TableComponentProps } from './types/ITable';
import '@testing-library/jest-dom';

jest.mock('mondrian-react', () => ({
  Spinner: ({ isLoading }: { isLoading: boolean }) =>
    isLoading ? <div data-testid="spinner">Spinner</div> : null,
  Text: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
  Checkbox: () => <input type="checkbox" data-testid="checkbox" />,
}));

describe('TableComponent', () => {
  test('renders Spinner when isLoading is true', () => {
    render(<TableComponent data={[]} columns={[]} isLoading={true} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('shows "No data found" message when data is empty and not loading', () => {
    render(<TableComponent data={[]} columns={[]} isLoading={false} />);
    expect(screen.getByText('Nenhum dado encontrado')).toBeInTheDocument();
  });

  test('renders table with data and columns', () => {
    const columns: TableComponentProps['columns'] = [
      { value: 'name', label: 'Name' },
      { value: 'cnpj', label: 'CNPJ', type: 'cnpj' },
    ];
    const data = [{ name: 'Example 1', cnpj: '12345678000199' }];
    render(<TableComponent data={data} columns={columns} isLoading={false} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('CNPJ')).toBeInTheDocument();
    expect(screen.getByText('Example 1')).toBeInTheDocument();
    expect(screen.getByText('12.345.678/0001-99')).toBeInTheDocument();
  });

  test('renders checkbox when selectable is true', () => {
    const columns: TableComponentProps['columns'] = [
      { value: 'name', label: 'Name' },
    ];
    const data = [{ name: 'Example 1' }];
    render(
      <TableComponent
        data={data}
        columns={columns}
        isLoading={false}
        selectable={true}
      />
    );
    expect(screen.getAllByTestId('checkbox').length).toBeGreaterThanOrEqual(2);
  });

  test('renders actions column and toggles dropdown on button click', () => {
    const columns: TableComponentProps['columns'] = [
      { value: 'name', label: 'Name' },
    ];
    const data = [{ name: 'Example 1' }];
    const actionCallback = jest.fn();
    const actions = [{ label: 'Edit', callback: actionCallback }];
    render(
      <TableComponent
        data={data}
        columns={columns}
        isLoading={false}
        actions={actions}
      />
    );

    expect(screen.getByText('Ações')).toBeInTheDocument();
    const actionButton = screen.getByRole('button', {
      name: /opcoes-vertical/i,
    });
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(screen.getByText('Edit')).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  test('closes dropdown when clicking outside the menu', () => {
    const columns: TableComponentProps['columns'] = [
      { value: 'name', label: 'Name' },
    ];
    const data = [{ name: 'Example 1' }];
    const actionCallback = jest.fn();
    const actions = [{ label: 'Edit', callback: actionCallback }];
    render(
      <TableComponent
        data={data}
        columns={columns}
        isLoading={false}
        actions={actions}
      />
    );

    const actionButton = screen.getByRole('button', {
      name: /opcoes-vertical/i,
    });
    fireEvent.click(actionButton);
    expect(screen.getByText('Edit')).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  test('closes dropdown when Escape key is pressed', () => {
    const columns: TableComponentProps['columns'] = [
      { value: 'name', label: 'Name' },
    ];
    const data = [{ name: 'Example 1' }];
    const actionCallback = jest.fn();
    const actions = [{ label: 'Edit', callback: actionCallback }];
    render(
      <TableComponent
        data={data}
        columns={columns}
        isLoading={false}
        actions={actions}
      />
    );

    const actionButton = screen.getByRole('button', {
      name: /opcoes-vertical/i,
    });
    fireEvent.click(actionButton);
    expect(screen.getByText('Edit')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  test('executes action callback on dropdown item click and closes menu', () => {
    const columns: TableComponentProps['columns'] = [
      { value: 'name', label: 'Name' },
    ];
    const data = [{ name: 'Example 1' }];
    const actionCallback = jest.fn();
    const actions = [{ label: 'Edit', callback: actionCallback }];
    render(
      <TableComponent
        data={data}
        columns={columns}
        isLoading={false}
        actions={actions}
      />
    );

    const actionButton = screen.getByRole('button', {
      name: /opcoes-vertical/i,
    });
    fireEvent.click(actionButton);
    const dropdownItem = screen.getByText('Edit');
    fireEvent.click(dropdownItem);

    expect(actionCallback).toHaveBeenCalledWith(data[0]);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  test('correctly formats accountNumber type', () => {
    const columns: TableComponentProps['columns'] = [
      { value: 'account', label: 'Account', type: 'accountNumber' },
    ];
    const data = [{ account: '123456789' }];
    render(<TableComponent data={data} columns={columns} isLoading={false} />);
    expect(screen.getByText('12345678-9')).toBeInTheDocument();
  });
});
