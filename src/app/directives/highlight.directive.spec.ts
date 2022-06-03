import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './highlight.directive';
import { DebugElement, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

fdescribe('HighlightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [HostComponent, HighlightDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have more than one element with the directive hightlight', () => {
    const elements: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    );
    expect(elements.length).toBeGreaterThan(2);
  });

  it('should have two elements without the directive hightlight', () => {
    const elements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('*:not([highlight])')
    );
    expect(elements.length).toEqual(2);
  });

  it('should the elements with the highlight match the background', () => {
    const elements: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    );
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('tomato');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('gray');
  });

  it('the element h5 title should have the defaultColor', () => {
    const titleDeb: DebugElement = fixture.debugElement.query(By.css('.title'));
    const directiveInstance = titleDeb.injector.get(HighlightDirective);
    expect(titleDeb.nativeElement.style.backgroundColor).toEqual(
      directiveInstance.defaultColor
    );
  });

  it('should bind <input> and change the bgColor', () => {
    const inputDebug: DebugElement = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = inputDebug.nativeElement;
    expect(inputElement.style.backgroundColor).toEqual('pink');

    inputElement.value = 'red';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputElement.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  });
});

@Component({
  template: ` <h5 class="title" highlight>Default</h5>
    <h5 highlight="tomato">tomato</h5>
    <p highlight>Parrafo</p>
    <p>Otro parrafo</p>
    <input [(ngModel)]="color" [highlight]="color">`,
})
class HostComponent {
  color = 'pink';
}
