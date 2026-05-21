import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="logo">
          <span class="logo-icon">🎬</span>
          <div class="logo-text">
            <span class="logo-title">Kundan AI</span>
            <span class="logo-sub">Studio</span>
          </div>
        </div>

        <nav class="nav">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📊</span>
            <span>Dashboard</span>
          </a>
          <a routerLink="/analytics" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📈</span>
            <span>Analytics</span>
          </a>
          <a routerLink="/videos" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">🎬</span>
            <span>Videos</span>
          </a>
          <a routerLink="/playlists" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📋</span>
            <span>Playlists</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="channel-info">
            <div class="channel-avatar">KA</div>
            <div>
              <p class="channel-name">Kundan AI Studio</p>
              <p class="channel-sub">~5K subscribers</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; }

    .app-layout {
      display: flex;
      height: 100vh;
      background: var(--bg-main);
      overflow: hidden;
    }

    .sidebar {
      width: 240px;
      min-width: 240px;
      background: var(--bg-sidebar);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      padding: 24px 0;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 24px 32px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 16px;

      .logo-icon { font-size: 32px; }

      .logo-text {
        display: flex;
        flex-direction: column;
        .logo-title { font-size: 16px; font-weight: 800; color: var(--text-primary); }
        .logo-sub { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
      }
    }

    .nav {
      flex: 1;
      padding: 0 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 10px;
      text-decoration: none;
      color: var(--text-muted);
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;

      .nav-icon { font-size: 18px; }

      &:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }

      &.active {
        background: var(--accent);
        color: white;
      }
    }

    .sidebar-footer {
      padding: 16px 24px 0;
      border-top: 1px solid var(--border);
    }

    .channel-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .channel-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--accent);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
    }

    .channel-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .channel-sub {
      font-size: 11px;
      color: var(--text-muted);
      margin: 0;
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      background: var(--bg-main);
    }
  `]
})
export class AppComponent {}
