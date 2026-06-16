import { Component, HostListener } from '@angular/core';
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
nextPageToken='';
loadingMore=false;


  constructor(private yt: YoutubeService, private sanitizer:DomSanitizer) {}

  ngOnInit() {
    this.loadTrending();
  }

  loadTrending() {

    this.activeTab = 'trending';

    this.yt.getTrendingVideos()
      .subscribe(res => {
    console.log('FULL RESPONSE', res);
  console.log('NEXT PAGE TOKEN', res.nextPageToken);
        this.videos = res.data;
        this.nextPageToken = res.nextPageToken || '';

      });

  }

  searchYoutube() {

    if (!this.searchTerm.trim()) return;

    this.activeTab = 'search';

    this.yt.searchVideos(
      this.searchTerm
    ).subscribe(res => {
 console.log('SEARCH', res.data[0]);

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
// for view 
formatViews(views: any): string {

  const num = Number(views || 0);

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }

  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }

  return num.toString();
}

// Infinite scroll for videos

loadMoreVideos() {

  if (
    this.loadingMore ||
    !this.nextPageToken
  ) {
    return;
  }

  this.loadingMore = true;
const before = window.scrollY;
  console.log('LOADING PAGE', this.nextPageToken);

  this.yt.getTrendingVideos(
    this.nextPageToken
  ).subscribe({

    next: (res) => {
const currentVideo = this.currentVideo;
      this.videos.push(...res.data);
   console.log(
    'Current Video:',
    currentVideo,
    'Selected:',
    this.selectedVideoId
  );
         setTimeout(() => {
    console.log(
      'Before:',
      before,
      'After:',
      window.scrollY
    );
  })
console.log(
    'NEW',
    this.videos.length
  );
      this.nextPageToken =
        res.nextPageToken || '';

      this.loadingMore = false;
    },
    

    error: () => {
      this.loadingMore = false;
    }

  });
 

}

trackByVideo(index: number, item: any) {
  return item.videoId || item.id;
}
// onContainerScroll(event: any) {

//   console.log('CONTAINER SCROLL');

//   const el = event.target;

//   if (
//     el.scrollTop + el.clientHeight >=
//     el.scrollHeight - 300
//   ) {
//     this.loadMoreVideos();
//   }

// }


// Component mein ye add karo
headerHidden = false;
private lastScrollTop = 0;

onContainerScroll(event: Event) {
  const el = event.target as HTMLElement;
  const st = el.scrollTop;

  // ─── Mobile pe header hide/show ──────────────────────
  if (window.innerWidth <= 768) {
    if (st > this.lastScrollTop && st > 80) {
      // Neeche scroll → header hide
      this.headerHidden = true;
    } else if (st < this.lastScrollTop) {
      // Upar scroll → header show
      this.headerHidden = false;
    }
  } else {
    // Desktop pe hamesha visible
    this.headerHidden = false;
  }

  this.lastScrollTop = st <= 0 ? 0 : st;

  // ─── Infinite scroll ─────────────────────────────────
  const { scrollHeight, clientHeight } = el;
  if (scrollHeight - st - clientHeight < 500 && !this.loadingMore) {
    this.loadMoreVideos(); // tera existing method
  }
}
}