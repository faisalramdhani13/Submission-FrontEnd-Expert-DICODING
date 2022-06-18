/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import RestaurantDbSource from '../data/restaurantdb-source';
import { createButtonLoaderTemplate, createReviewTemplate } from '../views/templates/template';

const FormReviewInitiator = {
  init({ form, container }) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.validateForm(form, container);
    });
  },

  setDataForm(form) {
    const data = new FormData(form);
    const dataForm = {};
    for (const key of data.keys()) {
      dataForm[key] = data.get(key);
    }
    return dataForm;
  },

  validateForm(form, container) {
    const data = this.setDataForm(form);
    const error = {
      status: false,
      keys: [],
    };

    for (const key in data) {
      if (data[key] === '') {
        error.status = true;
        error.keys.push(key);
      }
    }

    if (error.status === false) {
      this.sendData({
        data: JSON.stringify(data),
        form,
        container,
      });
    } else {
      this.errorHandler(error, form);
    }
  },

  errorHandler(error, form) {
    form.querySelector('span').forEach((item) => {
      item.remove();
    });
    error.keys.forEach((key) => {
      const element = document.querySelector(`#${key}`);
      const errorElement = document.createElement('span');
      errorElement.setAttribute('class', 'input-require');
      errorElement.innerText = `field ${key} must be filled`;
      element.after(errorElement);
    });
  },

  successHandler(form) {
    const formElement = form;
    formElement.querySelector('span').forEach((item) => {
      item.remove();
    });

    formElement.querySelector('input[type=text]').value = '';
    formElement.querySelector('textarea').value = '';
    const messageElement = document.createElement('div');
    messageElement.classList.add('success-message');
    messageElement.classList.add('show-message');
    messageElement.innerHTML = '<p>Successfully add review</p>';
    formElement.prepend(messageElement);
    setTimeout(() => {
      messageElement.remove();
    }, 3000);
  },

  async sendData({ data, form, container }) {
    try {
      form.querySelector('button').innerHTML = createButtonLoaderTemplate();
      const response = await RestaurantDbSource.sendReview(data);
      this.successHandler(form);
      container.appendChild(createReviewTemplate(response));
      form.querySelector('button').innerHTML = 'Add Review';
    } catch (error) {
      console.log(error);
    }
  },
};

export default FormReviewInitiator;
