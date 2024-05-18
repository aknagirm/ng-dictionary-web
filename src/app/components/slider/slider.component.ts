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
    this.changeTheme();
  }

  changeTheme() {
    const el = document.getElementById('theme-css');
    if (el) {
      this.renderer.removeChild(document.head, el);
    }
    let stylesheetElement = this.renderer.createElement('link');
    stylesheetElement.rel = 'stylesheet';
    stylesheetElement.id = 'theme-css';
    if (this.currentTheme === 'dark') {
      this.currentTheme = 'light';
      stylesheetElement.href = 'assets/css/lightTheme.css';
    } else {
      this.currentTheme = 'dark';
      stylesheetElement.href = 'assets/css/darkTheme.css';
    }
    this.renderer.appendChild(document.head, stylesheetElement);
  }
}
