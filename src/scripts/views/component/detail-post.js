/* eslint-disable no-underscore-dangle */
import CONFIG from '../../globals/config';
import FormReviewInitiator from '../../utils/form-review-initiator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

class DetailPost extends HTMLElement {
  set value(data) {
    this._data = data;
    this._render();
    this._formInitiator();
    this._likeButtonInitiator();
  }

  _formInitiator() {
    FormReviewInitiator.init({
      form: this.querySelector('#review-form'),
      container: this.querySelector('#review-container'),
    });
  }

  async _likeButtonInitiator() {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      notifContainer: document.querySelector('#notifFavoriteContainer'),
      restaurant: this._data,
    });
  }

  _render() {
    this.innerHTML = `
        <div id="notifFavoriteContainer" class="notif-favorite-container"></div>
        <article>
            <img src="${CONFIG.BASE_IMAGE_URL + this._data.pictureId}" class="detail-thumbnail" alt="${this._data.name}">
            <div id="likeButtonContainer"></div>
            <div class="detail-content">
                <h1 class="detail-title">${this._data.name}</h1>
                <div class="detail-category">${this._data.categories.map((category) => `<span>${category.name}</span>`).join(',')}</div>
                <span class="detail-location">${this._data.address}, ${this._data.city}</span>
                <p class="detail-description">${this._data.description}</p>
            </div>
        </article>
        <aside>
            <div class="detail-menu">
                <div class="menu-title-container">
                    <h2 class="menu-title">Food</h2>
                </div>
                <ul class="menu-list">
                    ${this._data.menus.foods.map((food) => `<li class="menu-item">${food.name}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-menu">
                <div class="menu-title-container">
                    <h2 class="menu-title">Drink</h2>
                </div>
                <ul class="menu-list">
                    ${this._data.menus.drinks.map((drink) => `<li class="menu-item">${drink.name}</li>`).join('')}
                </ul>
            </div>
        </aside>
        <section>
            <div class="review-form-container">
                <h2>Review</h2>
                    <form class="review-form" id="review-form">
                        <input type="hidden" name="id" value="${this._data.id}">
                        <div class="review-form-element">
                            <label for="name">Name</label>
                            <input type="text" name="name" id="name" autocomplete="off">
                        </div>
                        <div class="review-form-element">
                            <label for="review">Review</label>
                            <textarea name="review" id="review"></textarea>
                        </div>
                        <button type="submit" id="button-review">Submit Review</button>
                    </form>
            </div>
            <h2>Customer Review</h2>
            <div id="review-container">
                ${this._data.customerReviews.map((review) => `
                    <div class="review-container">
                        <div class="reviewer-photo">
                            <img src="./images/user/default.jpg" alt="reviewer photo"
                        </div>
                        <div class="body-review">
                            <h3 class="reviewer-name>${review.name}</h3>
                            <small class="review-date">${review.date}</small>
                            <p class="review-content">${review.review}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
        `;
  }
}

customElements.define('detail-post', DetailPost);
