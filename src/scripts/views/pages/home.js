/* eslint-disable no-return-assign */
import '../component/post-list';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createPageLoaderTemplate } from '../templates/template';

const Home = {
  async render() {
    return `
      ${document.querySelector('main').innerHTML = createPageLoaderTemplate.show()}
      <section class="content">
        <div class="explore">
          <h1 class="explore-label">Explore Restaurant</h1>
        </div>
        <div class="posts">
          <post-list></post-list>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const postContainer = document.querySelector('post-list');
    const { restaurants } = await RestaurantDbSource.listRestaurant();
    postContainer.value = restaurants;
    createPageLoaderTemplate.remove();
  },
};

export default Home;
