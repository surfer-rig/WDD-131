import recipes from './recipes.mjs';

// Get DOM elements
const recipesSection = document.getElementById('recipesSection');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// Utility: Get random number
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// Utility: Get random item from list
function getRandomListEntry(list) {
  return list[getRandomNumber(list.length)];
}

// Templates
function tagsTemplate(tags) {
  return tags.map(tag => `<li>${tag}</li>`).join('');
}

function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    html += `<span aria-hidden="true" class="${i <= rating ? 'icon-star' : 'icon-star-empty'}">${i <= rating ? '⭐' : '☆'}</span>`;
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `
    <article class="recipe">
      <img src="${recipe.image}" alt="image of ${recipe.name}" />
      <figcaption>
        <ul class="recipe__tags">${tagsTemplate(recipe.tags)}</ul>
        <h2><a href="#">${recipe.name}</a></h2>
        <p class="recipe__ratings">${ratingTemplate(recipe.rating)}</p>
        <p class="recipe__description">${recipe.description}</p>
      </figcaption>
    </article>
  `;
}

// Render Recipes
function renderRecipes(recipeList) {
  recipesSection.innerHTML = recipeList.map(recipeTemplate).join('');
}

// Filter Recipes
function filterRecipes(query) {
  const lowerQuery = query.toLowerCase();

  return recipes.filter(recipe => {
    const inName = recipe.name.toLowerCase().includes(lowerQuery);
    const inDesc = recipe.description.toLowerCase().includes(lowerQuery);
    const inTags = recipe.tags.find(tag => tag.toLowerCase().includes(lowerQuery));
    const inIngredients = recipe.recipeIngredient.find(ing => ing.toLowerCase().includes(lowerQuery));
    return inName || inDesc || inTags || inIngredients;
  }).sort((a, b) => a.name.localeCompare(b.name));
}

// Search Handler
function searchHandler(event) {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query === '') return;
  const filtered = filterRecipes(query);
  renderRecipes(filtered);
}

// Init
function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}

// Event listener
searchForm.addEventListener('submit', searchHandler);

// Load initial recipe
init();
