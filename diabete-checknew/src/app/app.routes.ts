import { Routes } from '@angular/router';
import { PredictionComponent } from './prediction/prediction.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'prediction' },
  { path: 'prediction', component: PredictionComponent },
];
