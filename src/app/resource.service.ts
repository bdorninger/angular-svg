import { Injectable } from '@angular/core';

const rect = `<svg id="rect" width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="100" height="100"/></svg>`;

const editdark = `<svg id="editdark" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.46082 13.8117L16.316 2.95654L20.9298 7.57037L10.0746 18.4255L5.46082 13.8117ZM2.94385 20.9438L4.25469 15.0178L8.86849 19.6316L2.94385 20.9438Z" />
</svg>`;

const editlight = `<svg id="editlight" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
  private cache: Map<string, ImgUsage>;

  constructor() {
    this.cache = new Map();
  }

  public async getImage(key?: string): Promise<string> {
    if (key == null) {
      throw new Error(`No resource key specified`);
    }
    if (key.endsWith('pic')) {
      return '<img src="https://stackblitz.com/files/angular-ivy-rbyhxs/github/bdorninger/angular-svg/master/src/assets/parser.jpg" width="100" height="100" />';
    }

    if (this.cache.has(key)) {
      const usage = this.cache.get(key);
      usage.refCount++;
      return `<svg width="24" height="24" class="referencing-svg"><use href="#${key}"/></svg>`;
    }
    const svg = svgImages[key] ?? rect;
    if (svg !== undefined) {
      this.cache.set(key, {
        refCount: 0,
        img: svg,
      });
    }
    return svg;
  }

  private appendSvgHolder() {
    if (document.getElementById('images') === undefined) {
      const divElemImages = document.createElement(`HTMLDivElement`);
      const att = divElemImages.setAttribute('id', 'images');
      document.appendChild(divElemImages);
    }
  }
}
