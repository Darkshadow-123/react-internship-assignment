import { useEffect, useState } from 'react';
import { fetchArtworksByPage } from '../api/artworks.api';
import type{ Artwork } from '../types/artwork.types';

interface UseArtworksResult {
  rows: Artwork[];
  totalRecords: number;
  loading: boolean;
}

export const useArtworks = (page: number): UseArtworksResult => {
  const [rows, setRows] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const loadArtworks = async () => {
      setLoading(true);

      try {
        const response = await fetchArtworksByPage(page);

        if (isMounted) {
          setRows(response.data);
          setTotalRecords(response.pagination.total);
        }
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadArtworks();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return {
    rows,
    totalRecords,
    loading,
  };
};
