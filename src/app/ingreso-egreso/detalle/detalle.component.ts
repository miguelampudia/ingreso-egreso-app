import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresosEgresosService } from 'src/app/services/ingresos-egresos.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = []
  ingresosSubs: Subscription;

  constructor(private store: Store<AppStateWithIngreso>, private ingresoEgresoServioce: IngresosEgresosService) { }
  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe;
  }

  ngOnInit() {
    this.ingresosSubs = this.store.select('ingresosEgresos').subscribe(({ items }) => {
      this.ingresosEgresos = items;
    });
  }

  borrar(uid: string) {
    console.log(uid);
    this.ingresoEgresoServioce.borrarIngresoEgreso(uid).then(() => Swal.fire('Borrado', 'item borrado', 'success')).catch(err => Swal.fire('Borrado', err.message, 'error'))
  }
}
