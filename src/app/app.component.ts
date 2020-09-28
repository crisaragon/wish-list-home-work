import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-wishlist';
  public time = new Observable(observer => {
    setInterval(() => {
      observer.next(new Date().toString())
    } ,1000)
  })
}
