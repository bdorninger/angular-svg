import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'esvg',
  templateUrl: './esvg.component.html',
  styleUrls: ['./esvg.component.css'],
})
export class ESVGComponent implements OnInit {
  constructor(private readonly sanitizer: DomSanitizer) {}

  @Input()
  public stroke?: string; // = '#ff83ac';

  ngOnInit() {}

  svgContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(`<svg width="100" height="100">
    <circle id='esvgcircle'
      style="stroke:${this.stroke ? this.stroke : '#3983ac'}"      
      id="circle1"
      cx="50"
      cy="50"
      r="50"      
    />
  </svg>`);
  }
  // stroke-width="5"
  elems(): string {
    return `<p>foo</p>`;
  }
}
