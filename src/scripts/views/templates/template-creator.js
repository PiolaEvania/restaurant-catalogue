import CONFIG from '../../globals/config';

const menuList = (menuItems) =>
  menuItems.length > 0
    ? `
    <ul> ${menuItems.map((item) => `<li>${item.name} </li>`).join('')}
    </ul>`
    : '<p>Tidak ada menu.</p>';

const reviewList = (reviews) => {
  if (reviews.length === 0) {
    return '<p>Tidak ada ulasan.</p>';
  }
  return reviews
    .map(
      (review) => `
        <div class="review">
          <p class="review-name"><strong>${review.name} </strong><span>${review.date}</span></p>
          <p class="review-body">${review.review}</p>
        </div>
      `,
    )
    .join('');
};

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item wrapper" id="restaurant-item">
    <div class="resto" data-dataid="${restaurant.id}">
      <a href="#/detail/${restaurant.id}">
      <picture>
        <source class="lazyload" srcset="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
        <img class="resto-poster lazyload" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
      </picture>
      <h4>${restaurant.name}</h4></a>
      <p class="rating">Rating: <span>${restaurant.rating}</span></p>
      <p class="city">City: <span>${restaurant.city}</span></p>
      <p class="deskripsi">Description: <span>${restaurant.description}</span></p>
    </div>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="wrapper wrapper-detail">
    <div class="resto" data-dataid="${restaurant.restaurant.id}">
      <picture>
        <source class="lazyload" srcset="${CONFIG.BASE_IMAGE_URL + restaurant.restaurant.pictureId}">
        <img class="resto-poster lazyload" src="${CONFIG.BASE_IMAGE_URL + restaurant.restaurant.pictureId}" alt="${restaurant.restaurant.name}">
      </picture>
      <h4>${restaurant.restaurant.name}</h4>
      <p class="rating">Rating: <span>${restaurant.restaurant.rating}</span></p>
      <p class="city">City: <span>${restaurant.restaurant.city}</span></p>
      <p class="deskripsi">Description: <span>${restaurant.restaurant.description}</span></p>
      <p class="detail-header">Menu Makanan</p>
      <span class="detail-deskripsi">${menuList(restaurant.restaurant.menus.foods)}</span>
      <p class="detail-header">Menu Minuman</p>
      <span class="detail-deskripsi">${menuList(restaurant.restaurant.menus.drinks)}</span>
      <p class="detail-header">Customer Review</p>
      <div class ="detail-review">
        <ul>
          ${reviewList(restaurant.restaurant.customerReviews)}
        </ul>
      </div>
      <p class="detail-header">Add Your Review</p>
      ${createAddReviewTemplate()}
    </div>
  </div>
`;

const createAddReviewTemplate = () => `
  <form id="reviewForm">
    <input type="text" id="reviewName" placeholder="Your Name" required>
    <textarea id="reviewBody" placeholder="Your Review" required></textarea>
    <button type="submit" id="submitReviewButton">Submit</button>
  </form>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  reviewList,
  createAddReviewTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
