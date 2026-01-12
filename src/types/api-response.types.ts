import type{ Artwork } from './artwork.types';
import type{ PaginationMeta } from './pagination.types';

export interface ArtworksApiResponse {
  data: Artwork[];
  pagination: PaginationMeta;
}
