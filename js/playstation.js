function handlePlaystationMutations(){

  if (someURL(['playstation'], hostname)) {

    if (!dollar) return;

    if ( someURL(['/category', '/search'], pathname)) {
      handlePlaystationGrid();
    }

    if (someURL(['pages', '/view'], pathname)) {
      handlePlaystationSlider();
    }

    if (someURL(['/games'], pathname)) {
      handlePlaystationGames();
      handlePlaystationGamesEditions();
    }

    if (someURL(['/ps-plus'], pathname)) {
      handlePlaystationPlus();
    }
    
    if (someURL(['/product', '/concept', pathname])){
      handlePlaystationProduct();
      handlePlaystationProductEditions();
      handlePlaystationProductComplements();
    }
  }
}

/**
 * HOW IT WORKS?
 *
 * Find a game item list
 * Then get the original price and their discount if exists
 * Then replace both with the new price
 * Then add a click event to switch between original and new prices
*/

function handlePlaystationGrid(){

  handleMutations(
    '.psw-product-tile__details',
    'playstation--grid',
    (game) => {

      //Precio
      scrapper({
        priceElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        eventElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        currency: 'US',
        showEmoji: true,
      })

      //Precio Regular
      scrapper({
        priceElement: game.lastElementChild.querySelector('.psw-c-t-2'),
        eventElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        currency: 'US',
        showEmoji: false,
      })
    }
  );
}

function handlePlaystationSlider() {

  handleMutations(
    '.psw-strand-scroller .psw-product-tile__details',
    'playstation--slider',
    (game) => {

      //Precio
      scrapper({
        priceElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        eventElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        currency: 'US',
        showEmoji: true,
      })

      //Precio Regular
      scrapper({
        priceElement: game.lastElementChild.querySelector('.psw-c-t-2'),
        eventElement: game.lastElementChild.querySelector('.psw-m-r-3'),
        currency: 'US',
        showEmoji: false,
      })
    }
  );
}

function handlePlaystationPlus() {

  handleMutations(
    '.cmp-experiencefragments--ps-plus-skus .box .automatedPricingCta .psw-label',
    'playstation--plus',
    (game) => {

      // Precio
      scrapper({
        priceElement: game.querySelector('.psw-t-title-m'),
        eventElement: game.querySelector('.psw-t-title-m'),
        currency: 'US',
        showEmoji: true,
      })
    }
  );
}

function handlePlaystationProduct() {

  handleMutations(
    '.pdp-cta',
    'playstation--product',
    (game) => {
      for (let offerNum = 0; offerNum < 2; offerNum++) {

        // Price
        scrapper({
          priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          currency: 'US',
          showEmoji: true,
        })

        // Regular Price
        scrapper({
          priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#originalPrice"]`),
          eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          currency: 'US',
          showEmoji: false,
        })
      }
    }
  );
}

function handlePlaystationProductEditions() {

  handleMutations(
    '.pdp-upsells article',
    'playstation--product-editions',
    (game, i) => {

      // Precio
      scrapper({
        priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        currency: 'US',
        showEmoji: true,
      })

      // Precio Regular
      scrapper({
        priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#originalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        currency: 'US',
        showEmoji: false,
      })
    }
  );
}

function handlePlaystationProductComplements() {

  handleMutations(
    '.pdp-add-ons [data-qa="add-ons"] li',
    'playstation--product-complements',
    (game, i) => {

      // Precio
      scrapper({
        priceElement: game.lastElementChild.querySelector(`[data-qa="add-ons-grid#${i}#price#display-price"]`),
        eventElement: game.lastElementChild.querySelector(`[data-qa="add-ons-grid#${i}#price#display-price"]`),
        currency: 'US',
        showEmoji: true,
      })
    }
  );
}

function handlePlaystationGames() {

  handleMutations(
    '.game-hero__title-content',
    'playstation--games',
    (game) => {
      for (let offerNum = 0; offerNum < 2; offerNum++) {
        // Precio
        scrapper({
          priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          currency: 'US',
          showEmoji: true,
        })

        // Precio Regular
        scrapper({
          priceElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#originalPrice"]`),
          eventElement: game.querySelector(`[data-qa="mfeCtaMain#offer${offerNum}#finalPrice"]`),
          currency: 'US',
          showEmoji: false,
        })
      }
    }
  );
}

function handlePlaystationGamesEditions() {

  handleMutations(
    '[data-qa="mfeUpsell"] article',
    'playstation--games-editions',
    (game, i) => {

      // Precio
      scrapper({
        priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        currency: 'US',
        showEmoji: true,
      })

      // Precio Regular
      scrapper({
        priceElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#originalPrice"]`),
        eventElement: game.querySelector(`[data-qa="mfeUpsell#productEdition${i}#ctaWithPrice#offer0#finalPrice"]`),
        currency: 'US',
        showEmoji: false,
      })
    }
  );
}

/*
 * Calculate final price with taxesAppend calculated price badge to each game card and popup
 * then append a badge to each game card
 *
 * Tested on:
 * https://store.playstation.com/es-ar/category/024029c7-f61b-4bef-a4d7-06270ed12b56
*/
function handlePlaystationCategory() {
  const gameCards = document.querySelectorAll('.psw-product-tile__details');

  if (gameCards.length > 0) {
    for (const card of gameCards) {
      if (card.className.includes('impuestito') === false) {
        const price = getPriceWithTaxes(card, '.psw-m-r-3', tax, 'US');
        drawBadge(price, card);
        card.classList.add('impuestito');
      }
    }
  }
}