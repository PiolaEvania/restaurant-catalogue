import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <section id="favoriteResto" class="container-resto">
        <div class="content-favorite">
          <h1 class="header-favorite">My Favorite Restaurant</h1>
          <div class="content favorite-resto">
            <div class="content-resto" id="content-resto"></div>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // Panggil fungsi untuk menyembunyikan hero dan explore restaurant
    this.hideHeroAndExplore();

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantsContainer = document.querySelector('.content-resto');

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML +=
        createRestaurantItemTemplate(restaurant);
    });
  },

  hideHeroAndExplore() {
    const heroSection = document.querySelector('.hero');
    const exploreSection = document.querySelector('.explore-restaurants');

    // Sembunyikan hero section jika ada
    if (heroSection) {
      heroSection.style.display = 'none';
    }

    // Sembunyikan explore restaurant section jika ada
    if (exploreSection) {
      exploreSection.style.display = 'none';
    }
  },
};

export default Favorite;
