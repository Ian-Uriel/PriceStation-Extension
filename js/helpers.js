/** Parametros
 * @param  {string} gamesSelector
 * @param  {string} className
 * @param  {Function} callback
 */

function handleMutations(gamesSelector, className, callback) { // checkea si los juegos tienen el classname "Impuestito"
  const games = document.querySelectorAll(gamesSelector);

  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (game.className.includes('impuestito')) return;

      callback(game, i);

      game.classList.add('impuestito', className);
    }
  }
}

/** Convertir Precios a ARS
 * @param  {string} originalPrice
 * @param  {object} fees
 * @param  {string} currency
 * @returns {number}
 */

 function getNewPrice(originalPrice, fees, currency){
  const exceptions = ['Free', 'FREE', 'Gratuito', 'Gratis', 'Gratis+', 'No disponible', '--'];
   const priceTextNaN = exceptions.some(exception => exception.toLowerCase() === originalPrice.toLowerCase());
   const priceWithFees = (p) => (p + p * (fees.ganancias + fees.pais)).toFixed(2);

  if (priceTextNaN){
    return 0;
  }

   const priceNumber = sanitizePricePunctuation(sanitizePriceSigns(originalPrice));
  if (priceNumber === 0){
    return 0;
  }

   if (currency === 'US'){
     const newPrice = priceNumber * sanitizePricePunctuation(dollar.data.venta);
     return priceWithFees(newPrice);
   }

   return priceWithFees(priceNumber);
 }

/*  Monto Con Impuestos
 *
 * @param  {object} containerDOMElement
 * @param  {string} priceDOMElement
 * @param  {object} fees
 * @param  {string} currency
 * @returns {number}
 */

function getPriceWithFees(containerDOMElement, priceDOMElement, fees, currency = 'ARS'){
  const priceText = containerDOMElement.querySelector(priceDOMElement).textContent;
  const priceIsFree = priceText.includes('Free' || priceText.includes('FREE') || priceText.includes('Gratuito'));
  const priceWithFees = (p) => (p + p * (fees.ganancias + fees.pais)).toFixed(2);

  if (priceIsFree){
    return 0;
  }

  const price = sanitizePricePunctuation(sanitizePriceSigns(priceText));
  if (price === 0){
    return 0;
  }

  if (currency === 'US'){
    const priceARS = price * sanitizePricePunctuation(dollar.data.venta);
    return priceWithFees(priceARS);
  }
  return priceWithFees(price);
}

/** Reemplazar PRECIO
 * @param  {object} priceElement
 * @param  {object} eventElement
 * @param  {string} originalPrice
 * @param  {number} newPrice
 * @param  {boolean} showEmoji
 */

function replacePrice(priceElement, eventElement = priceElement, originalPrice, newPrice, ShowEmoji = true){
  const originalEmoji = ShowEmoji ? '🗽' : '';
  const newEmoji = ShowEmoji ? '🧉' : '';

  priceElement.textContent = `${newEmoji}${priceFormatter(newPrice)}`;
  priceElement.classList.add('priceWithFees');

  eventElement.addEventListener('mouseenter', (e) => {
  e.preventDefault();
  priceElement.setAttribute('title', 'Precio Original');
  priceElement.textContent = `${originalEmoji}${originalPrice}`;
  });

  eventElement.addEventListener('mouseleave', (e) => {
    e.preventDefault();
    priceElement.setAttribute('title', 'Precio (AR$) con impuestos incuidos');
    priceElement.textContent = `${newEmoji}${priceFormatter(newPrice)}`;
  });
}

/** Cambia los valores 
 * @param  {object} {priceElement
 * @param  {object} eventElement
 * @param  {string} currency
 * @param  {boolean} showEmoji}
 */

function scrapper({ priceElement, eventElement, currency, showEmoji }) {
  if (priceElement) {
    const originalPrice = priceElement.textContent;
    const newPrice = getNewPrice(originalPrice, tax, currency);
    if (isNaN(newPrice)){
      return originalPrice;
    }
    newPrice && replacePrice(priceElement, eventElement, originalPrice, newPrice, showEmoji);
  }
}

/** Ingresa los datos en la pagina
 * @param  {number} price
 * @param  {object} targetDOMElement
 */

function drawbadge(price, targetDOMElement){
  const badge = document.createElement('p');
  badge.innerText = price === 0 ? 'Gratis' : `AR${priceFormatter(price)}`;
  badge.setAttribute('title', 'Este es el precio real que vas a pagar (incluye impuestos)');
  badge.classList.add('priceWithFeesBadge');

  targetDOMElement.appendChild(badge);
}

/**Cambia Formato de la moneda
 * @param  {number} price
 * @param  {string} format
 * @param  {string} currency
 * @returns {string}
 */

function priceFormatter(price, format = 'es-AR' , currency = 'ARS'){
  const formatter = new Intl.NumberFormat(format, {
    style: 'currency',
    currency: currency
  });

  return formatter.format(price);
}

/** Signo
 * @param  {string} price
 * @returns {string}
 */
function sanitizePriceSigns(price){
  /**
   * Tested on:
   *
   * ARS$ 1,222.43
   * US$ 1,222.43
   * $ 1,222.43
   *  ARS$ 1,222.43
   * ARS$1,222.43
   * ARS$ 1,222.43+
   * US$ 1,222.43+
   * $ 1,222.43+
   *  ARS$ 1,222.43 +
   * ARS$1,222.43 +
   * * ARS$ 1,222.43 +
   * US$ 1,222.43 +
   * $ 1,222.43 +
   *  ARS$ 1,222.43 +
   * ARS$1,222.43 +
   */
  return price.replace(/^\s*[a-zA-z]*?\$\s?(\d+\W?\d+\W?\d+)\s?\+?/gi, '$1');
}

/** Puntuacion
 * @param  {string} price
 * @returns {number}
 */
function sanitizePricePunctuation(price){
/**
   * Tested on:
   *
   * 1.234,55
   * 1,234.55
   * 1234,55
   * 1234.55
   * 111,22
   * 111.22
   * 11,22
   * 11.22
   * 1,22
   * 1.22
   * 1,2
   * 1.2
   */
  
  return +price.replace(/(\d?)[\.|\,]?(.+)[\,|\.](\d{1,2})/gi, '$1$2.$3');
}
/**
 * @param  {array} arr
 */
function someURL(arr, url = pathname){
  return arr.some(w => url.includes(w));
}