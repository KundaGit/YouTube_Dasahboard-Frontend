import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubeService, Playlist } from '../../services/youtube.service';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  loading = true;
  error = '';
  showCreate = false;
  newTitle = '';
  newDesc = '';
  creating = false;
  createMsg = '';

  constructor(private yt: YoutubeService) {}

  ngOnInit() {
    this.loadPlaylists();
  }

  loadPlaylists() {
    this.loading = true;
    this.yt.getPlaylists().subscribe({
      next: (res) => { this.playlists = res.data; this.loading = false; },
      error: () => { this.error = 'Failed to load playlists'; this.loading = false; }
    });
  }

  createPlaylist() {
    if (!this.newTitle.trim()) return;
    this.creating = true;
    // POST /api/playlists
    const http = (this.yt as any).http;
    http.post('http://localhost:3000/api/playlists', {
      title: this.newTitle,
      description: this.newDesc,
      privacyStatus: 'public'
    }).subscribe({
      next: () => {
        this.createMsg = '✅ Playlist created!';
        this.creating = false;
        this.newTitle = '';
        this.newDesc = '';
        setTimeout(() => { this.showCreate = false; this.createMsg = ''; this.loadPlaylists(); }, 1500);
      },
      error: () => { this.createMsg = '❌ Failed'; this.creating = false; }
    });
  }
}
