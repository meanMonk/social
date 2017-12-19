import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Users} from '../../../pages/register/service/register.service';

@Injectable()
export class UserService {

  currentUserId: string;
  userInfo: Users;
  constructor(public afAuth: AngularFireAuth,
              public afs: AngularFirestore) { }

  getUserData() {
    this.afAuth.authState.subscribe(user => {
        this.currentUserId = user.uid;
        console.log(user.uid);
        this.currentUserId && this.afs.doc('registerUsers/' + this.currentUserId).valueChanges()
          .subscribe((res: Users) => {
            this.userInfo = res;
            console.log(res);
          });
    });
  }

}
