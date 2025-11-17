import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService, PredictPayload } from '../core/services/api.service';
import { TPipe } from '../core/pipes/t.pipe';
import { TranslationService, Lang } from '../core/services/translation.service';

interface UiState {
  loading: boolean;
  type: 'idle' | 'error' | 'diabetic' | 'normal';
  message?: string;
}

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TPipe],
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  i18n = inject(TranslationService);

  user = signal<{ username: string } | null>(this.readUser());
  showResult = false;

  form = this.fb.group({
    gender: this.fb.nonNullable.control<number | null>(null, { validators: [Validators.required]}),
    age: this.fb.nonNullable.control<number | null>(null, { validators: [Validators.required, Validators.min(0), Validators.max(120)]}),
    hypertension: this.fb.nonNullable.control<number | null>(null, { validators: [Validators.required]}),
    heart_disease: this.fb.nonNullable.control<number | null>(null, { validators: [Validators.required]}),
    smoking_history: this.fb.nonNullable.control<number | null>(null, { validators: [Validators.required]}),
    bmi: this.fb.nonNullable.control<number | null>(null, { validators: [Validators.required, Validators.min(0)]}),
    HbA1c_level: this.fb.nonNullable.control<number | null>(null, { validators: [Validators.required, Validators.min(0)]}),
    blood_glucose_level: this.fb.nonNullable.control<number | null>(null, { validators: [Validators.required, Validators.min(0)]}),
  });

  ui = signal<UiState>({ loading: false, type: 'idle' });
  lastResultType = signal<'diabetic' | 'normal' | null>(null);

  constructor() {
    effect(() => {
      this.i18n.currentLang();
    });
  }

  get isLoggedIn(): boolean {
    return !!this.user();
  }

  onChangeLang(lang: Lang) {
    this.i18n.setLang(lang);
  }

  onLoginClick() {
    if (this.isLoggedIn) {
      if (confirm(this.i18n.t('confirm_logout', 'Voulez-vous vous déconnecter ?'))) {
        sessionStorage.removeItem('user');
        this.user.set(null);
      }
      return;
    }
    alert('Démo: implémentez la page de connexion si nécessaire.');
  }

  private readUser() {
    try {
      const raw = sessionStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.ui.set({ loading: true, type: 'idle' });
    const payload = this.form.getRawValue() as PredictPayload;
    

    try {
      this.showResult = true;
      const res = await this.api.predict(payload);
      let prediction_result = 0;
      let probability = 0;
      this.showResult = true;

      if (res?.prediction !== undefined && res?.prediction !== null) {
        const pred = String(res.prediction).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        console.log('la prediction est ');
        console.log(pred);
        prediction_result = (pred === '1' || pred === 'diabetique') ? 1 : 0;
      }
      if ((res as any).probability !== undefined) {
        probability = Number((res as any).probability) || 0;
      }
      try {
        await this.api.save({ ...payload, prediction_result, prediction_probability: probability });
      } catch (e) {
        console.warn('Save error:', e);
      }
      console.log('la sauvegarde est faite')
      this.lastResultType.set(prediction_result === 1 ? 'diabetic' : 'normal');
      this.ui.set({ loading: false, type: prediction_result === 1 ? 'diabetic' : 'normal' });
      console.log('super ca fonctionne')
    } catch (err: any) {
      this.ui.set({ loading: false, type: 'error', message: err?.error?.error || 'API error' });
    }
  }
}
