/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.seeElement('#posts');
  I.waitForElement('.tag-empty-favorite', 5);
  I.see('Your Favorite Restaurant still empty', '.tag-empty-favorite');

  I.amOnPage('/');
  I.waitForElement('.post-item-title a', 5);
  I.seeElement('.post-item-title a');
  const firstRestaurant = locate('.post-item-title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item');
  const likedRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.post-item-title a', 5);
  I.seeElement('.post-item-title a');
  I.click(locate('.post-item-title a').first());

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('.post-item-title a', 5);
  I.seeElement('.post-item-title a');
  const firstLikedRestaurant = locate('.post-item-title a').first();
  const firstLikedRestaurantTitle = await I.grabTextFrom(firstLikedRestaurant);
  I.click(firstLikedRestaurant);

  I.waitForElement('.detail-title', 5);
  I.seeElement('.detail-title');
  const likedRestaurantTitle = await I.grabTextFrom('.detail-title');
  assert.strictEqual(firstLikedRestaurantTitle, likedRestaurantTitle);

  I.waitForElement('[aria-label="unlike restaurant"]', 5);
  I.seeElement('[aria-label="unlike restaurant"]');
  I.click('[aria-label="unlike restaurant"]');

  I.amOnPage('/#/favorite');
  I.see('Your Favorite Restaurant still empty', '.tag-empty-favorite');
});
