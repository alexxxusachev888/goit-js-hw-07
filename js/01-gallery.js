import {
  galleryItems
} from './gallery-items.js';
// Change code below this line

const galleryElem = document.querySelector('.gallery');

const galleryItemsMarkup = createImgMarkup(galleryItems);

galleryElem.insertAdjacentHTML('afterbegin', galleryItemsMarkup);

function createImgMarkup(items) {
  return items.map(({
    preview,
    original,
    description
  }) => {
    return `
    <div class="gallery__item">
      <a class = "gallery__link" href = "${original}" >
        <img
          class="gallery__image"
          src = "${preview}"
          data-source = "${original}"
          alt = "${description}" / >
      </a> 
    </div>
  `;
  }).join('');
}

galleryElem.addEventListener('click', onImgClickOpen);


function onImgClickOpen(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const originalUrl = event.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${originalUrl}" width="600" height="400">`, {
      onShow: (instance) => {
        document.addEventListener('keydown', onEscPressClose);
      },
      onClose: (instance) => {
        document.removeEventListener('keydown', onEscPressClose);
      }
    });

  instance.show();

  function onEscPressClose(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
};