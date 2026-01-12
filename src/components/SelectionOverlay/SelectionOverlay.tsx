import { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

import type { Artwork } from '../../types/artwork.types';

interface SelectionOverlayProps {
  rows: Artwork[];
  onSelectMany: (ids: number[]) => void;
}

export const SelectionOverlay = ({ rows, onSelectMany }: SelectionOverlayProps) => {
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
