import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";

export interface Users {
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
  referedBy: string;
  createdAt: Date;
}

@Injectable()
export class RegisterService {

  private usersCollection: AngularFirestoreCollection<Users>;

  constructor(public  afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              public router: Router) {

    this.usersCollection = afs.collection<Users>('registerUsers');

  }

  createUser(userModel) {
    return Observable.fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(userModel.email, userModel.password));
  }

  saveUserInfo(userInfo: Users) {
    console.log(userInfo);
   return Observable.fromPromise(this.usersCollection.add(userInfo));

  }

}
