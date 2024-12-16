import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  template: `
  <main class="focusBg">
    <header>
      <div class="focusBg focusTab checked" (click)="changeChecked(0)">Focus</div>
      <div class="pauseBg pauseTab" (click)="changeChecked(1)">Pause</div>
      <div class="longpauseBg longpauseTab" (click)="changeChecked(2)">Long Pause</div>
    </header>
    <app-home [checked]="checked"></app-home>
    <svg height="0" width="0">
      <defs>
        <clipPath id="svgPathRight">
        <path
          style="fill:#000000;fill-opacity:1"
          id="rect2"
          width="37.795277"
          height="37.795277"
          x="-0.25501627"
          y="-0.25501627"
          transform="matrix(0.26458333,0,0,0.26458333,0.06747305,0.06747305)"
          d="M -0.25501626,-0.25501626 V 37.54026 H 37.54026 c -20.873755,0 -37.79527626,-16.921522 -37.79527626,-37.79527626 z" />
        </clipPath>
        <clipPath id="svgPathLeft">
        <path
          style="fill:#000000;fill-opacity:1"
          id="rect2"
          width="37.795277"
          height="37.795277"
          x="-0.25501627"
          y="-0.25501627"
          transform="matrix(-0.26458333,0,0,0.26458333,9.932527,0.067473)"
          d="M -0.25501607,-0.25501607 C -0.25501607,20.618739 16.666505,37.54026 37.54026,37.54026 H -0.25501607 Z" />
        </clipPath>
      </defs>
    </svg>
  </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  checked: number;

  mapping = ['focusBg', 'pauseBg', 'longpauseBg'];

  constructor(){
    this.checked = 0;
  }

  ngAfterViewInit(){
    this.setCorners();
  }

  setCorners(){
    let header = document.getElementsByTagName('header')[0];
    var tabs = header.children;
    if(this.checked == 0){ //Focus is selected
      tabs[1].setAttribute("style", "border-radius: 0px 0px 0px 10px;");
      tabs[2].setAttribute("style", "border-radius: 0px 0px 0px 0px;");
    }
    else if(this.checked == 1){
      tabs[0].setAttribute("style", "border-radius: 0px 0px 10px 0px;");
      tabs[2].setAttribute("style", "border-radius: 0px 0px 0px 10px;");
    }
    else if(this.checked == 2){
      tabs[1].setAttribute("style", "border-radius: 0px 0px 10px 0px;");
      tabs[0].setAttribute("style", "border-radius: 0px 0px 0px 0px;");
    }
  }

  changeChecked(id: number){
    this.checked=id;
    this.setCorners();
    
    let main = document.getElementsByTagName('main')[0];
    main.classList.remove('focusBg');
    main.classList.remove('pauseBg');
    main.classList.remove('longpauseBg');
    main.classList.add(this.mapping[id]);
  }

}
