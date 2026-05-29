import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubeService, VideoItem } from '../../services/youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videos: VideoItem[] = [];
  shortVideos: VideoItem[] = [];
longVideos: VideoItem[] = [];
  loading = true;
  error = '';
  editingVideo: VideoItem | null = null;
  editTitle = '';
  editDescription = '';
  saving = false;
  saveMsg = '';
  selectedVideoId: string | null = null;
  safeVideoUrl: SafeResourceUrl | null = null;
  nextPageToken = '';
  searchTerm = '';
activeTab = 'all';

  constructor(private yt: YoutubeService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {

  this.loading = true;

  this.yt.getVideos(
    50,
    this.nextPageToken
  ).subscribe({

    next: (res) => {

      const newVideos = res.data;

this.videos = [
  ...this.videos,
  ...newVideos
];

this.shortVideos =
  this.videos.filter(v =>
    this.isShort(v.duration)
  );

this.longVideos =
  this.videos.filter(v =>
    !this.isShort(v.duration)
  );

      this.nextPageToken =
        res.nextPageToken || '';

      this.loading = false;

    },

    error: () => {

      this.error = 'Failed to load videos';

      this.loading = false;

    }

  });

}

  openEdit(v: VideoItem) {
    this.editingVideo = v;
    this.editTitle = v.title;
    this.editDescription = v.description;
    this.saveMsg = '';
  }

  closeEdit() {
    this.editingVideo = null;
  }

  saveEdit() {
    if (!this.editingVideo) return;
    this.saving = true;
    this.yt.updateVideoMetadata(this.editingVideo.videoId, {
      title: this.editTitle,
      description: this.editDescription
    }).subscribe({
      next: () => {
        this.saveMsg = '✅ Saved!';
        this.saving = false;
        if (this.editingVideo) {
          this.editingVideo.title = this.editTitle;
          this.editingVideo.description = this.editDescription;
        }
        setTimeout(() => this.closeEdit(), 1500);
      },
      error: () => {
        this.saveMsg = '❌ Failed to save';
        this.saving = false;
      }
    });
  }

openVideo(videoId: string) {

  this.selectedVideoId = videoId;

  this.safeVideoUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1`
    );

}

closeVideo() {
  this.selectedVideoId = null;
  this.safeVideoUrl = null;
}
isShort(duration: string): boolean {

  const match =
    duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);

  const minutes =
    parseInt(match?.[1] || '0');

  const seconds =
    parseInt(match?.[2] || '0');

  const total =
    (minutes * 60) + seconds;

  return total <= 90;
}
get filteredVideos(): VideoItem[] {

  let filtered = this.videos;

  // SEARCH
  if (this.searchTerm.trim()) {

    filtered = filtered.filter(v =>
      v.title.toLowerCase().includes(
        this.searchTerm.toLowerCase()
      )
    );

  }

  // TABS
  if (this.activeTab === 'shorts') {

    filtered = filtered.filter(v =>
      this.isShort(v.duration)
    );

  }

  if (this.activeTab === 'long') {

    filtered = filtered.filter(v =>
      !this.isShort(v.duration)
    );

  }

  return filtered;

}

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
