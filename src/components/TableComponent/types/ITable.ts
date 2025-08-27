export interface Column {
  label: string;
  value: string;
  type?: 'cnpj' | 'accountNumber';
}

export interface DataRow {
  [key: string]: string | number | boolean;
}

export interface Action {
  label: string;
  callback: (row: DataRow) => void;
}

export interface TableComponentProps {
  data: DataRow[];
  columns: Column[];
  selectable?: boolean;
  actions?: Action[];
  isLoading?: boolean;
}
