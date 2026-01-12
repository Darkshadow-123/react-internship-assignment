import { DataTable} from 'primereact/datatable';
import type{ DataTablePageEvent} from 'primereact/datatable';
import { Column } from 'primereact/column';
import type{ Artwork } from '../../types/artwork.types';

interface ArtworkTableProps {
  rows: Artwork[];
  totalRecords: number;
  loading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const ArtworkTable = ({
  rows,
  totalRecords,
  loading,
  currentPage,
  onPageChange,
}: ArtworkTableProps) => {
  const handlePageChange = (event: DataTablePageEvent) => {
    // PrimeReact paginator is zero-based
    if (typeof event.page !== 'number') {
        return;
    }
    onPageChange(event.page + 1);
  };

  return (
    <DataTable
      value={rows}
      lazy
      paginator
      rows={12}
      totalRecords={totalRecords}
      loading={loading}
      first={(currentPage - 1) * 12}
      onPage={handlePageChange}
      dataKey="id"
      responsiveLayout="scroll"
    >
      <Column field="title" header="Title" />
      <Column field="place_of_origin" header="Place of Origin" />
      <Column field="artist_display" header="Artist" />
      <Column field="inscriptions" header="Inscriptions" />
      <Column field="date_start" header="Date Start" />
      <Column field="date_end" header="Date End" />
    </DataTable>
  );
};
