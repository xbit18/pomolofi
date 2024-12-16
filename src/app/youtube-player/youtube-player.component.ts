import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {YouTubePlayer, YOUTUBE_PLAYER_CONFIG} from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-youtube-player',
  standalone: true,
  providers: [{
    provide: YOUTUBE_PLAYER_CONFIG,
    useValue: {
      disablePlaceholder: true,
    }
  }],
  imports: [YouTubePlayer, FontAwesomeModule],
  template: `
    <youtube-player #youtubePlayer [playerVars]="playerVars" [videoId]="this.videoId"/>
    <div class="setNewVideo">
    <input type="text" #youtubeLink placeholder="Tired of Lofi? Paste the Youtube URL here">
      <div class="youtubeSubmit">
        <!-- <img class="spinner" /> -->
        <span #youtubeButton class="btn-text" (click)="loadNewVideo()">Load Video</span>
        <div #spinLogo class="hiddenSpinner">
          <fa-icon [icon]="faCircleNotch" animation="spin"></fa-icon>
        </div>
      </div>
    </div>
  `,
  styleUrl: './youtube-player.component.css'
})
export class YoutubePlayerComponent implements AfterViewInit {
  @ViewChild('youtubePlayer') youtubePlayer!: YouTubePlayer;
  @ViewChild('youtubeLink') youtubeLink!: ElementRef;
  @ViewChild('youtubeButton') youtubeButton!: ElementRef;
  @ViewChild('spinLogo') spinLogo!: ElementRef;
  
  videoId = "jfKfPfyJRdk";
  faCircleNotch = faCircleNotch;
  
  playerVars = {
    autoplay: 1,
  }

  ngAfterViewInit() {
    this.youtubePlayer.mute();
  }

  loadNewVideo() {
    const videoId = this.youtubeLink.nativeElement.value.split('v=')[1];
      //console.log(this.spinLogo.nativeElement.classList);
    this.spinLogo.nativeElement.classList.replace("hiddenSpinner", "spinner");
    this.youtubeButton.nativeElement.innerHTML = 'Loading';
    setTimeout(() => 
      {
        if (videoId == "" || videoId == undefined) {
          this.videoId = "jfKfPfyJRdk";
        } else {
          this.videoId = videoId;
        }
        this.spinLogo.nativeElement.classList.replace("spinner", "hiddenSpinner");
        this.youtubeButton.nativeElement.innerHTML = 'Done!';
      },
      1500);

    setTimeout(() => 
      {
        this.youtubeButton.nativeElement.innerHTML = 'Load Video';
      },
      2500);
  }

}
