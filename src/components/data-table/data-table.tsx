import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';

import { Scrollbar } from 'src/components/scrollbar';
import { EmptyState } from 'src/components/empty-state';

import type { DataTableProps } from './types';

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25],
  sortConfig,
  onSortChange,
  primaryKey,
  onPrimaryClick,
  getRowId,
  loading,
  emptyTitle = 'Tidak ada data',
  emptyDescription,
  selected,
  onSelectAllRows,
  onSelectRow,
  toolbar,
}: DataTableProps<T>) {
  const displayTotal = total ?? data.length;

  const renderHeader = () => (
    <TableHead>
      <TableRow>
        {onSelectAllRows && onSelectRow && (
          <TableCell
            padding="checkbox"
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 3,
              bgcolor: '#0A2E5A',
              color: '#fff',
              borderBottom: 'none',
              py: 2.25,
            }}
          >
            <input
              type="checkbox"
              checked={data.length > 0 && data.every((row) => selected?.includes(getRowId(row)))}
              onChange={(e) => {
                if (e.target.checked) {
                  onSelectAllRows([...new Set([...(selected || []), ...data.map((r) => getRowId(r))])]);
                } else {
                  const visibleIds = new Set(data.map((r) => getRowId(r)));
                  onSelectAllRows((selected || []).filter((id) => !visibleIds.has(id)));
                }
              }}
              style={{ accentColor: '#60A5FA', cursor: 'pointer', width: 16, height: 16 }}
            />
          </TableCell>
        )}
        {columns.map((col) => (
          <TableCell
            key={col.id}
            align={col.align || 'left'}
            sortDirection={sortConfig?.key === col.id ? sortConfig.direction : false}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 3,
              bgcolor: '#0A2E5A',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              whiteSpace: 'nowrap',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              py: 2.25,
              px: 2.5,
              ...(col.width ? { width: col.width } : {}),
            }}
          >
            {col.sortable && onSortChange ? (
              <TableSortLabel
                active={sortConfig?.key === col.id}
                direction={sortConfig?.key === col.id ? sortConfig.direction : 'asc'}
                onClick={() => onSortChange(col.id)}
                sx={{
                  color: '#FFFFFF !important',
                  fontWeight: 600,
                  '&.Mui-active': { color: '#FFFFFF !important' },
                  '& .MuiTableSortLabel-icon': { color: '#FFFFFF !important', opacity: 0.7 },
                  '&:hover': { color: '#FFFFFF !important' },
                }}
              >
                {col.label}
              </TableSortLabel>
            ) : (
              col.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const renderRow = (row: T, index: number) => {
    const rowId = getRowId(row);
    const isSelected = selected?.includes(rowId);

    return (
      <TableRow
        key={rowId}
        hover
        selected={isSelected}
        sx={{
          height: 60,
          bgcolor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
          transition: 'background-color 0.15s ease',
          '&:hover': {
            bgcolor: '#EEF2FF',
            transition: 'background-color 0.15s ease',
          },
          '&.Mui-selected': {
            bgcolor: '#E0E7FF',
          },
          '& td': {
            borderBottom: '1px solid',
            borderColor: (theme) => theme.vars.palette.divider,
            px: 2.5,
          },
          '&:last-child td': {
            borderBottom: 'none',
          },
        }}
      >
        {onSelectRow && (
          <TableCell padding="checkbox" sx={{ py: 1.5, pl: 2.5 }}>
            <input
              type="checkbox"
              checked={isSelected || false}
              onChange={() => onSelectRow(rowId)}
              style={{ cursor: 'pointer', width: 16, height: 16, accentColor: '#3B82F6' }}
            />
          </TableCell>
        )}
        {columns.map((col) => {
          const isPrimary = col.id === primaryKey;
          const cellContent = col.renderCell ? col.renderCell(row) : row[col.id];

          return (
            <TableCell
              key={col.id}
              align={col.align || 'left'}
              sx={{
                py: 1.75,
                fontSize: 13.5,
                color: isPrimary ? '#2563EB' : 'text.primary',
                fontWeight: isPrimary ? 600 : 400,
                whiteSpace: 'nowrap',
                ...(col.width ? { width: col.width } : {}),
              }}
            >
              {isPrimary && onPrimaryClick ? (
                <Box
                  component="span"
                  onClick={() => onPrimaryClick(row)}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: '#2563EB',
                    transition: 'color 0.15s ease',
                    '&:hover': { color: '#1D4ED8', textDecoration: 'underline' },
                  }}
                >
                  {cellContent}
                </Box>
              ) : (
                cellContent
              )}
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  const renderEmpty = () => (
    <Box sx={{ py: 8 }}>
      <EmptyState title={emptyTitle} description={emptyDescription} icon="solar:file-text-bold-duotone" />
    </Box>
  );

  const renderLoading = () => (
    <Box sx={{ p: 5, textAlign: 'center' }}>
      <Typography color="text.secondary" sx={{ fontSize: 14 }}>Memuat data...</Typography>
    </Box>
  );

  const renderBody = () => {
    if (loading) return renderLoading();
    if (data.length === 0) return renderEmpty();
    return <TableBody>{data.map((row, i) => renderRow(row, i))}</TableBody>;
  };

  return (
    <Card
      sx={{
        borderRadius: '18px',
        boxShadow: (theme) => `0 4px 24px ${theme.vars.palette.grey['500Channel']}12`,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.6)',
      }}
    >
      {toolbar}

      <Scrollbar>
        <TableContainer sx={{ maxHeight: 420 }}>
          <Table sx={{ minWidth: 800 }}>
            {renderHeader()}
            {renderBody()}
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 1.5,
          borderTop: (theme) => `1px solid ${theme.vars.palette.divider}`,
          bgcolor: '#F8FAFC',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13, fontWeight: 500 }}>
          Total: <strong>{displayTotal.toLocaleString()}</strong> records
        </Typography>

        <TablePagination
          component="div"
          page={page}
          count={displayTotal}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={(e) => {
            onRowsPerPageChange(parseInt(e.target.value, 10));
          }}
          sx={{
            border: 'none',
            bgcolor: 'transparent',
            '.MuiTablePagination-toolbar': { minHeight: 40, px: 0 },
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              fontWeight: 500,
              fontSize: 13,
              color: 'text.secondary',
            },
            '.MuiTablePagination-select': {
              fontWeight: 600,
              fontSize: 13,
            },
            '.MuiTablePagination-actions': {
              '& .MuiIconButton-root': {
                borderRadius: 1.5,
                width: 32,
                height: 32,
                '&:hover': {
                  bgcolor: (theme) => theme.vars.palette.action.hover,
                },
              },
            },
          }}
        />
      </Box>
    </Card>
  );
}
