import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      imports: [CheckFormComponent, TestingModule],
    }).compileComponents();

    mockOrthographyService = TestBed.inject<
      jasmine.SpyObj<AbstractOrthographyService>
    >(OrthographyServiceToken);
    fixture = TestBed.createComponent(CheckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the corrected text in a paragraph', async () => {
    const fakeText = 'This iS sme fakee text.';
    const fakeCorrectionObservable = of([
      {
        startPos: 6,
        endPos: 7,
        outputSequence: 'is',
      },
      {
        startPos: 9,
        endPos: 11,
        outputSequence: 'some',
      },
      {
        startPos: 13,
        endPos: 17,
        outputSequence: 'fake',
      },
    ]);
    mockOrthographyService.check.and.returnValue(fakeCorrectionObservable);

    const form = fixture.nativeElement.querySelector('form');
    component.form.setValue({ text: fakeText });
    form.dispatchEvent(new Event('submit'));

    await fixture.whenStable();
    fixture.detectChanges();
    const actualCorrection = fixture.nativeElement.querySelector('p').innerHTML;
    expect(actualCorrection).toEqual(
      '<font color="grey">This i</font><font color="red">S</font><font color="green">s</font><font color="grey"> s</font><font color="green">o</font><font color="grey">me fake</font><font color="red">e</font><font color="grey"> text.</font>',
    );
  });

  it('should display the corrected text in a paragraph even if it takes some time', async () => {
    const fakeText = 'This iS sme fakee text.';
    const fakeCorrectionObservable = of([
      {
        startPos: 6,
        endPos: 7,
        outputSequence: 'is',
      },
      {
        startPos: 9,
        endPos: 11,
        outputSequence: 'some',
      },
      {
        startPos: 13,
        endPos: 17,
        outputSequence: 'fake',
      },
    ]).pipe(delay(10_000));
    mockOrthographyService.check.and.returnValue(fakeCorrectionObservable);

    const form = fixture.nativeElement.querySelector('form');
    component.form.setValue({ text: fakeText });
    form.dispatchEvent(new Event('submit'));

    await fixture.whenStable();
    fixture.detectChanges();
    const actualCorrection = fixture.nativeElement.querySelector('p').innerHTML;
    expect(actualCorrection).toEqual(
      '<font color="grey">This i</font><font color="red">S</font><font color="green">s</font><font color="grey"> s</font><font color="green">o</font><font color="grey">me fake</font><font color="red">e</font><font color="grey"> text.</font>',
    );
  }, 15_000);
});
