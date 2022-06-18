const createReviewTemplate = (reviews) => {
  const review = reviews.customerReviews[reviews.customerReviews.length - 1];

  const html = document.createElement('div');
  html.classList.add('review-container');
  html.innerHTML = `
    <div class="reviewer-photo">
        <img src="./images/user/default.jpg" alt="reviewer photo"
    </div>
    <div class="body-review">
        <h3 class="reviewer-name>${review.name}</h3>
        <small class="review-date">${review.date}</small>
        <p class="review-content">${review.review}</p>
    </div>
    `;
  return html;
};

const createButtonLoaderTemplate = () => `
    <div class="btn-loader"></div>
    `;

const createPageLoaderTemplate = {
  show() {
    return `
        <div class="page-loader"></div>
    `;
  },
  remove() {
    document.querySelector('.page-loader').remove();
  },
};

const createLikeButtonTemplate = () => `
    <button aria-label="like restaurant" id="likeButton" class="like">
        <i class="far fa-heart" aria-hidden="true"></i>
    </button>
    `;

const createLikedButtonTemplate = () => `
    <button aria-label="unlike restaurant" id="likeButton" class="like">
        <i class="fas fa-heart" aria-hidden="true"></i>
    </button>
    `;

const createSuccessNotif = {
  show() {
    return `
        <div class="fav-notif">
            <p>Success add this restaurant to your favorite. Enjoy!</p>
        </div>
    `;
  },

  remove() {
    setTimeout(() => {
      const notif = document.querySelector('.fav-notif');
      if (notif)notif.remove();
    }, 3000);
  },
};

const createRemoveNotif = {
  show() {
    return `
        <div class="fav-notif">
            <p>This restaurant has been removed from your favorite</p>
        </div>
    `;
  },

  remove() {
    setTimeout(() => {
      const notif = document.querySelector('.fav-notif');
      if (notif)notif.remove();
    });
  },
};

export {
  createReviewTemplate,
  createButtonLoaderTemplate,
  createPageLoaderTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createSuccessNotif,
  createRemoveNotif,
};
