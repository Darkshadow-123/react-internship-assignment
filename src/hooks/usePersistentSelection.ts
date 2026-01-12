import { useState } from 'react';
import { createInitialSelectionState } from '../state/selection.store';

export const usePersistentSelection = () => {
  const [selectionState, setSelectionState] = useState(
    createInitialSelectionState()
  );

  const selectOne = (id: number) => {
    setSelectionState((prev) => {
      const selectedIds = new Set(prev.selectedIds);
      const deselectedIds = new Set(prev.deselectedIds);

      selectedIds.add(id);
      deselectedIds.delete(id);

      return { selectedIds, deselectedIds };
    });
  };

  const unselectOne = (id: number) => {
    setSelectionState((prev) => {
      const selectedIds = new Set(prev.selectedIds);
      const deselectedIds = new Set(prev.deselectedIds);

      deselectedIds.add(id);
      selectedIds.delete(id);

      return { selectedIds, deselectedIds };
    });
  };

  const selectMany = (ids: number[]) => {
    setSelectionState((prev) => {
      const selectedIds = new Set(prev.selectedIds);
      const deselectedIds = new Set(prev.deselectedIds);

      ids.forEach((id) => {
        selectedIds.add(id);
        deselectedIds.delete(id);
      });

      return { selectedIds, deselectedIds };
    });
  };

  const unselectMany = (ids: number[]) => {
    setSelectionState((prev) => {
      const selectedIds = new Set(prev.selectedIds);
      const deselectedIds = new Set(prev.deselectedIds);

      ids.forEach((id) => {
        deselectedIds.add(id);
        selectedIds.delete(id);
      });

      return { selectedIds, deselectedIds };
    });
  };

  const isSelected = (id: number): boolean => {
    return (
      selectionState.selectedIds.has(id) &&
      !selectionState.deselectedIds.has(id)
    );
  };

  return {
    selectedIds: selectionState.selectedIds,
    deselectedIds: selectionState.deselectedIds,
    isSelected,
    selectOne,
    unselectOne,
    selectMany,
    unselectMany,
  };
};
