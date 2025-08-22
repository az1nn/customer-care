import { Checkbox, Spinner, Text } from 'mondrian-react';
import React, { useState, useEffect, useRef } from 'react';
import styles from './TableComponent.module.scss';
import { TableComponentProps } from './types/ITable';

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  columns,
  selectable = false,
  actions,
  isLoading,
}) => {
  const [openActionRow, setOpenActionRow] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openActionRow !== null &&
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setOpenActionRow(null);
      }
    };
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openActionRow !== null) {
        setOpenActionRow(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [openActionRow]);

  return (
    <main className={styles['table-wrapper']}>
      {isLoading ? (
        <Spinner isLoading />
      ) : data.length === 0 ? (
        <div className={styles['table__empty-state']}>
          <Text body md>
            Nenhum dado encontrado
          </Text>
        </div>
      ) : (
        <table className={styles['table']}>
          <thead className={styles['table__thead']}>
            <tr className={styles['table__tr']}>
              {selectable && (
                <th className={styles['table__th']}>
                  <Checkbox />
                </th>
              )}
              {actions && actions.length > 0 && (
                <th className={styles['table__th']}>
                  <Text body sm>
                    Ações
                  </Text>
                </th>
              )}
              {columns.map((col) => (
                <th key={col.value} className={styles['table__th']}>
                  <Text body sm>
                    {col.label}
                  </Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles['table__tbody']}>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles['table__tr']}>
                {selectable && (
                  <td className={styles['table__td']}>
                    <Checkbox />
                  </td>
                )}
                {actions && actions.length > 0 && (
                  <td className={styles['table__td']}>
                    <div
                      className={styles['table__action-menu']}
                      ref={
                        rowIndex === openActionRow ? actionMenuRef : undefined
                      }
                    >
                      <button
                        onClick={() =>
                          setOpenActionRow(
                            rowIndex === openActionRow ? null : rowIndex
                          )
                        }
                        className={styles['table__action-menu-button']}
                      >
                        <span
                          className="mdn-Icon-opcoes-vertical mdn-Icon--md"
                          aria-label="opcoes-vertical"
                        ></span>
                      </button>
                      {openActionRow === rowIndex && (
                        <div className={styles['table__dropdown']}>
                          {actions.map((action, actionIndex) => (
                            <button
                              key={actionIndex}
                              onClick={() => {
                                action.callback(row);
                                setOpenActionRow(null);
                              }}
                              className={styles['table__dropdown-item']}
                            >
                              <Text body sm>
                                {action.label}
                              </Text>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.value} className={styles['table__td']}>
                    <Text body sm>
                      {col.type === 'cnpj'
                        ? (row[col.value] as string).replace(
                            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
                            '$1.$2.$3/$4-$5'
                          )
                        : col.type === 'accountNumber'
                          ? (row[col.value] as string).replace(
                              /^(\d{8})(\d{1})$/,
                              '$1-$2'
                            )
                          : row[col.value]}
                    </Text>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default TableComponent;
