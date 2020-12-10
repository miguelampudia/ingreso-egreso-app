import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItemns } from '../ingreso-egreso/ingreso-egreso.action';
import { IngresosEgresosService } from '../services/ingresos-egresos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresosSubs: Subscription;

  constructor(private sore: Store<AppState>, private ingreoEgresoService: IngresosEgresosService) { }

  ngOnDestroy(): void {
    this.ingresosSubs?.unsubscribe;
    this.userSubs?.unsubscribe;
  }

  ngOnInit() {
    this.userSubs = this.sore.select('user').pipe(filter(auth => auth.user != null)).subscribe(({ user }) => {
      this.ingresosSubs = this.ingreoEgresoService.initIngreoEgresosListener(user.uid).subscribe((ingresosEgresos) => {
        console.log(ingresosEgresos)
        this.sore.dispatch(setItemns({ items: ingresosEgresos }))
      });
    });
  }

}
