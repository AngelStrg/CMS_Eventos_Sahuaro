import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, getDocs, getDoc, updateDoc, doc } from '@angular/fire/firestore';
import { Cost } from '../models/cost.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CostosService {

  constructor(private firestore: Firestore) {
    

   }
       AddCost(cost: Cost){
        const costRef = collection (this.firestore, 'cost');
        return addDoc (costRef, cost);
       }

       getCost(): Observable<Cost[]>{
        const costRef = collection (this.firestore, 'cost');
        return collectionData(costRef ) as Observable<Cost[]>;

       }

  async getFirstCost(): Promise<{ data: Cost | undefined; docId?: string }> {
    const snapshot = await getDocs(collection(this.firestore, 'cost'));
    if (snapshot.empty) {
      return { data: undefined }; // no hay documentos
    }
    const docSnap = snapshot.docs[0];
    return { data: docSnap.data() as Cost, docId: docSnap.id };
  }

  async updateFirstCost(cost: Partial<Cost>, docId: string) {
    const docRef = doc(this.firestore, 'cost', docId);
    return updateDoc(docRef, cost);
  }
}
