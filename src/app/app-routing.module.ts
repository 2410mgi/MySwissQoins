import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwissqoinListComponent } from './swissqoins/swissqoin-list/swissqoin-list.component';
import { SwissqoinFormComponent } from './swissqoins/swissqoin-form/swissqoin-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'swissqoins', pathMatch: 'full' },
  { path: 'swissqoins', component: SwissqoinListComponent },
  { path: 'swissqoin/create', component: SwissqoinFormComponent },
  { path: '**', redirectTo: 'swissqoin/create', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
