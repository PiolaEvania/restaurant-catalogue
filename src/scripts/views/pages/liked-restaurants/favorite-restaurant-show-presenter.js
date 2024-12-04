class FavoriteRestaurantShowPresenter {
  constructor({ favoriteRestaurant, view }) {
    this._favoriteRestaurant = favoriteRestaurant;
    this._view = view;
    this._showFavoriteRestaurants();
  }

  async _showFavoriteRestaurants() {
    const restaurants = await this._favoriteRestaurant.getAllRestaurant();
    this._displayRestaurants(restaurants);
  }

  _displayRestaurants(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }
}

export default FavoriteRestaurantShowPresenter;