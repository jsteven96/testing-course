import { DebugElement, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('Javier', 'Perez', 25, 72, 1.7);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a name "Javier"', () => {
    expect(component.person.name).toEqual('Javier');
  });

  it('should have a p element with the text "Mi altura es {person.height}"', () => {
    // const personElement: HTMLElement = fixture.nativeElement;
    component.person = new Person('Javier', 'Perez', 25, 72, 1.7);
    const personDebug: DebugElement = fixture.debugElement;
    const parragraphDebug: DebugElement = personDebug.query(By.css('p'));
    const parragraphElement: HTMLElement = parragraphDebug.nativeElement;
    //const pElement = personElement.querySelector('p');
    fixture.detectChanges();
    expect(parragraphElement?.textContent).toEqual(
      `Mi altura es ${component.person.height}`
    );
  });

  it('should have a h3 element with "Hola, {person.name}"', () => {
    component.person = new Person('Javier', 'Perez', 25, 72, 1.7);
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    fixture.detectChanges();
    expect(h3Element?.textContent).toEqual(`Hola, ${component.person.name}`);
  });

  it('should display a text with IMC when is called calcIMC', () => {
    const expectedMsg = 'Normal';
    component.person = new Person('Javier', 'Perez', 25, 72, 1.7);
    const button: HTMLElement = fixture.debugElement.query(
      By.css('button.btn-imc')
    ).nativeElement;
    component.calcIMC();
    fixture.detectChanges();
    expect(button?.textContent).toContain(expectedMsg);
  });

  it('should display a text with IMC when is clicked the button', () => {
    const expectedMsg = 'Normal';
    component.person = new Person('Javier', 'Perez', 25, 72, 1.7);
    const buttonDe: DebugElement = fixture.debugElement.query(
      By.css('button.btn-imc')
    );
    const buttonEl: HTMLElement = buttonDe.nativeElement;
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(buttonEl?.textContent).toContain(expectedMsg);
  });

  it('shoud raise selected event when do click on choose', () => {
    component.person = new Person('Javier', 'Perez', 25, 72, 1.7);
    const buttonDe: DebugElement = fixture.debugElement.query(
      By.css('button.btn-choose')
    );
    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person: Person) => {
      selectedPerson = person;
    });
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(selectedPerson).toEqual(component.person);
  });
});

@Component({
  template:
    '<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>',
})
class HostComponent {
  person = new Person('Santiago', 'Molina', 12, 5, 1.4);
  selectedPerson: Person | undefined;
  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent],
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

  it('should display persons name', () => {
    const expectedName = component.person.name;
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = h3Debug.nativeElement;
    
    fixture.detectChanges();

    expect(h3Element.textContent).toContain(expectedName);
  });

  it('should raise selected event when clicked', () => {
    const buttonDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));    
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedPerson).toEqual(component.person);
  });
});
