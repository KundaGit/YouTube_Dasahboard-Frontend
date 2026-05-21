import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeService, TopVideo } from '../../services/youtube.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  topVideos: TopVideo[] = [];
  dailyStats: any[] = [];
  loading = true;
  error = '';

  constructor(private yt: YoutubeService) {}

  ngOnInit() {
    this.yt.getTopVideos(10).subscribe({
      next: (res) => { this.topVideos = res.data; this.loading = false; },
      error: () => { this.error = 'Failed to load top videos'; this.loading = false; }
    });

    this.yt.getDailyStats('2026-05-01').subscribe({
      next: (res) => { this.dailyStats = res.data; },
      error: () => {}
    });
  }

  formatNum(n: number): string {
    if (!n) return '0';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return n.toString();
  }

  formatDuration(seconds: number): string {
    if (!seconds) return '0s';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  getMaxViews(): number {
    return Math.max(...this.topVideos.map(v => v.views || 0), 1);
  }
}
