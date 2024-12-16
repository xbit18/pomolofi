import { Component, Input } from '@angular/core';
import * as Easytimer from 'easytimer.js'
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  template: `
    <section class="timer">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <div id="timerValues">{{ getTime() }}</div>
      <section class="timerButtons">
          <button class="start" (click)="this.startTimer()">Start</button>
          <button class="pause" (click)="this.pauseTimer()">Pause</button>
          <button class="stop" (click)="this.stopTimer()">Stop</button>
          <button class="reset" (click)="this.resetTimer()">Reset</button>
      </section>
    </section>
  `,
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() time = '';
  @Input() minutes: number = 0;

  activeTimer = '';
  timer = new Easytimer.Timer();
  constructor() {
    this.timer.addEventListener('secondsUpdated', () => {
      if(this.activeTimer == this.title){
        this.time = this.timer.getTimeValues().toString(['minutes', 'seconds']);
      }
      console.log(this.timer.getTimeValues().toString());
    });
  }

  ngOnChanges(){
    if(this.activeTimer != ''){
      this.time == this.timer.getTimeValues().toString(['minutes', 'seconds']);
    }
  }

  startTimer(){
    // Se il timer è già attivo
    if(this.activeTimer != ''){
        // Se il timer attivo è lo stesso di quello che si sta cercando di attivare
        if(this.activeTimer == this.title){
            return;
        } else {
          this.timer.start({
            precision: 'seconds', 
            startValues: {minutes: this.minutes}, 
            target: {seconds: 0},
            countdown: true
          });

          this.activeTimer = this.title
        }
    } else {
      this.timer.start({
        precision: 'seconds', 
        startValues: {minutes: this.minutes}, 
        target: {seconds: 0},
        countdown: true
      });

      this.activeTimer = this.title
    }
  }

  stopTimer(){
    this.timer.stop();
  }

  pauseTimer(){
    this.timer.pause();
  }

  resetTimer(){
    this.timer.reset();
  }

  getTime(){
    if(this.activeTimer != '' && this.activeTimer == this.title){
      return this.timer.getTimeValues().toString(['minutes', 'seconds']);
    } else {
      return this.time;
    }
  }
}
