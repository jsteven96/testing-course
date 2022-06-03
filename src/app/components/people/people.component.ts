import { Person } from './../../models/person.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  person: Person = new Person('Javier', 'Perez', 25, 72, 1.7);
  people: Person[] = [
    new Person('Javier', 'Perez', 25, 72, 1.7),
    new Person('Daniela', 'Perez', 17, 65, 1.6),
  ];
  selectedPerson: Person | null = null;
  constructor() {}

  ngOnInit(): void {}

  choosed(person: Person) {
    this.selectedPerson = person;
  }
}
