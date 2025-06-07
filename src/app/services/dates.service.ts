import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
  Firestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Dates } from '../models/dates.interface';
import { deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatesService {
  constructor(private firestore: Firestore) {}

  AddDate(date: Dates) {
    const dateRef = collection(this.firestore, 'date');
    return addDoc(dateRef, date);
  }

  getDate(): Observable<Dates[]> {
    const dateRef = collection(this.firestore, 'date');
    return collectionData(dateRef, { idField: 'id' }) as Observable<Dates[]>;
  }

updateDate(id: string, data: any) {
  const dateDocRef = doc(this.firestore, `date/${id}`);
  return updateDoc(dateDocRef, data);
}

deleteDate(id: string) {
  const docRef = doc(this.firestore, 'date', id);
  return deleteDoc(docRef);
}

}
