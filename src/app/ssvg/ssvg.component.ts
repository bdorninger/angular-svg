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
import { ResourceService } from '../resource.service';

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

  constructor(
    private readonly resourceService: ResourceService,
    private readonly sanitizer: DomSanitizer
  ) {
    //console.log('ctor');
  }

  public ngOnInit(): void {
    //console.log('divinit', this.svgdiv);
  }

  public ngAfterViewInit(): void {
    //console.log('divafter', this.svgdiv);

    this.resourceService
      .getImage(this.key)
      .then((html) => {
        console.log('got pic', html);
        this.svgdiv.nativeElement.outerHTML = html;
      })
      .catch((e) => console.error('No pic', e));
  }

  /* NOT USED
  
  public svgContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(rect);
  }*/
}
