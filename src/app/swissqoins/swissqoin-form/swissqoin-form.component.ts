import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Swissqoin } from 'src/app/model/swissqoin';
import { SwissqoinsService } from 'src/app/services/swissqoins.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import LOCALE_ID from '@angular/common/locales/fr-CH';
import { registerLocaleData } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

registerLocaleData(LOCALE_ID);

@Component({
  selector: 'app-swissqoin-form',
  templateUrl: './swissqoin-form.component.html',
  styleUrls: ['./swissqoin-form.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-CH' },]
})
export class SwissqoinFormComponent implements OnInit {

  swissqoinCreationForm!: FormGroup;
  swissqoin!: Swissqoin;

  constructor(private swissQoinService: SwissqoinsService, private snackBar: MatSnackBar,
    private adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private locale: string,) { }

  ngOnInit(): void {
    this.adapter.setLocale(this.locale);
    this.swissqoinCreationForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      numOfSwissQ: new FormControl('', [Validators.required]),
      montant: new FormControl('', [Validators.required]),
      rendement: new FormControl('', [Validators.required]),
      benefice: new FormControl('', [Validators.required]),
    });
  }

  onClearForm() {
    this.swissqoinCreationForm.reset();
  }

  onSubmitForm() {
    if (this.swissqoinCreationForm.valid) {

      console.log(this.swissqoinCreationForm.value);
      this.swissqoin = {
        date: this.swissqoinCreationForm.value.date,
        benefice: +this.swissqoinCreationForm.value.benefice,
        rendement: +this.swissqoinCreationForm.value.rendement,
        montant: +this.swissqoinCreationForm.value.montant,
        numOfSwissQ: +this.swissqoinCreationForm.value.numOfSwissQ,
      }

      console.table(this.swissqoin);

      this.swissQoinService.save(this.swissqoin).then(() => {
        this.snackBar.open("L'enregistrement correctement effectué", "CREATION SWISSQOINS", {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      }).catch((error) => {
        console.log("Echec lors de l'enregistrement", error);
      });
    }
  }
  
  get date() { return this.swissqoinCreationForm.get('date'); }
  get benefice() { return this.swissqoinCreationForm.get('benefice'); }
  get rendement() { return this.swissqoinCreationForm.get('rendement'); }
  get montant() { return this.swissqoinCreationForm.get('montant'); }
  get numOfSwissQ() { return this.swissqoinCreationForm.get('numOfSwissQ'); }
}
