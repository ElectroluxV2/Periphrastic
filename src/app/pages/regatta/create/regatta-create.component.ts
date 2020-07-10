import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-regatta-create',
  templateUrl: './regatta-create.component.html',
  styleUrls: ['./regatta-create.component.scss']
})
export class RegattaCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
