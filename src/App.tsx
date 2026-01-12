import { useState } from 'react';
import { useArtworks } from './hooks/useArtworks';
import { ArtworkTable } from './components/ArtworkTable/ArtworkTable';

const App = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { rows, totalRecords, loading } = useArtworks(currentPage);

  return (
    <div style={{ padding: '1rem' }}>
      <ArtworkTable
        rows={rows}
        totalRecords={totalRecords}
        loading={loading}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
