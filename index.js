(function () {
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('#' + burger.dataset.target);

  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./rcsoft-pwa-test/service-worker.js')
      .then(function () {
        console.log('Service Worker Registered...')
      });
  }

})();