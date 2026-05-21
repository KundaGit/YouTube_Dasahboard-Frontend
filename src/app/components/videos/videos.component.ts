import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubeService, VideoItem } from '../../services/youtube.service';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videos: VideoItem[] = [];
  loading = true;
  error = '';
  editingVideo: VideoItem | null = null;
  editTitle = '';
  editDescription = '';
  saving = false;
  saveMsg = '';

  constructor(private yt: YoutubeService) {}

  ngOnInit() {
    this.yt.getVideos(20).subscribe({
      next: (res) => { this.videos = res.data; this.loading = false; },
      error: () => { this.error = 'Failed to load videos'; this.loading = false; }
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

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
