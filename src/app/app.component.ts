import { Component, OnInit } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-testing-services';

  ngOnInit(): void {
    const calc = new Calculator();
    const rta = calc.multiply(1, 2);
    console.log(rta === 2);
    const rta2 = calc.divide(2, 0);
    console.log(rta2 === null);
  }
}
