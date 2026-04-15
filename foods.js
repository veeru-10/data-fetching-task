async function fetchFoodData(displayFoodData) {
  const container = document.getElementById("container");
  container.innerHTML = `
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  <div class="summerUi container-fluid border border-black m-2 p-2 border rounded shadow"></div>
  `;
  let response = await fetch("https://foods-two-iota.vercel.app/api/foods");
  let data = await response.json();
  displayFoodData(data)

}

function getFoodData(foodItems) {
  const container = document.getElementById("container");
  const filterByCategory = document.getElementById("foodItemsDropdown");
  const filterByPrice = document.getElementById("foodPriceDropdown");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  let categoryValue = "all";
  let priceValue = "all";
  let searchValue = "";
  
  function displayFilteredItems() {
    let filteredItems = foodItems;
    if(categoryValue !== "all") {
      filteredItems = filteredItems.filter(item => item.category === categoryValue);
    }
    if(priceValue !== "all") {
      const [minPrice, maxPrice] = priceValue.split("-").map(Number);
      filteredItems = filteredItems.filter(item => item.price >= minPrice && item.price <= maxPrice);
    }
    if(searchValue !== "") {
      filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue) || item.category.toLowerCase().includes(searchValue));
    }

    if(filteredItems.length === 0) {
      container.innerHTML = `<p class="text-center mt-5 text-muted fs-5">so sorry, No items found. Try out something else😋🍂.</p>`;
      return;
    }

    const foodHtml = filteredItems.map((foodItem)=>`
      <div class="food-item container-fluid border border-black m-2 p-2 border rounded shadow">
        <img class="food-img img-thumbnail w-100" src=${foodItem.image}>
        <p class="food-name fw-bold text-primary my-1">${foodItem.name}</p>
        <p class="food-category mb-1 mt-1 text-muted">category : <span class="text-danger food-catgory-name">${foodItem.category}</span></p>
        <p class="food-discription mb-1">${foodItem.description}</p>
        <p class="food-price mb-1">price : <span class="cost text-success fw-bold">${foodItem.price}</span></p>
      </div>
    `).join('');
    container.innerHTML = foodHtml;
  }

  filterByCategory.addEventListener("change",(e)=> {
    categoryValue = e.target.value;
    filterByCategory.value = categoryValue;
    displayFilteredItems();
  });
  filterByPrice.addEventListener("change", (e)=> {
    priceValue = e.target.value;
    filterByPrice.value = priceValue;
    displayFilteredItems();
  });
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchValue = searchInput.value.toLowerCase();
    displayFilteredItems();
  });
  searchInput.addEventListener("input", (e) => {
    searchValue = e.target.value.toLowerCase();
    displayFilteredItems();
  });

  displayFilteredItems();
}

fetchFoodData(getFoodData);

// ----dark mode logic----/
const darkMode = document.getElementById("mode-switch");
const img = document.getElementById("mode-switch-img");
const body = document.getElementById("body");

function toggleTheme() {
  if(body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    img.setAttribute("src", "./night-mode.png")
    img.setAttribute("alt", "dark-mode")
    darkMode.setAttribute("style", "background-color: rgba(0, 0, 0, 0.688);")
    localStorage.setItem("theme", "light");  // Save to localStorage
  }else {
    body.classList.add("dark-mode");
    img.setAttribute("src", "./light-mode.png")
    img.setAttribute("alt", "light-mode")
    darkMode.setAttribute("style", "background-color: #83a000")
    localStorage.setItem("theme", "dark");  // Save to localStorage
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme === "dark") {
    body.classList.add("dark-mode");
    img.setAttribute("src", "./light-mode.png")
    img.setAttribute("alt", "light-mode")
    darkMode.setAttribute("style", "background-color: #83a000")
  } else {
    body.classList.remove("dark-mode");
    img.setAttribute("src", "./night-mode.png")
    img.setAttribute("alt", "dark-mode")
    darkMode.setAttribute("style", "background-color: rgba(0, 0, 0, 0.688);")
  }
}

// Load theme on page load
loadTheme();

darkMode.addEventListener("click", () => {
  toggleTheme();
})