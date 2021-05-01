import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }
  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.addJsToElement('../../../assets/js/script.js').onload = (teste) => {};
  }
}
