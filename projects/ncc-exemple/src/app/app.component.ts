import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ncc-tester';
  private teste: string;

  submitTest() {
    console.log('submit');
  }
}
