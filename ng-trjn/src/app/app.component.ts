import 'rxjs/add/operator/filter';

import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  previousUrl: string;

  constructor(private router: Router) {
    router.events.filter(event => event instanceof NavigationEnd)
                 .subscribe(e => {
                   if ('url' in e) this.previousUrl = e.url
                 })
  }
}
