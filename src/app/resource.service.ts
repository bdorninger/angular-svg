import { Injectable, Optional } from '@angular/core';

const rect = `<svg id="rect" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="100%" height="100%"/></svg>`;

const editdark = `<svg id="editdark" class="inner-svg" width="100%" preserveAspectRatio="xMidYMid" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.46082 13.8117L16.316 2.95654L20.9298 7.57037L10.0746 18.4255L5.46082 13.8117ZM2.94385 20.9438L4.25469 15.0178L8.86849 19.6316L2.94385 20.9438Z" />
</svg>`;

const editlight = `<svg id="editlight" class="inner-svg" width="100%" preserveAspectRatio="xMidYMid" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.46082 13.8117L16.316 2.95654L20.9298 7.57037L10.0746 18.4255L5.46082 13.8117ZM2.94385 20.9438L4.25469 15.0178L8.86849 19.6316L2.94385 20.9438Z" />
</svg>`;

const svgImages = {
  rect: rect,
  editdark: editdark,
  editlight: editlight,
};

export interface ImgUsage {
  refCount: number;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private cache?: Map<string, ImgUsage>;

  private cacheRoot?: HTMLElement;

  constructor() {
    this.cache = new Map();
  }

  public async getImage(key?: string): Promise<string | undefined> {
    if (!this.appendSvgCacheElement()) {
      throw new Error(`No cache elem`);
    }

    if (key == null) {
      throw new Error(`No resource key specified`);
    }
    if (key.endsWith('jpg')) {
      return '<img src="https://stackblitz.com/files/angular-ivy-rbyhxs/github/bdorninger/angular-svg/master/src/assets/parser.jpg" width="100%" height="100%" />';
    }

    if (this.cache.has(key)) {
      const usage = this.cache.get(key);
      usage.refCount++;
      return `<svg width="100%" height="100%" class="wrap-svg"><use href="#${key}"/></svg>`;
    }

    const svg = await this.loadImage(key);
    if (svg != null) {
      this.cacheImage(key, svg);
      return `<svg width="100%" height="100%" class="wrap-svg"><use href="#${key}"/></svg>`;
    }

    return svg;
  }

  public cacheImage(key: string, svg: string) {
    this.cache.set(key, {
      refCount: 0,
      img: svg,
    });
    this.appendSvgToChacheElem(key, svg);
  }

  private async loadImage(key?: string): Promise<string | undefined> {
    const svg: string | undefined = svgImages[key];

    if (svg !== undefined) {
      this.cache.set(key, {
        refCount: 0,
        img: svg,
      });
      this.appendSvgToChacheElem(key, svg);
    }
    return Promise.resolve(svg);
  }

  private elemCacheHasImage(key: string): boolean {
    const list = this.cacheRoot.getElementsByTagName('svg');
    for (let i = 0; i < list.length; i++) {
      if (list.item(i).getAttribute('id') === key) {
        return true;
      }
    }
    return false;
  }

  private appendSvgToChacheElem(
    key: string,
    svg: string
  ): HTMLElement | undefined {
    if (this.hasCacheRoot() && !this.elemCacheHasImage(key)) {
      const svgElem = document.createElement('svg');
      const el = this.cacheRoot?.appendChild(svgElem);
      svgElem.outerHTML = svg;
      return svgElem;
    }
    return undefined;
  }

  private hasCacheRoot(): boolean {
    return document.getElementById('images-cache') != null;
  }

  private appendSvgCacheElement(): boolean {
    if (!this.hasCacheRoot()) {
      const divElemImages = document.createElement(`div`);
      divElemImages.hidden = true;
      divElemImages.id = 'images-cache';
      document.getElementsByTagName('body')[0].appendChild(divElemImages);
      this.cacheRoot = divElemImages;
      console.log('Created cache elem', this.cacheRoot);
    }
    return this.hasCacheRoot();
  }
}
