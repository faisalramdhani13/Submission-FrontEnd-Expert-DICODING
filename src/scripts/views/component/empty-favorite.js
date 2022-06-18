/* eslint-disable no-underscore-dangle */
class EmptyFavorite extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
            <div class="icon-empty-favorite>
                <i class="fa-folder-open"></i>
            </div>
            <div class="tag-empty-favorite">
                <p>Your Favorite Restaurant still empty</p>
            </div>
        `;
  }
}

customElements.define('empty-favorite', EmptyFavorite);
