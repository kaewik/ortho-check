import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AbstractOrthographyService } from '../../services/orthography.type';
import { CorrectionResult } from '../../services/correction-result.type';
import { OrthographyServiceToken } from '../app.config';

@Component({
  selector: 'app-check-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './check-form.component.html',
  styleUrl: './check-form.component.css'
})
export class CheckFormComponent {
  public form = this.formBuilder.group({
    text: ''
  });

  public correction = '';

  public constructor(
    private formBuilder: FormBuilder,
    @Inject(OrthographyServiceToken) private orthographyService: AbstractOrthographyService,
  ) {}

  public checkOrthography(): void {
    const formData = this.form.value;
    const formText = formData.text;
    if (formText) {
      this.orthographyService.check(formText).subscribe((correctionResult: CorrectionResult) => {
        correctionResult.diffs.forEach(char => this.correction += char.value);
      });
    }
  }
}
