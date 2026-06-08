import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubeService } from '../../services/youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScreenOrientation } from '@capacitor/screen-orientation';
@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {

  videos: any[] = [];
  searchTerm = '';
  activeTab = 'trending';
  selectedVideoId: string | null = null;
  currentVideo: any = null;
safeVideoUrl: SafeResourceUrl | null = null;

  constructor(private yt: YoutubeService, private sanitizer:DomSanitizer) {}

  ngOnInit() {
    this.loadTrending();
  }

  loadTrending() {

    this.activeTab = 'trending';

    this.yt.getTrendingVideos()
      .subscribe(res => {
console.log(res.data[0])
        this.videos = res.data;

      });

  }

  searchYoutube() {

    if (!this.searchTerm.trim()) return;

    this.activeTab = 'search';

    this.yt.searchVideos(
      this.searchTerm
    ).subscribe(res => {

      this.videos = res.data;

    });

  }

// playVideo(videoId: string, v: any) {

//   this.currentVideo = v;

//   this.selectedVideoId = videoId;

//   this.safeVideoUrl =
//     this.sanitizer.bypassSecurityTrustResourceUrl(
//       `https://www.youtube.com/embed/${videoId}?autoplay=1`
//     );
//  if (screen.orientation) {
//     screen.orientation.unlock();
//   }
// }


async playVideo(videoId: string, v: any) {

  this.currentVideo = v;
  this.selectedVideoId = videoId;

  this.safeVideoUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1`
    );

  try {
    await ScreenOrientation.lock({
      orientation: 'landscape'
    });
  } catch (e) {
    console.log(e);
  }
}

// closeVideo() {

//   this.selectedVideoId = null;

//   this.safeVideoUrl = null;

// }
async closeVideo() {

  this.selectedVideoId = null;
  this.safeVideoUrl = null;

  try {
    await ScreenOrientation.lock({
      orientation: 'portrait'
    });
  } catch (e) {
    console.log(e);
  }
}
}