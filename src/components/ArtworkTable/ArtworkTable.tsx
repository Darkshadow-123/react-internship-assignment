import { DataTable } from 'primereact/datatable';
import type {
  DataTablePageEvent,
  DataTableSelectionMultipleChangeEvent,
} from 'primereact/datatable';
import { Column } from 'primereact/column';

import type { Artwork } from '../../types/artwork.types';
import type { ArtworkTableProps } from './ArtworkTable.types';

export const ArtworkTable = ({
  rows,
  totalRecords,
  loading,
  currentPage,
  onPageChange,
  isRowSelected,
  onSelectMany,
  onUnselectMany,
}: ArtworkTableProps) => {
  const handlePageChange = (event: DataTablePageEvent) => {
    if (typeof event.page !== 'number') return;
    onPageChange(event.page + 1);
  };

  const handleSelectionChange = (
    event: DataTableSelectionMultipleChangeEvent<Artwork[]>
  ) => {
    const selectedRows = event.value ?? [];
    const selectedIds = selectedRows.map((row) => row.id);
    const currentPageIds = rows.map((row) => row.id);

    onSelectMany(selectedIds);

    const unselectedIds = currentPageIds.filter(
      (id) => !selectedIds.includes(id)
    );
    onUnselectMany(unselectedIds);
  };

  const selectedRows = rows.filter((row) => isRowSelected(row.id));

  return (
    <DataTable
      value={rows}
      dataKey="id"
      lazy
      paginator
      rows={12}
      totalRecords={totalRecords}
      loading={loading}
      first={(currentPage - 1) * 12}
      onPage={handlePageChange}
      selection={selectedRows}
      selectionMode="checkbox"
      onSelectionChange={handleSelectionChange}
      tableStyle={{ tableLayout: 'fixed' }}
      responsiveLayout="scroll"
      paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />

      <Column field="title" header="Title" style={{ width: '20rem' }} />
      <Column field="place_of_origin" header="Place of Origin" style={{ width: '12rem' }} />
      <Column field="artist_display" header="Artist" style={{ width: '18rem' }} />
      <Column field="inscriptions" header="Inscriptions" style={{ width: '22rem' }} />
      <Column field="date_start" header="Date Start" style={{ width: '8rem' }} />
      <Column field="date_end" header="Date End" style={{ width: '8rem' }} />
    </DataTable>
  );
};
