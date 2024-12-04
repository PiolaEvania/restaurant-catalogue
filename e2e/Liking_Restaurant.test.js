/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking, Unliking, Review Restaurant');

Scenario('showing empty liked restaurants',  ({ I }) => {
  I.amOnPage('/#/favorite');
  I.seeElement('.header-favorite');
  I.see('My Favorite Restaurant');

  I.saveScreenshot('empty_favorite_restaurant.png');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('.resto a', 5);
  I.seeElement('.resto a h4');
  const firstRestaurant = locate('.resto a h4').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('.resto a h4', 10);
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.resto a h4');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.saveScreenshot('liking_restaurant.png');
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('.resto a', 10);
  I.click(locate('.resto a h4').first());

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.dontSeeElement('My Favorite Restaurant', '.header-favorite');

  I.waitForElement('.resto a', 10);
  I.click(locate('.resto a h4').first());

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.dontSeeElement('.resto a');

  I.saveScreenshot('unliking_restaurant.png');
});

Scenario('should display restaurant item correctly', async ({ I }) => {
  I.amOnPage('/');

  I.waitForVisible('.resto-poster', 10);
  I.seeElement('.resto-poster');
  I.seeElement(locate('.resto a h4').first());

  const restaurantName = await I.grabTextFrom('.resto a h4');
  assert.strictEqual(restaurantName, 'Melting Pot');

  I.saveScreenshot('restaurant_item_visible.png');
});

Scenario('should display restaurant rating correctly', async ({ I }) => {
  I.amOnPage('/');

  I.waitForVisible('.rating', 10);
  I.seeElement(locate('.rating').first());

  const rating = await I.grabTextFrom('.rating');
  assert.strictEqual(rating, 'Rating: 4.2');

  I.saveScreenshot('restaurant_rating.png');
});

Scenario('post a restaurant review', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('.resto a', 10);
  I.click(locate('.resto a h4').first());

  I.waitForElement('#reviewForm', 10);
  I.seeElement('#reviewForm');

  I.fillField('#reviewName', 'Jane Doe');
  I.fillField('#reviewBody', 'Very Recommended!');

  I.click('#submitReviewButton');

  I.waitForElement('.detail-review ul .review:last-child', 10);

  const latestReviewName = await I.grabTextFrom('.detail-review ul .review:last-child .review-name');
  const latestReviewText = await I.grabTextFrom('.detail-review ul .review:last-child .review-body');

  assert.strictEqual(latestReviewName.trim().startsWith('Jane Doe'), true);
  assert.strictEqual(latestReviewText.trim(), 'Very Recommended!');

  I.saveScreenshot('restaurant_review.png');
});