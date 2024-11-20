import { createReducer, on } from '@ngrx/store';
import { aparece, desaparece } from './loading.reduce';

export const initialState = true;

export const loadingReducer = createReducer(
  initialState,
  on(aparece, (state) => state = true),
  on(desaparece, (state) => state = false)
);