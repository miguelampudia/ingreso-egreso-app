import { createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItemns, unSetItemns } from './ingreso-egreso.action';

export interface State {
    items: IngresoEgreso[];
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItemns, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItemns, (state) => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}