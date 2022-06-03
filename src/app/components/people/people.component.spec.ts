import { PersonComponent } from './../person/person.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { Person } from 'src/app/models/person.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of app-person components', () => {
    component.people = [
      new Person('Javier', 'Perez', 25, 72, 1.7),
      new Person('Daniela', 'Perez', 17, 65, 1.6),
      new Person('Yuri', 'Acosta', 17, 67, 1.6),
    ];
    fixture.detectChanges();
    const debugEl: DebugElement[] = fixture.debugElement.queryAll(By.css('app-person'));
    expect(debugEl.length).toEqual(3);

  });

  it('should display selected person info when one of the list is clicked', () => {
    component.people = [
      new Person('Javier', 'Perez', 25, 72, 1.7),
      new Person('Daniela', 'Perez', 17, 65, 1.6),
      new Person('Yuri', 'Acosta', 17, 67, 1.6),
    ];
    fixture.detectChanges();
    const debugEl: DebugElement[] = fixture.debugElement.queryAll(By.css('app-person .btn-choose'));
    debugEl[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedPerson).toEqual(new Person('Javier', 'Perez', 25, 72, 1.7));

  });
});
