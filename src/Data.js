let shopItemsData = [
  {
    id: "tshirt-bleu",
    name: "T-shirt Personnalisable",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    // Options spécifiques pour le T-shirt bleu
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: {
        "bleu": {
          designs: {
            "texte": "images/tshirt_bleu_texte.png",
            "image": "images/tshirt_bleu_image.png",
            "logo": "images/tshirt_bleu_logo.png"
          }
        },
        "blanc": { // Permettre de changer vers d'autres couleurs
          designs: {
            "texte": "images/tshirt_blanc_texte.png",
            "image": "images/tshirt_blanc_image.png",
            "logo": "images/tshirt_blanc_logo.png"
          }
        },
        "noir": {
          designs: {
            "texte": "images/tshirt_noir_texte.png",
            "image": "images/tshirt_noir_image.png",
            "logo": "images/tshirt_noir_logo.png"
          }
        },
        "rouge": {
          designs: {
            "texte": "images/tshirt_rouge_texte.png",
            "image": "images/tshirt_rouge_image.png",
            "logo": "images/tshirt_rouge_logo.png"
          }
        }
      }
    },
    img: "images/tshirt_bleu_image.png" // Image par défaut du T-shirt bleu
  },
  {
    id: "tshirt-noir",
    name: "T-shirt Personnalisable",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    // Options spécifiques pour le T-shirt noir
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: {
        "noir": {
          designs: {
            "texte": "images/tshirt_noir_texte.png",
            "image": "images/tshirt_noir_image.png",
            "logo": "images/tshirt_noir_logo.png"
          }
        },
        "bleu": {
          designs: {
            "texte": "images/tshirt_bleu_texte.png",
            "image": "images/tshirt_bleu_image.png",
            "logo": "images/tshirt_bleu_logo.png"
          }
        },
        "blanc": {
          designs: {
            "texte": "images/tshirt_blanc_texte.png",
            "image": "images/tshirt_blanc_image.png",
            "logo": "images/tshirt_blanc_logo.png"
          }
        },
        "rouge": {
          designs: {
            "texte": "images/tshirt_rouge_texte.png",
            "image": "images/tshirt_rouge_image.png",
            "logo": "images/tshirt_rouge_logo.png"
          }
        }
      }
    },
    img: "images/tshirt_noir_image.png" // Image par défaut du T-shirt noir
  },
  {
    id: "tshirt-rouge",
    name: "T-shirt Personnalisable",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    // Options spécifiques pour le T-shirt rouge
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: {
        "rouge": {
          designs: {
            "texte": "images/tshirt_rouge_texte.png",
            "image": "images/tshirt_rouge_image.png",
            "logo": "images/tshirt_rouge_logo.png"
          }
        },
        "bleu": {
          designs: {
            "texte": "images/tshirt_bleu_texte.png",
            "image": "images/tshirt_bleu_image.png",
            "logo": "images/tshirt_bleu_logo.png"
          }
        },
        "noir": {
          designs: {
            "texte": "images/tshirt_noir_texte.png",
            "image": "images/tshirt_noir_image.png",
            "logo": "images/tshirt_noir_logo.png"
          }
        },
        "blanc": {
          designs: {
            "texte": "images/tshirt_blanc_texte.png",
            "image": "images/tshirt_blanc_image.png",
            "logo": "images/tshirt_blanc_logo.png"
          }
        }
      }
    },
    img: "images/tshirt_rouge_image.png" // Image par défaut du T-shirt rouge
  },
  {
    id: "tshirt-blanc",
    name: "T-shirt Personnalisable",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    // Options spécifiques pour le T-shirt blanc
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: {
        "blanc": {
          designs: {
            "texte": "images/tshirt_blanc_texte.png",
            "image": "images/tshirt_blanc_image.png",
            "logo": "images/tshirt_blanc_logo.png"
          }
        },
        "bleu": {
          designs: {
            "texte": "images/tshirt_bleu_texte.png",
            "image": "images/tshirt_bleu_image.png",
            "logo": "images/tshirt_bleu_logo.png"
          }
        },
        "noir": {
          designs: {
            "texte": "images/tshirt_noir_texte.png",
            "image": "images/tshirt_noir_image.png",
            "logo": "images/tshirt_noir_logo.png"
          }
        },
        "rouge": {
          designs: {
            "texte": "images/tshirt_rouge_texte.png",
            "image": "images/tshirt_rouge_image.png",
            "logo": "images/tshirt_rouge_logo.png"
          }
        }
      }
    },
    img: "images/tshirt_blanc_image.png" // Image par défaut du T-shirt blanc
  },
  // {
  //   id: "ioytrhndcv",
  //   name: "Chemise de bureau",
  //   price: 100,
  //   desc: "Une chemise élégante pour le travail.",
  //   img: "images/chemise_bureau.png", // Exemple pour un article non personnalisable
  // },
  // ... Ajoutez d'autres articles ici
];