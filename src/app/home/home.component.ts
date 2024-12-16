import { Component, Input } from '@angular/core';
import { TimerComponent } from "../timer/timer.component";
import { YoutubePlayerComponent } from "../youtube-player/youtube-player.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TimerComponent, YoutubePlayerComponent],
  template: `
    <app-timer 
    [title]="this.modes[this.checked].title"
    [description]="this.modes[this.checked].description"
    [time]="this.modes[this.checked].time"
    [minutes]="this.modes[this.checked].minutes"
    ></app-timer>
    <app-youtube-player></app-youtube-player>
  `,
  host: { 'class': 'home' },
  styleUrl: './home.component.css'
})
export class HomeComponent {
 @Input() checked = 0;

 modes = [{
      title: 'Focus',
      description: 'Focus on your task of choice',
      time: '25:00',
      minutes: 25
    },
    {
      title: 'Pause',
      description: 'Take a break',
      time: '5:00',
      minutes: 5
    },
    {
      title: 'Long Pause',
      description: 'Take a longer break',
      time: '15:00',
      minutes: 15
    }]

 constructor() {
  
 }
}
