import type{ ArtworksApiResponse } from '../types/api-response.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchArtworksByPage = async (
  page: number
): Promise<ArtworksApiResponse> => {
  const response = await fetch(`${BASE_URL}?page=${page}`);

  if (!response.ok) {
    throw new Error('Failed to fetch artworks');
  }

  const json = await response.json();

  return {
    data: json.data,
    pagination: json.pagination,
  };
};
