import { Person } from './../../models/person.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  // @Input() person: Person = new Person('', '', 0, 0, 0);
  @Input() person!: Person;
  imc = '';
  @Output() onSelected = new EventEmitter<Person>();

  constructor() { }

  ngOnInit(): void {
  }

  calcIMC() {
    this.imc = this.person.calcIMC();
  }

  onClick() {
    this.onSelected.emit(this.person);
  }

}
