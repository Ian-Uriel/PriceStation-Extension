const devMode = false;

const dollarMock = {
  data: {
    "compra": "135,24",
    "venta": "143,70",
    "fecha": "22/08/2022 - 20:47",
    "variacion": "0,23%",
    "class-variacion": "up"
  }
}

const tax = {
  ganancias: 0.45,
  pais: 0.30,
}

let dollar;

const hostname = window.location.hostname;
const pathname = window.location.pathname;

// Obtener cotizacion del dolar
if (['playstation.com'].some(w => hostname.includes(w))) {
  if (devMode) {
    console.warn('--- RUNNING IN DEV MODE ---');
    dollar = dollarMock;
  } else {
    chrome.runtime.sendMessage('GET_DOLLAR_OFFICIAL', (response) => {
      dollar = response;
    })
  }
}

// HTML Mutations
const observer = new MutationObserver(handleMutationsInit);
const observerOptions = { subtree: true, attributes: true };

observer.observe(document, observerOptions);

// Asigna el correcto metodo de handleMutations segun el sitio y region
function handleMutationsInit() {

  setTimeout(() => {
    handlePlaystationMutations()
  }, 1000);
}