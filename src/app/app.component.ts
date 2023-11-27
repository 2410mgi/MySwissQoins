import { Component, OnInit, Renderer2 } from '@angular/core';
import { SwissqoinsService } from './services/swissqoins.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MySwissqoins';

  constructor() {
  }

  ngOnInit(): void {
  }
}
