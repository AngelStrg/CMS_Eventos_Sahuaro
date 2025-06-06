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

        // 🔹 Obtener el primer documento con su ID
async getFirstCost(): Promise<{ data: any }> {
  const docRef = doc(this.firestore, 'costos/costos-actuales');
  const docSnap = await getDoc(docRef);
  return { data: docSnap.data() };
}

  // 🔹 Actualizar el primer documento sin pedir ID
  async updateFirstCost(cost: Partial<Cost>) {
    const snapshot = await getDocs(collection(this.firestore, 'cost'));
    const docSnap = snapshot.docs[0];
    const docRef = doc(this.firestore, 'cost', docSnap.id);
    return updateDoc(docRef, cost);
  }
}
