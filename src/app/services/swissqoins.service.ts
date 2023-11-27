
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Swissqoin } from '../model/swissqoin';
import { getFirestore, collection, query, where, FirestoreDataConverter, QueryDocumentSnapshot, orderBy, DocumentData, Query, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYTIyaiNgj65AZ6f3zSiqTS-WLApnUdQQ",
  authDomain: "myswissqoins.firebaseapp.com",
  projectId: "myswissqoins",
  storageBucket: "myswissqoins.appspot.com",
  messagingSenderId: "737539194342",
  appId: "1:737539194342:web:5223b0b932e07cabfd2a27"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const converter: FirestoreDataConverter<Swissqoin> = {
  toFirestore: (data: Swissqoin) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Swissqoin
}

@Injectable({
  providedIn: 'root'
})
export class SwissqoinsService {

  constructor() { }

  async save(swissqoin: Swissqoin) {
    await addDoc(collection(db, "swissqoins"), swissqoin);
  }

  getAll() {
    return query(collection(db, "swissqoins"), orderBy("date", "desc")).withConverter(converter);
  }

  findByNumOfSwissQ(numOfSwissQ: number): Query<DocumentData> {
    return query(collection(db, "swissqoins"), where("numOfSwissQ", "==", numOfSwissQ)).withConverter(converter);
  }
}

