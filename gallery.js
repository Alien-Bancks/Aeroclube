document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.galeria-item');
  const overlay = document.createElement('div');
  overlay.className = 'galeria-overlay';
  document.body.appendChild(overlay);

  items.forEach(item => {
    const media = item.querySelector('.galeria-img, .galeria-video');
    if (media) {
      media.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!item.classList.contains('expanded') && !document.querySelector('.galeria-video-expanded')) {
          if (media.tagName === 'VIDEO') {
            media.pause(); // Pause to prevent flicker
            const videoContainer = document.createElement('div');
            videoContainer.className = 'galeria-video-expanded';
            const clonedVideo = media.cloneNode(true); // Clone video
            videoContainer.appendChild(clonedVideo);
            overlay.appendChild(videoContainer);
            overlay.classList.add('active');
            setTimeout(() => {
              clonedVideo.play().catch(() => {});
            }, 300);
          } else {
            item.classList.add('expanded');
            overlay.classList.add('active');
          }
        }
      });
    }
  });

  const closeExpanded = () => {
    const expandedItem = document.querySelector('.galeria-item.expanded');
    const videoContainer = document.querySelector('.galeria-video-expanded');
    if (expandedItem) {
      expandedItem.classList.remove('expanded');
      overlay.classList.remove('active');
    }
    if (videoContainer) {
      const video = videoContainer.querySelector('.galeria-video');
      if (video) {
        video.pause();
      }
      videoContainer.remove();
      const originalVideo = document.querySelector('.galeria-video:not(.galeria-video-expanded .galeria-video)');
      if (originalVideo) {
        setTimeout(() => {
          originalVideo.play().catch(() => {});
        }, 300);
      }
      overlay.classList.remove('active');
    }
  };

  overlay.addEventListener('click', closeExpanded);
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('galeria-img') || e.target.classList.contains('galeria-video')) {
      const item = e.target.closest('.galeria-item') || e.target.closest('.galeria-video-expanded');
      if (item && (item.classList.contains('expanded') || item.classList.contains('galeria-video-expanded'))) {
        e.stopPropagation();
        closeExpanded();
      }
    }
  });
});