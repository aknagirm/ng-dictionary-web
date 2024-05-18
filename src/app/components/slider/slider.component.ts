import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  currentTheme = 'dark';
  darkThemeEl: HTMLLinkElement | undefined;
  lightThemeEl: HTMLLinkElement | undefined;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    /* const linkEl = document.getElementsByTagName('link');
    for (const el of Array.from(linkEl)) {
      if (el.href.includes('_lightTheme')) {
        this.lightThemeEl = el;
      } else if (el.href.includes('_darkTheme')) {
        this.darkThemeEl = el;
      }
    }
    this.changeTheme(); */
  }

  changeTheme() {
    if (this.currentTheme === 'dark') {
      this.currentTheme = 'light';
      this.renderer.removeAttribute(this.lightThemeEl, 'disabled');
      this.renderer.setAttribute(this.darkThemeEl, 'disabled', 'true');
    } else {
      this.currentTheme = 'dark';
      this.renderer.removeAttribute(this.darkThemeEl, 'disabled');
      this.renderer.setAttribute(this.lightThemeEl, 'disabled', 'true');
    }
  }
}
