import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface PredictPayload {
  gender: number;
  age: number;
  hypertension: number;
  heart_disease: number;
  smoking_history: number;
  bmi: number;
  HbA1c_level: number;
  blood_glucose_level: number;
}

export interface PredictResponse {
  prediction: string | number;
  probability?: number | string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:5000';

  async predict(data: PredictPayload): Promise<PredictResponse> {
    return await firstValueFrom(this.http.post<PredictResponse>(`${this.baseUrl}/predict`, data));
  }

  async save(
    data: PredictPayload & {
      prediction_result: number;
      prediction_probability: number;
      username?: string | null;
    }
  ): Promise<any> {

    const payload = {
      Gender: data.gender,
      Age: data.age,
      Hypertension: data.hypertension,
      HeartDisease: data.heart_disease,
      SmokingHistory: data.smoking_history,
      Bmi: data.bmi,
      HbA1cLevel: data.HbA1c_level,
      BloodGlucoseLevel: data.blood_glucose_level,
      IsDiabetic: data.prediction_result === 1,
      Probability: data.prediction_probability,
      Username: data.username ?? null
    };

    return await firstValueFrom(
      this.http.post(`http://localhost:5187/api/predictions`, payload)
    );
  }
}
