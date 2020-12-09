import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction('[Counter Component] setUser', props<{ user: Usuario }>());
export const unUser = createAction('[Counter Component] unUser');