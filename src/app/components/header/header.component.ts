import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private rendere: Renderer2) {}

  ngOnInit(): void {}

  fontChange(event: Event) {
    const fontSelected = (event.target! as HTMLSelectElement).value;
    this.rendere.setStyle(document.body, 'font-family', fontSelected);
  }
}
