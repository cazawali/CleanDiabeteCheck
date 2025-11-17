import { Pipe, PipeTransform } from '@angular/core';
import { inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({ name: 't', standalone: true, pure: false })
export class TPipe implements PipeTransform {
  private i18n = inject(TranslationService);
  transform(key: string, fallback = ''): string {
    return this.i18n.t(key, fallback);
  }
}
