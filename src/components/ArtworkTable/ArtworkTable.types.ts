import type { Artwork } from '../../types/artwork.types';

export interface ArtworkTableProps {
  rows: Artwork[];
  totalRecords: number;
  loading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;

  isRowSelected: (id: number) => boolean;
  onSelectMany: (ids: number[]) => void;
  onUnselectMany: (ids: number[]) => void;
}
