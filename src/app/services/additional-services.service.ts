import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AdditionalService } from '../models/additional-service.interface';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServicesService {

  constructor(private firestore: Firestore) {}

  addService(service: AdditionalService) {
    const docRef = doc(this.firestore, `additional-services/${service.id}`);
    return setDoc(docRef, service);
  }

  getServices(): Observable<AdditionalService[]> {
    const collectionRef = collection(this.firestore, 'additional-services');
    return collectionData(collectionRef, { idField: 'id' }) as Observable<AdditionalService[]>;
  }

  deleteService(service: AdditionalService) {
    const docRef = doc(this.firestore, `additional-services/${service.id}`);
    return deleteDoc(docRef);
  }
}
