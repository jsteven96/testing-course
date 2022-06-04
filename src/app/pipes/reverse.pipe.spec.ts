import { ReversePipe } from './reverse.pipe';
import { DebugElement, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should reverse the word that I put', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });
});

@Component({
  template: `<h5>{{ 'texto' | reverse }}</h5>
    <input [(ngModel)]="text" />
    <p>{{ text | reverse }}</p>`,
})
class HostComponent {
  text = '';
}

describe('ReversePipe using a hostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HostComponent, ReversePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the content text in a reverse mode', () => {
    const debugH5: DebugElement = fixture.debugElement.query(By.css('h5'));
    expect(debugH5.nativeElement.textContent).toEqual('otxet');
  });

  it('should apply reverse pipe when typing in the input', () => {
    const debugInput: DebugElement = fixture.debugElement.query(
      By.css('input')
    );
    const nativeInput: HTMLInputElement = debugInput.nativeElement;
    const debugP: DebugElement = fixture.debugElement.query(By.css('p'));
    expect(debugP.nativeElement.textContent).toEqual('');
    nativeInput.value = 'ANA 2';
    nativeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(debugP.nativeElement.textContent).toEqual('2 ANA');
  });
});
