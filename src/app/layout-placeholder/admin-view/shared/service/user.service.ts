import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Users} from '../../../pages/register/service/register.service';

@Injectable()
export class UserService {

  currentUserId: string;
  userInfo: Users[];
  constructor(public afAuth: AngularFireAuth,
              public afs: AngularFirestore) { }

  getUserData(userId) {
       return this.afs.collection('registerUsers' , (ref) => ref.where('uid', '==', userId)).valueChanges()
  }

  getCurrentUserId() {
    return this.afAuth.authState;
  }

}
