import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresosEgresosService {

  constructor(private firesStore: AngularFirestore, private authService: AuthService) { }


  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;
    
    delete ingresoEgreso.uid;

    return this.firesStore.doc(`${uid}/ingresos-egresos`).collection('item').add({ ...ingresoEgreso });
  }

  initIngreoEgresosListener(uid: string) {
    return this.firesStore.collection(`${uid}/ingresos-egresos/item`).snapshotChanges().pipe(map(snap => {
      return snap.map(doc =>
        ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })
      );
    }));
  }

  borrarIngresoEgreso(uidItem: string) {
    const uid = this.authService.user.uid;
    return this.firesStore.doc(`${uid}/ingresos-egresos/item/${uidItem}`).delete();
  }


}
