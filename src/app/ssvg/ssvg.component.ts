import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const rect = `<svg width="100" height="100"><rect x="0" y="0" width="100" height="100"/></svg>`;

@Component({
  selector: 'ssvg',
  templateUrl: './ssvg.component.html',
  styleUrls: ['./ssvg.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SSVGComponent implements OnInit, AfterViewInit {
  @Input()
  public key: string;

  @Input()
  public active = false;

  @ViewChild('svgdiv', {
    read: ElementRef,
  })
  private svgdiv: ElementRef;

  constructor(private readonly sanitizer: DomSanitizer) {
    console.log('ctor');
  }

  public ngOnInit(): void {
    console.log('divinit', this.svgdiv);
  }

  public ngAfterViewInit(): void {
    console.log('divafter', this.svgdiv);

    getImage(this.key).then(html => this.svgdiv.nativeElement.outerHTML = html).catch(e => console.error('No pic',e))

    
  }

  /* NOT USED
  
  public svgContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(rect);
  }*/
}

async function getImage(key?: string): Promise<string> {
  if (key == null) {
    return rect;
  }
  if (key.endsWith('pic')) {
    return '<img src="echev.png" width="100" height="100" />';
  }
  return rect;
}
