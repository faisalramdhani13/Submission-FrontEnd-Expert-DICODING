/* eslint-disable no-return-assign */
import '../component/post-list';
import '../component/empty-favorite';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createPageLoaderTemplate } from '../templates/template';

const Favorite = {
  async render() {
    return `
            ${document.querySelector('main').innerHTML = createPageLoaderTemplate.show()}
            <section class="content" id="content">
                <h1 class="content-title">Favorite Restaurant</h1>
                <div class="posts" id="posts">
                    <post-list></post-list>
                </div>
            </section>
        `;
  },

  async afterRender() {
    const postContainer = document.querySelector('post-list');
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    if (restaurants.length > 0) {
      postContainer.value = restaurants;
    } else {
      document.querySelector('#posts').innerHTML = '<empty-favorite></empty-favorite>';
    }
    createPageLoaderTemplate.remove();
  },
};

export default Favorite;
