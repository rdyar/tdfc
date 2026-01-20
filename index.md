---
layout: default
title: The Dyar Family Recipes
description: Our families favorite recipes.
active: yes
---

![One of the original Cookbooks from 1995]({{site.baseurl}}/assets/images/the-cookbook.jpg)
{: .img-responsive}

**This Cookbook is Dedicated to the Memory of my Grandmothers**

by Deborah Dyar  
<small>- December 1995 (original publish date)</small>

## Helpful Hints

---

Mom hardly ever adds salt to a recipe. She either leaves it out or reduces the amount, except in a few recipes where it mixes with baking soda/powder to make dough rise.

When using canned tomatoes, always rinse can in a small amount of water and add to recipe.

When boiling chicken, save the leftover broth. It freezes well and can be used in many recipes. If you don't have real chicken broth available for a recipe, use canned broth or bullion cubes (1 cube to a cup of boiling water).

Mom makes her recipes based on what is in the kitchen, if an ingredient is missing, she either substitutes another or leaves it out. (This only works for the variables (vegetables, fruits...) in a recipe, not the core ingredients like flour, baking soda/powder...).

Use lemon pepper instead of black pepper in a recipe. It adds more flavor.

Use only a heavy Teflon skillet. If you don't have one, you will need to add more butter or liquid to your recipe.

Mom's best piece of advice is: "Learn the basics, then experiment!"

## Cuts of Meat

---

Oven Roast: use a rump roast or watermelon cut. Roast at 325 degrees for % hour per pound.  
Use leftovers in soup.  
Pot Roast: Chuck or any flat cut. Use left overs in Hash.  
Ham cuts: Butt cut is the best, a more center cut meat.

Shank cut has more bone.  
Top Sirloin steak: Mom's choice to use to marinate and barbecue.

3 teaspoons = 1 Tablespoon

16 Tablespoons = 1 cup

3 Tablespoons cocoa + 1 Tablespoon oil = 1 square baking chocolate

## Search Recipes

---

<div style="margin-bottom: 2rem; position: relative; z-index: 1;">
  <input type="text" id="recipe-search" placeholder="Search recipes by name, ingredient, or keyword..." style="width: 100%; padding: 0.75rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; position: relative; z-index: 10; pointer-events: auto;" autocomplete="off">
</div>

<div id="odds-and-ends-section">
<h2>Odds and Ends</h2>


<div id="odds-and-ends-recipes"></div>
</div>

<div id="soup-and-salad-section">
<h2>Soups and Salads</h2>


<div id="soup-and-salad-recipes"></div>
</div>

<div id="main-courses-section">
<h2>Main Courses / Vegetables</h2>


<div id="main-courses-recipes"></div>
</div>

<div id="desserts-section">
<h2>Desserts</h2>


<div id="desserts-recipes"></div>
</div>

<script>
(function() {
  let allRecipes = [];
  const categoryMap = {
    'odds-and-ends': 'odds-and-ends-recipes',
    'soup-and-salad': 'soup-and-salad-recipes',
    'main-courses': 'main-courses-recipes',
    'desserts': 'desserts-recipes'
  };
  const sectionMap = {
    'odds-and-ends': 'odds-and-ends-section',
    'soup-and-salad': 'soup-and-salad-section',
    'main-courses': 'main-courses-section',
    'desserts': 'desserts-section'
  };

  function renderRecipes(recipes, searchQuery = '') {
    // Group recipes by category
    const recipesByCategory = {
      'odds-and-ends': [],
      'soup-and-salad': [],
      'main-courses': [],
      'desserts': []
    };

    recipes.forEach(recipe => {
      if (recipesByCategory[recipe.category]) {
        recipesByCategory[recipe.category].push(recipe);
      }
    });

    // Render each category
    Object.keys(categoryMap).forEach(category => {
      const container = document.getElementById(categoryMap[category]);
      const section = document.getElementById(sectionMap[category]);
      const categoryRecipes = recipesByCategory[category] || [];
      
      if (categoryRecipes.length === 0) {
        container.innerHTML = '';
        if (section) {
          section.style.display = 'none';
        }
        return;
      }

      // Show the section if it was hidden
      if (section) {
        section.style.display = '';
      }

      let html = categoryRecipes.map(recipe => {
        const reviewBadge = recipe.needsReview ? ' <span style="color:red;"> Needs Review!</span>' : '';
        return `<a href="${recipe.url}">${recipe.title}</a>${reviewBadge}`;
      }).join('<br>');

      container.innerHTML = html;
    });
  }

  function filterRecipes(searchQuery) {
    if (!searchQuery.trim()) {
      renderRecipes(allRecipes);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allRecipes.filter(recipe => {
      const titleMatch = recipe.title.toLowerCase().includes(query);
      const contentMatch = recipe.content.toLowerCase().includes(query);
      return titleMatch || contentMatch;
    });

    renderRecipes(filtered, searchQuery);
  }

  // Set up search input listener
  function setupSearchInput() {
    const searchInput = document.getElementById('recipe-search');
    if (!searchInput) {
      console.error('Search input not found');
      return;
    }
    
    // Ensure input is not disabled
    searchInput.disabled = false;
    searchInput.readOnly = false;
    
    // Add event listener
    searchInput.addEventListener('input', function(e) {
      filterRecipes(e.target.value);
    });
    
    // Also try keyup as fallback
    searchInput.addEventListener('keyup', function(e) {
      filterRecipes(e.target.value);
    });
    
    console.log('Search input setup complete');
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSearchInput);
  } else {
    // DOM already ready, but wait a tick to ensure everything is rendered
    setTimeout(setupSearchInput, 0);
  }

  // Load recipes from JSON
  fetch('{{site.baseurl}}/recipes.json')
    .then(response => response.json())
    .then(recipes => {
      allRecipes = recipes;
      renderRecipes(recipes);
    })
    .catch(error => {
      console.error('Error loading recipes:', error);
      // Fallback: show error message
      Object.values(categoryMap).forEach(id => {
        const container = document.getElementById(id);
        if (container) {
          container.innerHTML = '<p style="color:red;">Error loading recipes. Please refresh the page.</p>';
        }
      });
    });
})();
</script>

 <div class="comments pad-top">
          <h3>What people are saying:</h3><hr>
          {% assign comments = site.data.comments | sort %}
          {% for comment in comments %}

{% for subcomment in comment[1] %}
{% assign name = subcomment[1].name %}
{% assign date = subcomment[1].date %}
{% assign message = subcomment[1].message %}
{% assign about = comment[0] %}

<article class="comment">

   <div class="comment__content-wrapper">
    <h4>{{name}}</h4>
   <small>{{about}}</small><br>
 {{ message  }}
        <small> - <time datetime="{{ date | date_to_xmlschema }}" itemprop="datePublished">{{ date | date: "%B %d, %Y" }}</time></small>
  
  </div>
  <hr>
</article>

{% endfor %}

{% endfor %}

</div>
