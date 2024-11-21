import { createAction, props } from '@ngrx/store';

//
export const aparece = createAction('[Loading Component] Aparece', props<{ loading: { spinner: boolean; barra: boolean, cargado: boolean } }>());
export const desaparece = createAction('[Loafing Component] Desaparece');

export const apareceSpinner = createAction('[Loading Component] apareceSpinner');
export const apareceBarra = createAction('[Loading Component] apareceBarra');