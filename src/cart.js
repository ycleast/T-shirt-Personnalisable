let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item, customizations } = x;
        let search = shopItemsData.find((y) => y.id === id) || {};

        let cartItemImage = search.img;
        if (customizations && customizations.color && customizations.design &&
            search.options && search.options.colors[customizations.color] &&
            search.options.colors[customizations.color].designs[customizations.design]) {
          cartItemImage = search.options.colors[customizations.color].designs[customizations.design];
        }

        let displayCustomizations = '';
        if (customizations && Object.keys(customizations).length > 0) {
          displayCustomizations += '<p class="item-customizations">';
          if (customizations.size) displayCustomizations += `Taille: ${customizations.size} | `;
          if (customizations.color) displayCustomizations += `Couleur: ${customizations.color} | `;
          if (customizations.design) displayCustomizations += `Design: ${customizations.design}`;
          displayCustomizations = displayCustomizations.replace(/ \| $/, '');
          displayCustomizations += '</p>';
        }

        return `
          <div class="cart-item">
            <img width="100" src=${cartItemImage} alt="" />
            <div class="details">

              <div class="title-price-x">
                  <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price">$ ${search.price}</p>
                  </h4>
                  <i onclick="removeItem('${id}')" class="bi bi-x-lg"></i>
              </div>

              ${displayCustomizations}

              <div class="buttons">
                  <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${item}</div>
                  <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
              </div>

              <h3>$ ${item * search.price}</h3>
            </div>
          </div>
          `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2>Le panier est vide</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to Home</button>
      </a>
      `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) {
    const productData = shopItemsData.find(x => x.id === selectedItem);
    let initialCustomizations = {};
    if (productData && productData.options) {
      const defaultSize = productData.options.sizes[0];
      const defaultColor = Object.keys(productData.options.colors)[0];
      const defaultDesign = Object.keys(productData.options.colors[defaultColor].designs)[0];
      initialCustomizations = { size: defaultSize, color: defaultColor, design: defaultDesign };
    }
    basket.push({
      id: selectedItem,
      item: 1,
      customizations: initialCustomizations
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems(); // Re-génère les éléments pour retirer celui qui est à 0
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search) {
    document.getElementById(id).innerHTML = search.item;
  } else {
    document.getElementById(id).innerHTML = 0;
  }
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem);
  generateCartItems(); // Re-génère les éléments pour retirer celui qui est supprimé
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

// Fonction pour vider complètement le panier
let clearCart = () => {
  basket = []; // Réinitialise le tableau du panier à vide
  generateCartItems(); // Met à jour l'affichage pour montrer que le panier est vide
  localStorage.setItem("data", JSON.stringify(basket)); // Vide le panier dans le stockage local
  calculation(); // Met à jour le compteur d'articles dans le panier (en haut)
  TotalAmount(); // Met à jour le total de la facture (qui devrait être 0)
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
      <h2>Total de la facture : $ ${amount}</h2>
      <button class="checkout">Paiement</button>
      <button onclick="clearCart()" class="removeAll">Clear Data</button>
      `;
  } else {
    // Si le panier est vide, affiche le message "Panier vide"
    label.innerHTML = `
      <h2>Le panier est vide</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to Home</button>
      </a>
      `;
  }
};

TotalAmount();