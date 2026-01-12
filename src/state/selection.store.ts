export interface SelectionState {
  selectedIds: Set<number>;
  deselectedIds: Set<number>;
}

export const createInitialSelectionState = (): SelectionState => {
  return {
    selectedIds: new Set<number>(),
    deselectedIds: new Set<number>(),
  };
};
