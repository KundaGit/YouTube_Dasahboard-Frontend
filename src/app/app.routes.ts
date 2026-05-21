import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { VideosComponent } from './components/videos/videos.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'playlists', component: PlaylistsComponent },
];
