import 'rxjs/add/operator/filter';

import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { routerTransition } from './routing.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [routerTransition]
})
export class AppComponent {
  previousUrl: string;

  constructor(private router: Router) {
    router.events.filter(event => event instanceof NavigationEnd)
                 .subscribe((e:NavigationEnd) => this.previousUrl = e.url)
  }

  getRouteState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
