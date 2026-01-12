import { useState } from 'react';
import { useArtworks } from './hooks/useArtworks';
import { usePersistentSelection } from './hooks/usePersistentSelection';
import { ArtworkTable } from './components/ArtworkTable/ArtworkTable';
import { SelectionOverlay } from './components/SelectionOverlay/SelectionOverlay';

const App = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { rows, totalRecords, loading } = useArtworks(currentPage);
  const selection = usePersistentSelection();

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '0.75rem' }}>
        <SelectionOverlay
        rows={rows}
        onSelectMany={selection.selectMany}
        />
      </div>    
      <ArtworkTable
        rows={rows}
        totalRecords={totalRecords}
        loading={loading}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isRowSelected={selection.isSelected}
        onSelectMany={selection.selectMany}
        onUnselectMany={selection.unselectMany}
      />
    </div>
  );
};

export default App;
