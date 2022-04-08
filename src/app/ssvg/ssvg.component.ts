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

const editdark = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.46082 13.8117L16.316 2.95654L20.9298 7.57037L10.0746 18.4255L5.46082 13.8117ZM2.94385 20.9438L4.25469 15.0178L8.86849 19.6316L2.94385 20.9438Z" />
</svg>`;

const editlight = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.46082 13.8117L16.316 2.95654L20.9298 7.57037L10.0746 18.4255L5.46082 13.8117ZM2.94385 20.9438L4.25469 15.0178L8.86849 19.6316L2.94385 20.9438Z" />
</svg>`;

const svgImages = {
  rect: rect,
  editdark: editdark,
  editlight: editlight,
};

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

    getImage(this.key)
      .then((html) => (this.svgdiv.nativeElement.outerHTML = html))
      .catch((e) => console.error('No pic', e));
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
    return '<img src="https://stackblitz.com/files/angular-ivy-rbyhxs/github/bdorninger/angular-svg/master/src/assets/parser.jpg" width="100" height="100" />';
  }
  return svgImages[key] ?? rect;
}
