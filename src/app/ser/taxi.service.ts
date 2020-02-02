import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Taxi } from '../taxi.model';

@Injectable({
  providedIn: 'root'
})
export class TaxiService {

  

  constructor(
    private firestore: AngularFirestore
  ) { }

  getTaxis () {
    return this.firestore.collection('taxis').snapshotChanges();
  }

  postTaxis(taxi: Taxi) {
    return this.firestore.collection('taxis').add(taxi);
  }

  deleteTaxis(id) {
    return this.firestore.doc('taxis/' + id).delete();
  }
}
