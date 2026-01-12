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
const textTemplate = (value: string | null) => {
  return value ? value : '—';
};

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
    tableStyle={{ tableLayout: 'fixed' }}
    >
        <Column field="title" header="Title" style={{ width: '16rem' }} />
        <Column field="place_of_origin" header="Place of Origin" style={{ width: '8rem' }} />
        <Column field="artist_display" header="Artist" body={(row) => textTemplate(row.artist_display)} style={{ width: '24rem' }} />
        <Column field="inscriptions" header="Inscriptions" body={(row) => textTemplate(row.inscriptions)} style={{ width: '20rem' }} />
        <Column field="date_start" header="Date Start" style={{ width: '6rem' }} />
        <Column field="date_end" header="Date End" style={{ width: '6rem' }} />
    </DataTable>
  );
};
