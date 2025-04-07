import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.page').then( m => m.MainPage)
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'logout',
    loadComponent: () => import('./pages/logout/logout.page').then( m => m.LogoutPage)
  },
  {
    path: 'song/:idSong',
    redirectTo: '/tabs/home/song/:idSong',
  },
  {
    path: 'artist/:idArtist',
    redirectTo: '/tabs/home/artist/:idArtist',
  },
  {
    path: 'album/:idAlbum',
    redirectTo: '/tabs/home/album/:idAlbum',
  },
  {
    path: 'search',
    redirectTo: '/tabs/search',
  },
  {
    path: 'songGenre/:genre',
    redirectTo: '/tabs/search/songGenre/:genre',
  },
  {
    path: 'searchSong/:name',
    redirectTo: '/tabs/search/searchSong/:name',
  },
  {
    path: 'playlists',
    redirectTo: "/tabs/playlists"
  }, 
  {
    path: 'likes',
    redirectTo: "/tabs/playlists/likes"
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'playlist/:idPlaylist',
    redirectTo: '/tabs/playlists/playlist/:idPlaylist'
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'upload',
    loadComponent: () => import('./pages/upload/upload.page').then( m => m.UploadPage)
  },
];
