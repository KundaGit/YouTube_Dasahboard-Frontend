import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubeService } from '../../services/youtube.service';

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

  constructor(private yt: YoutubeService) {}

  ngOnInit() {
    this.loadTrending();
  }

  loadTrending() {

    this.activeTab = 'trending';

    this.yt.getTrendingVideos()
      .subscribe(res => {

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

}