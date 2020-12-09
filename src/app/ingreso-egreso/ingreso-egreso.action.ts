import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const setItemns = createAction('[IngresoEgreso] setItemns', props<{ items: IngresoEgreso[] }>());
export const unSetItemns = createAction('[unSetItemns] UnSet Itemns');