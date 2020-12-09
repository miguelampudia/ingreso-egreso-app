import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as AuthAction from '../auth/auth.action';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubcripcion: Subscription;

  constructor(public auth: AngularFireAuth, private firestrore: AngularFirestore, private store: Store<AppState>) { }

  initAurhListener() {
    this.auth.authState.subscribe(fuser => {
      if (fuser)
        this.userSubcripcion = this.firestrore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe((firestroreuser: any) => {

          const user = Usuario.fromFireBase(firestroreuser);
          this.store.dispatch(AuthAction.setUser({ user }))
        });
      else {
        this.userSubcripcion.unsubscribe();
        this.store.dispatch(AuthAction.unUser());
      }
    });
  }


  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      const newUser = new Usuario(user.uid, nombre, user.email);

      return this.firestrore.doc(`${user.uid}/usuario`).set({ ...newUser });
    });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map(fbuser => fbuser != null));
  }
}
