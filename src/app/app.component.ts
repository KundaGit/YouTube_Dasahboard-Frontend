import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-layout">
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
            <span class="nav-icon">📊</span><span>Dashboard</span>
          </a>
          <a routerLink="/analytics" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📈</span><span>Analytics</span>
          </a>
          <a routerLink="/videos" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">🎬</span><span>Videos</span>
          </a>
          <a routerLink="/playlists" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📋</span><span>Playlists</span>
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

      <main class="main-content">
        <router-outlet />
      </main>
<!-- Channel Info Bar (mobile only) -->
<div class="channel-bar">
  <div class="channel-avatar-sm">KA</div>
  <span class="channel-bar-name">Kundan AI Studio</span>
  <span class="channel-bar-dot">•</span>
  <span class="channel-bar-subs">~5K subs</span>
</div>
      <nav class="bottom-nav">
        <a routerLink="/dashboard" routerLinkActive="active" class="bottom-nav-item">
          <span class="bn-icon">📊</span>
          <span class="bn-label">Home</span>
        </a>
        <a routerLink="/analytics" routerLinkActive="active" class="bottom-nav-item">
          <span class="bn-icon">📈</span>
          <span class="bn-label">Analytics</span>
        </a>
        <a routerLink="/videos" routerLinkActive="active" class="bottom-nav-item">
          <span class="bn-icon">🎬</span>
          <span class="bn-label">Videos</span>
        </a>
        <a routerLink="/playlists" routerLinkActive="active" class="bottom-nav-item">
          <span class="bn-icon">📋</span>
          <span class="bn-label">Playlists</span>
        </a>
      </nav>
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
    }
    .logo-icon { font-size: 32px; }
    .logo-text { display: flex; flex-direction: column; }
    .logo-title { font-size: 16px; font-weight: 800; color: var(--text-primary); }
    .logo-sub { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }

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
    }
    .nav-icon { font-size: 18px; }
    .nav-item:hover { background: var(--bg-hover); color: var(--text-primary); }
    .nav-item.active { background: var(--accent); color: white; }

    .sidebar-footer {
      padding: 16px 24px 0;
      border-top: 1px solid var(--border);
    }
    .channel-info { display: flex; align-items: center; gap: 12px; }
    .channel-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: var(--accent); color: white;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700;
    }
    .channel-name { font-size: 13px; font-weight: 600; color: var(--text-primary); margin: 0; }
    .channel-sub { font-size: 11px; color: var(--text-muted); margin: 0; }

    .main-content {
      flex: 1;
      overflow-y: auto;
      background: var(--bg-main);
    }

    .bottom-nav {
      display: none;
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: 60px;
      background: var(--bg-sidebar);
      border-top: 1px solid var(--border);
      z-index: 999;
    }

    .bottom-nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      text-decoration: none;
      color: var(--text-muted);
      transition: all 0.2s;
    }
    .bn-icon { font-size: 20px; line-height: 1; }
    .bn-label { font-size: 10px; font-weight: 600; }
    .bottom-nav-item.active { color: var(--accent); }

   @media (max-width: 768px) {

  .sidebar {
    display: none !important;
  }

  .main-content {
    padding-bottom: 120px;
  }

  .bottom-nav {

    display: flex !important;

    position: fixed;

    left: 12px;
    right: 12px;
    bottom: 14px;

    height: 64px;

    border-radius: 22px;

    background: rgba(10,10,15,0.92);

    backdrop-filter: blur(16px);

    border: 1px solid rgba(255,255,255,0.06);

    box-shadow:
      0 10px 30px rgba(0,0,0,0.45);

    padding: 0 8px;

    z-index: 9999;
  }

  .bottom-nav-item {

    flex: 1;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 4px;

    border-radius: 16px;

    transition: 0.25s;
  }

  .bottom-nav-item.active {

    background: rgba(255,255,255,0.06);

    color: var(--accent);
  }

  .bn-icon {
    font-size: 18px;
  }

  .bn-label {
    font-size: 10px;
    font-weight: 600;
  }

  .channel-bar {

    position: fixed;

    left: 12px;
    right: 12px;

    bottom: 88px;

    height: 44px;

    border-radius: 16px;

    background: rgba(20,20,25,0.95);

    border: 1px solid rgba(255,255,255,0.05);

    display: flex;
    align-items: center;

    padding: 0 14px;

    z-index: 9998;
  }

  .channel-avatar-sm {

    width: 24px;
    height: 24px;

    border-radius: 50%;

    background: var(--accent);

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 10px;
    font-weight: 700;

    margin-right: 10px;
  }

  .channel-bar-name {

    font-size: 12px;
    font-weight: 600;

    color: var(--text-primary);
  }

  .channel-bar-dot {

    margin: 0 6px;

    color: var(--text-muted);
  }

  .channel-bar-subs {

    font-size: 11px;

    color: var(--text-muted);
  }

}
  `]
})
export class AppComponent {}
