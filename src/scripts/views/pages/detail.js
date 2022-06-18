/* eslint-disable no-return-assign */
import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import '../component/detail-post';
import { createPageLoaderTemplate } from '../templates/template';

const Detail = {
  async render() {
    return `
      ${document.querySelector('main').innerHTML = createPageLoaderTemplate.show()}
      <section id="content">
        <div class="detail-container">
          <detail-post></detail-post>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantById = await RestaurantDbSource.restaurantDetailById(url.id);
    const container = document.querySelector('detail-post');
    container.value = restaurantById.restaurant;
    createPageLoaderTemplate.remove();
  },
};

export default Detail;
