import { Timestamp } from "firebase/firestore"

export class Swissqoin {

  benefice!: number;
  date!: Timestamp;
  montant!: number;
  numOfSwissQ!: number;
  rendement!: number;

  constructor(benefice: number, date: Timestamp, montant: number, numOfSwissQ: number, rendement: number) {
    this.benefice = benefice;
    this.date = date;
    this.montant = montant;
    this.numOfSwissQ = numOfSwissQ;
    this.rendement = rendement;
  }
}
