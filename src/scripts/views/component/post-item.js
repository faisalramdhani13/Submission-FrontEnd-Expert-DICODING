/* eslint-disable no-underscore-dangle */
import CONFIG from '../../globals/config';

class PostItem extends HTMLElement {
  set value(data) {
    this._data = data;
    this._render();
  }

  _render() {
    this.innerHTML = `
            <article class="post-item">
                <img data-src="${CONFIG.BASE_IMAGE_URL + this._data.pictureId}" alt="${this._data.name}" class="lazyload post-item-thumbnail">
                <div class="post-item-content">
                    <p class="post-item-rating">${this._data.rating} | <p class="post-item-city">${this._data.city}</p></p>
                    <h1 class="post-item-title"><a href="#/detail/${this._data.id}" style="padding: 10px;">${this._data.name}</a></h1>
                    <p class="post-item-description">${this._data.description}</p>
                </div>
            </article>
        `;
  }
}

customElements.define('post-item', PostItem);
