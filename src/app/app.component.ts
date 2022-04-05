import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  strokeColors = ['#ff00ff', '#00ff00', '#ffffff'];
  ind = 0;

  strokewidth = 10;
  strokeStyle = 'fill:#d2a3ff;stroke:#3983ac';
  cstyle = 'cx:50;cy:50;r:50;fill:#dfac20;stroke:#3983ab;stroke-width:2';

  public currentStrokeColor = '#000000';
  public currentFillColor = '#ffffff';

  public switchColor() {
    this.ind++;
    if (this.ind >= this.strokeColors.length) {
      this.ind = 0;
    }
    this.currentStrokeColor = this.strokeColors[this.ind];
    this.currentFillColor =
      this.strokeColors[(this.ind + 1) % this.strokeColors.length];
  }
}
