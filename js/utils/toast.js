import 'toastify-js/src/toastify.css'
import Toastify from 'toastify-js'
export const toast = {
  info(message) {
    Toastify({
      text: message,
      duration: 5000,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
      onClick: function () {}, // Callback after click
    }).showToast()
  },

  success(message) {
    Toastify({
      text: message,
      duration: 5000,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
      onClick: function () {}, // Callback after click
    }).showToast()
  },

  error(message) {
    Toastify({
      text: message,
      duration: 5000,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      style: {
        background: 'linear-gradient(to right, red, red)',
      },
      onClick: function () {}, // Callback after click
    }).showToast()
  },
}
