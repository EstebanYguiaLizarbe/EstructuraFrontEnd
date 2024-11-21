import { createReducer, on } from '@ngrx/store';
import { aparece, apareceBarra, apareceSpinner, desaparece } from './loading.reduce';

export interface LoadingState { spinner: boolean; barra: boolean; cargado: boolean; }

export const initialState = {
  spinner: false,
  barra: false,
  cargado: false
};

export const loadingReducer = createReducer(
  initialState,
  on(aparece, (state, {loading}) => ({...state, ...loading, cargado: true})),
  on(apareceSpinner, (state) => ({...state, spinner: true, cargado: true})),
  on(apareceBarra, (state) => ({...state, barra: true, cargado: true})),
  on(desaparece, () => initialState)
);