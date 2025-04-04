import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'home/song/:idSong',
        loadComponent: () =>
          import('../pages/song/song.page').then((m) => m.SongPage),
      },
      {
        path: 'home/artist/:idArtist',
        loadComponent: () =>
          import('../pages/artist/artist.page').then((m) => m.ArtistPage),
      },
      {
        path: 'home/album/:idAlbum',
        loadComponent: () =>
          import('../pages/album/album.page').then((m) => m.AlbumPage),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../search/search.page').then((m) => m.SearchPage),
      },
      {
        path: 'search/songGenre/:genre',
        loadComponent: () =>
          import('../pages/genre-song/genre-song.page').then((m) => m.GenreSongPage),
      },
      {
        path: 'search/searchSong/:name',
        loadComponent: () =>
          import('../pages/search-song/search-song.page').then(
            (m) => m.SearchSongPage
          ),
      },
      {
        path: 'playlists',
        loadComponent: () =>
          import('../playlists/playlists.page').then((m) => m.PlaylistsPage),
      },
      {
        path: 'playlists/playlist/:idPlaylist',
        loadComponent: () =>
          import('../pages/playlist-item/playlist-item.page').then(
            (m) => m.PlaylistItemPage
          ),
      },
      {
        path: 'playlists/likes',
        loadComponent: () =>
          import('../pages/likes/likes.page').then((m) => m.LikesPage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
