(function (window, document) {
  'use strict';

  var Joyce = window.Joyce = window.Joyce || {};
  var tracks = [
    {
      title: "LANY - 'Cause You Have To",
      artist: 'LANY',
      src: "mp3/LANY - 'Cause You Have To.mp3",
      cover: "mp3/LANY - 'Cause You Have To.jpg"
    },
    {
      title: 'LANY - 13',
      artist: 'LANY',
      src: 'mp3/LANY - 13.mp3',
      cover: 'mp3/LANY - 13.jpg'
    },
    {
      title: 'Mean It',
      artist: 'LAUV, LANY',
      src: 'mp3/LAUV,LANY - Mean It.mp3',
      cover: 'mp3/LAUV,LANY - Mean It.jpg'
    }
  ];
  var currentTrackIndex = 0;
  var audio;

  function formatTime(value) {
    if (!Number.isFinite(value)) {
      return '00:00';
    }

    var minutes = Math.floor(value / 60);
    var seconds = Math.floor(value % 60);
    return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
  }

  function getTrack(index) {
    return tracks[(index + tracks.length) % tracks.length];
  }

  function updatePlayerUi() {
    var track = getTrack(currentTrackIndex);
    var progress = audio && audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    var isPlaying = audio && !audio.paused;

    document.querySelectorAll('[data-player-title]').forEach(function (node) {
      node.textContent = track.title;
    });
    document.querySelectorAll('[data-player-artist]').forEach(function (node) {
      node.textContent = track.artist;
    });
    document.querySelectorAll('[data-player-cover]').forEach(function (node) {
      node.src = track.cover;
    });
    document.querySelectorAll('[data-player-progress]').forEach(function (node) {
      node.style.width = Math.max(0, Math.min(progress, 100)) + '%';
    });
    document.querySelectorAll('[data-player-current]').forEach(function (node) {
      node.textContent = formatTime(audio ? audio.currentTime : 0);
    });
    document.querySelectorAll('[data-player-duration]').forEach(function (node) {
      node.textContent = formatTime(audio ? audio.duration : 0);
    });
    document.querySelectorAll('[data-player-toggle]').forEach(function (node) {
      node.textContent = '';
      node.classList.toggle('is-playing', Boolean(isPlaying));
      node.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
    });
    document.querySelectorAll('.playlist-item').forEach(function (node) {
      node.classList.toggle('is-active', Number(node.dataset.trackIndex) === currentTrackIndex);
    });
  }

  function ensureAudio() {
    if (audio) {
      if (!audio.parentNode) {
        document.body.append(audio);
      }
      return audio;
    }

    audio = document.getElementById('music-audio') || document.createElement('audio');
    audio.id = 'music-audio';
    audio.preload = 'metadata';
    audio.src = getTrack(currentTrackIndex).src;

    if (!audio.parentNode) {
      document.body.append(audio);
    }

    audio.addEventListener('loadedmetadata', updatePlayerUi);
    audio.addEventListener('timeupdate', updatePlayerUi);
    audio.addEventListener('play', updatePlayerUi);
    audio.addEventListener('pause', updatePlayerUi);
    audio.addEventListener('ended', function () {
      selectTrack(currentTrackIndex + 1, true);
    });

    return audio;
  }

  function selectTrack(index, shouldPlay) {
    var player = ensureAudio();
    var normalizedIndex = (index + tracks.length) % tracks.length;

    if (normalizedIndex !== currentTrackIndex || player.src.indexOf(tracks[normalizedIndex].src) === -1) {
      currentTrackIndex = normalizedIndex;
      player.src = tracks[currentTrackIndex].src;
      player.currentTime = 0;
    } else {
      currentTrackIndex = normalizedIndex;
    }

    updatePlayerUi();

    if (shouldPlay) {
      player.play().catch(function () {
        updatePlayerUi();
      });
    }
  }

  function togglePlayback() {
    var player = ensureAudio();

    if (player.paused) {
      player.play().catch(function () {
        updatePlayerUi();
      });
      return;
    }

    player.pause();
  }

  function bindMusicControls() {
    ensureAudio();
    updatePlayerUi();

    document.querySelectorAll('[data-player-toggle]').forEach(function (node) {
      node.addEventListener('click', togglePlayback);
    });
    document.querySelectorAll('[data-player-prev]').forEach(function (node) {
      node.addEventListener('click', function () {
        selectTrack(currentTrackIndex - 1, true);
      });
    });
    document.querySelectorAll('[data-player-next]').forEach(function (node) {
      node.addEventListener('click', function () {
        selectTrack(currentTrackIndex + 1, true);
      });
    });
    document.querySelectorAll('.playlist-item[data-track-index]').forEach(function (node) {
      node.addEventListener('click', function () {
        selectTrack(Number(node.dataset.trackIndex), true);
      });
    });
  }

  function bootstrap() {
    window.Joyce.router.start();
    bindMusicControls();
  }

  window.addEventListener('hashchange', function () {
    window.setTimeout(bindMusicControls, 0);
  });

  Joyce.musicPlayer = Object.freeze({
    tracks: tracks,
    selectTrack: selectTrack,
    togglePlayback: togglePlayback
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  } else {
    bootstrap();
  }
}(window, document));
