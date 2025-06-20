let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img, options } = x;
      let search = basket.find((x) => x.id === id) || {};

      // Déterminer l'image à afficher (par défaut ou personnalisée)
      let currentImage = img;
      if (search.customizations && search.customizations.color && search.customizations.design) {
        const selectedColor = search.customizations.color;
        const selectedDesign = search.customizations.design;
        if (options && options.colors && options.colors[selectedColor] && options.colors[selectedColor].designs[selectedDesign]) {
          currentImage = options.colors[selectedColor].designs[selectedDesign];
        }
      }

      let customizationHtml = '';
      if (options) { // Vérifie si l'article a des options de personnalisation
        // Aperçu de la sélection actuelle pour la carte produit
        const currentSelectionSummary = search.customizations && search.customizations.size && search.customizations.color && search.customizations.design ?
          `Taille: ${search.customizations.size}, Couleur: ${search.customizations.color}, Design: ${search.customizations.design}`
          : 'Non personnalisé';

        customizationHtml += `
          <div class="custom-options-container">
            <button class="customize-btn" onclick="toggleCustomizationMenu('${id}')">
              Personnaliser
              <span class="current-selection-summary">${currentSelectionSummary}</span>
            </button>

            <div id="custom-menu-${id}" class="customization-menu">
              <div class="custom-option">
                <label for="size-${id}">Taille:</label>
                <select id="size-${id}" onchange="updateCustomization('${id}')">
                  ${options.sizes.map(s => `<option value="${s}" ${search.customizations && search.customizations.size === s ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
              </div>

              <div class="custom-option">
                <label for="color-${id}">Couleur:</label>
                <select id="color-${id}" onchange="updateCustomization('${id}')">
                  ${Object.keys(options.colors).map(c => `<option value="${c}" ${search.customizations && search.customizations.color === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>

              <div class="custom-option">
                <label for="design-${id}">Design:</label>
                <select id="design-${id}" onchange="updateCustomization('${id}')">
                  ${Object.keys(options.colors[search.customizations?.color || Object.keys(options.colors)[0]].designs).map(d => `<option value="${d}" ${search.customizations && search.customizations.design === d ? 'selected' : ''}>${d}</option>`).join('')}
                </select>
              </div>
              <button class="close-custom-menu" onclick="toggleCustomizationMenu('${id}')">Fermer</button>
            </div>
          </div>
        `;
      }

      return `
        <div id=product-id-${id} class="item">
            <img width="220" id="img-${id}" src=${currentImage} alt="">
            <div class="details">
              <h3>${name}</h3>
              <p>${desc}</p>
              ${customizationHtml} <div class="price-quantity">
                <h2>$ ${price} </h2>
                <div class="buttons">
                  <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">
                  ${search.item === undefined ? 0 : search.item}
                  </div>
                  <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                </div>
              </div>
            </div>
          </div>
        `;
    })
    .join(""));
};

generateShop();

// Fonction pour ouvrir/fermer le menu de personnalisation
let toggleCustomizationMenu = (id) => {
  const menu = document.getElementById(`custom-menu-${id}`);
  if (menu) {
    menu.classList.toggle('active'); // Ajoute ou retire la classe 'active'
    // Fermer les autres menus ouverts (optionnel mais recommandé)
    document.querySelectorAll('.customization-menu.active').forEach(openMenu => {
      if (openMenu.id !== `custom-menu-${id}`) {
        openMenu.classList.remove('active');
      }
    });
  }
};


// Fonction pour mettre à jour la personnalisation et l'image
let updateCustomization = (id) => {
  const selectedItem = shopItemsData.find((x) => x.id === id);
  if (!selectedItem || !selectedItem.options) return;

  const sizeSelect = document.getElementById(`size-${id}`);
  const colorSelect = document.getElementById(`color-${id}`);
  const designSelect = document.getElementById(`design-${id}`);

  const selectedSize = sizeSelect ? sizeSelect.value : null;
  const selectedColor = colorSelect ? colorSelect.value : null;
  const selectedDesign = designSelect ? designSelect.value : null;

  let cartItem = basket.find((x) => x.id === id);

  if (!cartItem) {
    cartItem = { id: id, item: 0, customizations: {} };
    basket.push(cartItem);
  }

  cartItem.customizations = {
    size: selectedSize,
    color: selectedColor,
    design: selectedDesign
  };

  const imgElement = document.getElementById(`img-${id}`);
  if (imgElement && selectedColor && selectedDesign && selectedItem.options.colors[selectedColor] && selectedItem.options.colors[selectedColor].designs[selectedDesign]) {
    imgElement.src = selectedItem.options.colors[selectedColor].designs[selectedDesign];
  } else {
    imgElement.src = selectedItem.img;
  }

  // Mettre à jour l'aperçu dans le bouton
  const summarySpan = document.querySelector(`#product-id-${id} .current-selection-summary`);
  if (summarySpan) {
    summarySpan.textContent = `Taille: ${selectedSize || 'N/A'}, Couleur: ${selectedColor || 'N/A'}, Design: ${selectedDesign || 'N/A'}`;
  }

  localStorage.setItem("data", JSON.stringify(basket));
};


let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) {
    const productData = shopItemsData.find(x => x.id === selectedItem);
    let initialCustomizations = {};
    if (productData && productData.options) {
      // Tenter d'utiliser les options actuellement sélectionnées dans les sélecteurs
      const sizeSelect = document.getElementById(`size-${id}`);
      const colorSelect = document.getElementById(`color-${id}`);
      const designSelect = document.getElementById(`design-${id}`);

      const selectedSize = sizeSelect ? sizeSelect.value : productData.options.sizes[0];
      const selectedColor = colorSelect ? colorSelect.value : Object.keys(productData.options.colors)[0];
      const selectedDesign = designSelect ? designSelect.value : Object.keys(productData.options.colors[selectedColor || Object.keys(productData.options.colors)[0]].designs)[0];

      initialCustomizations = {
        size: selectedSize,
        color: selectedColor,
        design: selectedDesign
      };
    }

    basket.push({
      id: selectedItem,
      item: 1,
      customizations: initialCustomizations
    });
  } else {
    search.item += 1;
  }

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
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

// Fermer le menu si l'utilisateur clique en dehors (optionnel mais très recommandé)
document.addEventListener('click', (event) => {
  document.querySelectorAll('.customization-menu.active').forEach(menu => {
    // Vérifie si le clic est en dehors du menu et en dehors du bouton qui l'ouvre
    if (!menu.contains(event.target) && !event.target.closest('.customize-btn')) {
      menu.classList.remove('active');
    }
  });
});