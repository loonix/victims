import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  createVictim(data) {
    return this.firestore.collection('Victims').add(data);
  }

  getVictims() {
    return this.firestore.collection('Victims').snapshotChanges();
  }

  editVictim(id, data) {
    this.firestore.doc('Victims/' + id).update(data);
  }

  deleteVictim(id) {
    this.firestore.doc('Victims/' + id).delete();
  }
}

