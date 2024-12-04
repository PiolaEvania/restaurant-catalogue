import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <section id="favoriteResto" class="container-resto">
        <div class="content-favorite">
          <h2 class="header-favorite">My Favorite Restaurant</h2>
          <div class="content favorite-resto">
            <div class="content-resto" id="content-resto"></div>
          </div>
        </div>
      </section>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('content-resto').innerHTML = html;
    document.getElementById('content-resto').dispatchEvent(new Event('content-resto:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">Tidak ada item untuk ditampilkan</div>
    `;
  }
}

export default FavoriteRestaurantView;