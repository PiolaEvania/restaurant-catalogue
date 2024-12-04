import RestaurantDbSource from '../../data/restaurantDb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <section>
        <div class="container-hero">
          <div class="hero">
            <picture>
              <source media="(max-width=600px)" srcset="/src/public/heros/hero-image_4-small.webp">
              <source media="(max-width=600px)" srcset="/src/public/heros/hero-image_4-small.jpg">
              <source media="(min-width=1200px)" srcset="/src/public/heros/hero-image_4-large.webp">
              <img src="./heros/hero-image_4-large.jpg" alt="Daffodils, almond cookies, and lemon slices on a dark surface" class="hero-image lazyload">
            </picture>
          </div>
        </div>
      </section>
      <section id="homeResto" class="container-resto">
        <div class="content">
          <h1 id="content">Explore Restaurant</h1>
          <div class="content-resto" id="content-resto"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantDbSource.homeRestaurants();
    const restaurantsContainer = document.querySelector('.content-resto');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML +=
        createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
