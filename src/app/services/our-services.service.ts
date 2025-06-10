import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, deleteDoc , setDoc} from '@angular/fire/firestore';
import { OurServices } from '../models/our-services';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OurServicesService {
  constructor(private firestore: Firestore) {}

  addService(service: OurServices) {
    const docRef = doc(this.firestore, `our-services/${service.id}`);
    return setDoc(docRef, service);
  }

  getServices(): Observable<OurServices[]> {
    const collectionRef = collection(this.firestore, 'our-services');
    return collectionData(collectionRef, { idField: 'id' }) as Observable<OurServices[]>;
  }

  deleteService(service: OurServices) {
    const serviceDocRef = doc(this.firestore, `our-services/${service.id}`);
    return deleteDoc(serviceDocRef);
  }
}
