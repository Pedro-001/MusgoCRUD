
const productsMock = [
    {
      name: "Betta Comun Macho",
      price: "40",
      category: "pez",
      type: "Betta",
      careLevel: "facil",
      temperament: "Agresivo",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ultrices magna, pulvinar semper justo. Sed tempor non felis ut dictum. Suspendisse id tellus vitae massa posuere blandit. Aliquam sollicitudin purus id convallis iaculis. Vestibulum turpis dolor, rutrum et tellus eget, tristique scelerisque odio. Phasellus id massa efficitur, vehicula massa eget, commodo risus. Maecenas laoreet nec dui in feugiat. Phasellus et turpis blandit, finibus nulla a, congue dui. Donec eget fringilla eu.",
      image: "https://drive.google.com/file/d/1SYC7DbrMTDNbv7Jk7Oa7BqdiQQzOotAt/view?usp=sharing",
      tags: ["facil","colores", "regular"]
    },
    {
      name: "Sumatrano rojo",
      price: "35",
      category: "pez",
      type: "barbo",
      careLevel: "Medio",
      temperament: "medio",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ultrices magna, pulvinar semper justo. Sed tempor non felis ut dictum. Suspendisse id tellus vitae massa posuere blandit. Aliquam sollicitudin purus id convallis iaculis. Vestibulum turpis dolor, rutrum et tellus eget, tristique scelerisque odio. Phasellus id massa efficitur, vehicula massa eget, commodo risus. Maecenas laoreet nec dui in feugiat. Phasellus et turpis blandit, finibus nulla a, congue dui. Donec eget fringilla eu.",
      image: "https://drive.google.com/file/d/18dJ8wgP2ISsAgYfqhNhrVDIN7qI3UGCm/view?usp=sharing",
      tags: ["medio", "cardumen", "regular"]
    },
    {
      name: "Terror verde adulto",
      price: "200",
      category: "pez",
      type: "ciclido",
      careLevel: "Medio",
      temperament: "AltamenteAgresivo",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ultrices magna, pulvinar semper justo. Sed tempor non felis ut dictum. Suspendisse id tellus vitae massa posuere blandit. Aliquam sollicitudin purus id convallis iaculis. Vestibulum turpis dolor, rutrum et tellus eget, tristique scelerisque odio. Phasellus id massa efficitur, vehicula massa eget, commodo risus. Maecenas laoreet nec dui in feugiat. Phasellus et turpis blandit, finibus nulla a, congue dui. Donec eget fringilla eu.",
      image: "https://drive.google.com/file/d/1UqjN-Am7OSjn_BNW1P1Gm4I2Tf2LTgF9/view?usp=sharing",
      tags: ["agresivo", "caro", "medio"]
    }
]

function filteredProductsMock(tag) {
  return productsMock.filter(product => product.tags.includes(tag));
}

class ProductsServiceMock {
  async getProducts() {
    return Promise.resolve(productsMock);
  }

  async createProduct() {
    return Promise.resolve("6bedb1267d1ca7f3053e2875");
  }
}

module.exports = {
  productsMock,
  filteredProductsMock,
  ProductsServiceMock
};




 