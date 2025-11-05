fetch('assets/gallery/gallery.json')
  .then(response => response.json())
  .then(data => {
    const galleryContainer = document.getElementById('gallery');

    data.albums.forEach(album => {
      const albumDiv = document.createElement('div');
      albumDiv.classList.add('album');

      const title = document.createElement('h2');
      title.textContent = album.title;
      albumDiv.appendChild(title);

      const imagesDiv = document.createElement('div');
      imagesDiv.classList.add('images');

      album.images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = `assets/gallery/${album.folder}/${img}`;
        imgElement.alt = `${album.title} - ${img}`;
        imgElement.loading = "lazy";
        imagesDiv.appendChild(imgElement);
      });

      albumDiv.appendChild(imagesDiv);
      galleryContainer.appendChild(albumDiv);

      // Handle album click to expand/collapse
      title.addEventListener('click', () => {
        const isActive = albumDiv.classList.contains('active');
        document.querySelectorAll('.album').forEach(a => a.classList.remove('active', 'minimized'));

        if (!isActive) {
          albumDiv.classList.add('active');
          document.querySelectorAll('.album').forEach(a => {
            if (a !== albumDiv) a.classList.add('minimized');
          });
        }
      });
    });
  })
  .catch(error => console.error("Error loading gallery:", error));
