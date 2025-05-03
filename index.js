let allProducts = [];

fetch('https://fakestoreapi.com/products?limit=100')
  .then(response => response.json())
  .then(data => {
    allProducts = data;
    updateDisplay();
  })
  .catch(error => {
    console.error('Ошибка загрузки данных:', error);
  });

const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const categorySelect = document.getElementById('categorySelect');

searchInput.addEventListener('input', updateDisplay);
sortSelect.addEventListener('change', updateDisplay);
categorySelect.addEventListener('change', updateDisplay);

function updateDisplay() {
  const query = searchInput.value.toLowerCase();
  const sort = sortSelect.value;
  const selectedCategory = categorySelect.value;

  let filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(query)
  );

  if (selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  if (sort === 'cheap') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'expensive') {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

function displayProducts(products) {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">$${product.price}</p>
    `;
    list.appendChild(card);
  });
}
