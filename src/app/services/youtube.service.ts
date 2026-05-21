import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AnalyticsOverview {
  success: boolean;
  period: { startDate: string; endDate: string };
  data: {
    views: number;
    watchTimeMinutes: number;
    watchTimeHours: number;
    subscribersGained: number;
    subscribersLost: number;
    netSubscribers: number;
    likes: number;
    shares: number;
    comments: number;
  };
}

export interface DailyStats {
  success: boolean;
  data: {
    date: string;
    views: number;
    watchTimeMinutes: number;
    subscribersGained: number;
    subscribersLost: number;
    netSubscribers: number;
  }[];
}

export interface TopVideo {
  videoId: string;
  title: string;
  videoUrl: string;
  views: number;
  watchTimeMinutes: number;
  likes: number;
  shares: number;
  avgViewDurationSeconds: number;
}

export interface VideoItem {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  videoUrl: string;
}

export interface Playlist {
  playlistId: string;
  title: string;
  description: string;
  thumbnail: string;
  videoCount: number;
  publishedAt: string;
}

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  private base = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getOverview(startDate = '2025-01-01', endDate?: string): Observable<AnalyticsOverview> {
    const end = endDate || new Date().toISOString().split('T')[0];
    return this.http.get<AnalyticsOverview>(`${this.base}/analytics/overview`, {
      params: new HttpParams().set('startDate', startDate).set('endDate', end)
    });
  }

  getDailyStats(startDate = '2026-05-01', endDate?: string): Observable<DailyStats> {
    const end = endDate || new Date().toISOString().split('T')[0];
    return this.http.get<DailyStats>(`${this.base}/analytics/daily`, {
      params: new HttpParams().set('startDate', startDate).set('endDate', end)
    });
  }

  getTopVideos(limit = 10): Observable<{ success: boolean; data: TopVideo[] }> {
    return this.http.get<{ success: boolean; data: TopVideo[] }>(`${this.base}/analytics/top-videos`, {
      params: new HttpParams().set('limit', limit).set('startDate', '2026-01-01')
    });
  }

  getVideos(maxResults = 20): Observable<{ success: boolean; data: VideoItem[] }> {
    return this.http.get<{ success: boolean; data: VideoItem[] }>(`${this.base}/videos/list`, {
      params: new HttpParams().set('maxResults', maxResults)
    });
  }

  getPlaylists(): Observable<{ success: boolean; data: Playlist[] }> {
    return this.http.get<{ success: boolean; data: Playlist[] }>(`${this.base}/playlists`);
  }

  updateVideoMetadata(videoId: string, body: { title?: string; description?: string; tags?: string[] }) {
    return this.http.patch(`${this.base}/videos/${videoId}`, body);
  }
}
