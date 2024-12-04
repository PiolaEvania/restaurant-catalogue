import RestaurantDbSource from '../../data/restaurantDb-source';
import UrlParser from '../../routes/url-parser';
import {
  createRestaurantDetailTemplate,
  reviewList,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
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
      <section id="detailResto" class="container-resto">
        <div class="content">
          <h1 id="content">Detail Restaurant</h1>
          <div class="content-resto content-detail"></div>
          <div id="likeButtonContainer"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantId = await RestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('.content-resto');
    restaurantContainer.innerHTML =
      createRestaurantDetailTemplate(restaurantId);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurantId.restaurant.id,
        name: restaurantId.restaurant.name,
        description: restaurantId.restaurant.description,
        city: restaurantId.restaurant.city,
        pictureId: restaurantId.restaurant.pictureId,
        rating: restaurantId.restaurant.rating,
      },
    });

    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.getElementById('reviewName').value;
      const review = document.getElementById('reviewBody').value;

      const newReview = {
        id: restaurantId.restaurant.id,
        name,
        review,
      };

      try {
        const response = await fetch(
          'https://restaurant-api.dicoding.dev/review',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
          },
        );

        if (response.ok) {
          const responseData = await response.json();
          if (!responseData.error) {
            const reviewsContainer =
              document.querySelector('.detail-review ul');
            reviewsContainer.innerHTML = reviewList(
              responseData.customerReviews,
            );
            reviewForm.reset();
          } else {
            console.error('Error:', responseData.message);
          }
        } else {
          console.error('Failed to submit review');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  },
};

export default Detail;
