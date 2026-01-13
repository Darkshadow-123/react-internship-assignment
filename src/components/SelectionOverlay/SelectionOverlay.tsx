import { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

import type { Artwork } from '../../types/artwork.types';

interface SelectionOverlayProps {
  rows: Artwork[];
  onSelectMany: (ids: number[]) => void;
  selectedCount: number;
}

export const SelectionOverlay = ({ rows, onSelectMany , selectedCount }: SelectionOverlayProps) => {
  const overlayRef = useRef<OverlayPanel>(null);
  const [count, setCount] = useState<number | null>(null);

  const applySelection = () => {
    if (!count || count <= 0) return;

    const limitedCount = Math.min(count, rows.length);
    const idsToSelect = rows.slice(0, limitedCount).map((row) => row.id);

    onSelectMany(idsToSelect);

    overlayRef.current?.hide();
    setCount(null);
  };

  return (
    <>
      <div style={{ marginBottom: '0.25rem', fontSize: '0.9rem', color: '#555' }}>
        <strong>Select:</strong> {selectedCount} rows
      </div>    
      <Button
        label="Select Rows"
        icon="pi pi-check-square"
        onClick={(e) => overlayRef.current?.toggle(e)}
        className="p-button-sm"
      />

      <OverlayPanel ref={overlayRef}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <InputNumber
            value={count}
            onValueChange={(e) => setCount(e.value ?? null)}
            placeholder="Number of rows"
            min={1}
            max={rows.length}
          />

          <Button
            label="Apply"
            icon="pi pi-check"
            onClick={applySelection}
            disabled={!count || count <= 0}
          />
        </div>
      </OverlayPanel>
    </>
  );
};
