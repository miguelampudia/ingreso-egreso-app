import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresosEgresosService } from '../services/ingresos-egresos.service';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  uiSubscribe: Subscription;

  constructor(private fb: FormBuilder, private ingresoEgresoService: IngresosEgresosService, private store: Store<AppState>) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({ descripcion: ['', Validators.required], monto: ['', Validators.required] });
    this.uiSubscribe = this.store.select('ui').subscribe(({ isLoading }) => this.cargando = isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscribe.unsubscribe;
  }

  guardar() {
    if (this.ingresoForm.invalid) return;
    this.store.dispatch(isLoading());

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {
      this.ingresoForm.reset();
      this.store.dispatch(stopLoading());
      Swal.fire('Registro creado', descripcion, 'success');
    }).catch(err => {
      Swal.fire('Error', err.message, 'error');
      this.store.dispatch(stopLoading());
    });
  }

}
