import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { diffChars } from 'diff';
import { map } from 'rxjs';

import { AbstractOrthographyService } from '../../services/orthography.type';
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
      this.orthographyService.check(formText).subscribe((promptResults) => {
        console.dir(promptResults);
        const correctText = Array.from(formText).flatMap((character, index) => {
          const [matchingResult] = promptResults.filter(result => result.startPos === index + 1);
          if (promptResults.some(result => result.startPos < index + 1 && index + 1 <= result.endPos)) {
            return '';
          }
          return matchingResult ? matchingResult.outputSequence : character;
        }).join('');
        console.log(correctText);
        console.log(formText);
        const diffs = diffChars(formText, correctText);
        this.correction = diffs.map(char => {
          if (char.added) {
            return '<font color="green">' + char.value + '</font>';
          } else if (char.removed) {
            return '<font color="red">' + char.value + '</font>';
          } else {
            return '<font color="grey">' + char.value + '</font>';
          }
        }).join('');
      });
    }
  }
}
