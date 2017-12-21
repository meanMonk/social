import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Users} from '../../../pages/register/service/register.service';
import {Observable} from "rxjs/Observable";


@Injectable()
export class UserService {
  currentUserId: string;
  userInfo: Observable<Users>;

  constructor(public afAuth: AngularFireAuth,
              public afs: AngularFirestore) {

  }

  loadUserInfo(): Observable<Users> {
    return this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<Users>(`registeredUsers/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

}
