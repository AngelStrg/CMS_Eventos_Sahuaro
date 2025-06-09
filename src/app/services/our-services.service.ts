import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { OurService } from '../models/our-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OurServicesService {
  constructor(private firestore: Firestore) {}

  addService(service: OurService) {
    const serviceRef = collection(this.firestore, 'our-services');
    return addDoc(serviceRef, service);
  }

  getServices(): Observable<OurService[]> {
    const serviceRef = collection(this.firestore, 'our-services');
    return collectionData(serviceRef, { idField: 'id' }) as Observable<OurService[]>;
  }

  deleteService(service: OurService) {
    const serviceDocRef = doc(this.firestore, `our-services/${service.id}`);
    return deleteDoc(serviceDocRef);
  }
}
