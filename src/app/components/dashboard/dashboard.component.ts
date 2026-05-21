import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { YoutubeService, AnalyticsOverview } from '../../services/youtube.service';
import { environment } from '../../../environments/environment';

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
  isUnauthorized = false;

  constructor(private yt: YoutubeService) {}

 ngOnInit() {
  // URL se token read karo (login ke baad)
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    this.yt.saveToken(token);
    window.history.replaceState({}, '', '/dashboard');
  }

  // Token nahi hai toh login screen dikhao
  if (!this.yt.isAuthenticated()) {
    this.isUnauthorized = true;
    this.loading = false;
    return;
  }

  // Data load karo
  this.yt.getOverview('2025-01-01').subscribe({
    next: (res) => { this.overview = res.data; this.loading = false; },
    error: (err) => {
      this.loading = false;
      if (err.status === 401) {
        this.yt.clearToken();
        this.isUnauthorized = true;
      } else {
        this.error = 'Failed to load analytics';
      }
    }
  });
}

  login() {
    window.location.href = `${environment.apiUrl.replace('/api', '')}/auth/login`;
  }
  logout() {
  this.yt.clearToken();
  this.isUnauthorized = true;
  this.overview = null;
}

  formatNum(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return n?.toString() || '0';
  }
}
