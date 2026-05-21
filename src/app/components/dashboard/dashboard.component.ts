import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { YoutubeService, AnalyticsOverview } from '../../services/youtube.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  overview: AnalyticsOverview['data'] | null = null;
  loading = true;
  error = '';

  constructor(private yt: YoutubeService) {}

  ngOnInit() {
    this.yt.getOverview('2025-01-01').subscribe({
      next: (res) => { this.overview = res.data; this.loading = false; },
      error: () => { this.error = 'Failed to load analytics'; this.loading = false; }
    });
  }

  formatNum(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return n?.toString() || '0';
  }
}
