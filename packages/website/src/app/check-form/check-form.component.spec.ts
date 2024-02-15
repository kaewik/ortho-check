import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as diff from 'diff';
import { delay, of } from 'rxjs';

import { CheckFormComponent } from './check-form.component';
import { TestingModule } from '../../testing/testing.module';
import { OrthographyServiceToken } from '../app.config';
import { AbstractOrthographyService } from '../../services/orthography.type';


describe('CheckFormComponent', () => {
  let component: CheckFormComponent;
  let fixture: ComponentFixture<CheckFormComponent>;
  let mockOrthographyService: jasmine.SpyObj<AbstractOrthographyService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CheckFormComponent, TestingModule ],
    })
    .compileComponents();

    mockOrthographyService = TestBed.inject<jasmine.SpyObj<AbstractOrthographyService>>(OrthographyServiceToken);
    fixture = TestBed.createComponent(CheckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the corrected text in a paragraph', async () => {
    const fakeText = 'This iS sme fakee text.';
    const fakeCorrectedText = 'This is some fake text.';
    const fakeDiffs = diff.diffChars(fakeText, fakeCorrectedText);
    const fakeCorrectionObservable = of({ diffs: fakeDiffs });
    mockOrthographyService.check.and.returnValue(fakeCorrectionObservable);

    const form = fixture.nativeElement.querySelector('form');
    component.form.setValue({ text: fakeText });
    form.dispatchEvent(new Event('submit'));

    await fixture.whenStable();
    fixture.detectChanges();
    const actualCorrection = fixture.nativeElement.querySelector('p').innerText;
    expect(actualCorrection).toEqual('This iSs some fakee text.');
  });

  it('should display the corrected text in a paragraph even if it takes some time', async () => {
    const fakeText = 'This iS sme fakee text.';
    const fakeCorrectedText = 'This is some fake text.';
    const fakeDiffs = diff.diffChars(fakeText, fakeCorrectedText);
    const fakeCorrectionObservable = of({ diffs: fakeDiffs }).pipe(delay(1_000));
    mockOrthographyService.check.and.returnValue(fakeCorrectionObservable);

    const form = fixture.nativeElement.querySelector('form');
    component.form.setValue({ text: fakeText });
    form.dispatchEvent(new Event('submit'));

    await fixture.whenStable();
    fixture.detectChanges();
    const actualCorrection = fixture.nativeElement.querySelector('p').innerText;
    expect(actualCorrection).toEqual('This iSs some fakee text.');
  });
});
