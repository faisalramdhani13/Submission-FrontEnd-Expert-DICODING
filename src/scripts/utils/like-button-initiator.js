/* eslint-disable no-underscore-dangle */
import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createRemoveNotif,
  createSuccessNotif,
} from '../views/templates/template';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, notifContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._notifContainer = notifContainer;
    this._restaurant = restaurant;

    await this._renderButton(this._restaurant);
  },

  async _renderButton(restaurant) {
    const { id } = restaurant;
    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurantById(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton(this._restaurant);
      this._notifContainer.innerHTML = createSuccessNotif.show();
      createSuccessNotif.remove();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton(this._restaurant);
      this._notifContainer.innerHTML = createRemoveNotif.show();
      createRemoveNotif.remove();
    });
  },
};

export default LikeButtonInitiator;
