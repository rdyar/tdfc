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
  <input type="search" id="recipe-search" placeholder="Search recipes by name, ingredient, or keyword..." style="max-width: 400px; padding: 0.75rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; position: relative; z-index: 10; pointer-events: auto;" autocomplete="off">
</div>
<div id="no-results-message" style="display: none; margin-bottom: 2rem; padding: 1rem; text-align: center; color: #666; font-style: italic;">
  No recipes found matching your search.
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

    // Check if there are any results at all
    const totalRecipes = Object.values(recipesByCategory).reduce((sum, arr) => sum + arr.length, 0);
    const noResultsMessage = document.getElementById('no-results-message');
    
    // Show/hide no results message
    if (searchQuery && totalRecipes === 0) {
      if (noResultsMessage) {
        noResultsMessage.style.display = 'block';
      }
    } else {
      if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
      }
    }

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
        return `<a href="${recipe.url}">${recipe.title}</a>`;
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

<!-- Recent Google Form Comments -->
<div class="comments pad-top">
  <h3>Recent Comments:</h3>
  <hr>
  <div id="recent-google-comments"></div>
</div>

<script>
(function() {
  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFiZsdiSfpweFujBfp-H4TD_-6SVdU4lkuUoRBYnt3UsDOr_xFZc0RT5AqNk_FIdBRkkN6JCIYWJPb/pub?gid=1274664430&single=true&output=csv";
  const MAX_COMMENTS = 35; // Show most recent 15 comments
  
  // Format timestamp from "1/2/2026 13:45:12" to "1/2/2026 1:45 PM"
  function formatTimestamp(timeString) {
    try {
      // Parse the date string (format: "M/D/YYYY HH:MM:SS")
      const [datePart, timePart] = timeString.split(' ');
      if (!datePart || !timePart) return timeString;
      
      const [month, day, year] = datePart.split('/');
      const [hours, minutes] = timePart.split(':');
      
      const hour24 = parseInt(hours, 10);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const ampm = hour24 >= 12 ? 'PM' : 'AM';
      
      return `${month}/${day}/${year} ${hour12}:${minutes} ${ampm}`;
    } catch (e) {
      // If parsing fails, return original string
      return timeString;
    }
  }
  
  // Parse timestamp for sorting (convert to sortable format)
  function parseTimestampForSort(timeString) {
    try {
      const [datePart, timePart] = timeString.split(' ');
      if (!datePart || !timePart) return 0;
      
      const [month, day, year] = datePart.split('/').map(Number);
      const [hours, minutes, seconds] = timePart.split(':').map(Number);
      
      // Create a sortable timestamp (milliseconds since epoch)
      const date = new Date(year, month - 1, day, hours, minutes, seconds || 0);
      return date.getTime();
    } catch (e) {
      return 0;
    }
  }
  
  // Simple CSV parser that handles quoted fields
  function parseCSVRow(row) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      const nextChar = row[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add last field
    result.push(current.trim());
    return result;
  }
  
  // Get recipe name from path (e.g., "/desserts/chocolate-cake/" -> "Chocolate Cake")
  function getRecipeNameFromPath(path) {
    if (!path) return '';
    // Remove leading/trailing slashes and split
    const parts = path.replace(/^\/|\/$/g, '').split('/');
    if (parts.length < 2) return '';
    // Get the last part (recipe slug) and format it
    const slug = parts[parts.length - 1];
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  fetch(SHEET_URL)
    .then(r => r.text())
    .then(csv => {
      const rows = csv.split("\n").slice(1).filter(row => row.trim());
      const allComments = rows
        .map(parseCSVRow)
        .filter(cols => cols.length >= 4 && cols[0] && cols[1] && cols[2]) // Ensure we have time, name, and comment
        .map(cols => ({
          time: cols[0],
          name: cols[1],
          comment: cols[2],
          path: cols[3] || '',
          sortTime: parseTimestampForSort(cols[0])
        }));
      
      // Sort by timestamp (most recent first) and take top N
      const recentComments = allComments
        .sort((a, b) => b.sortTime - a.sortTime)
        .slice(0, MAX_COMMENTS);
      
      const container = document.getElementById("recent-google-comments");
      if (!container) return;
      
      if (!recentComments.length) {
        container.innerHTML = "<p>No comments yet.</p>";
        return;
      }
      
      container.innerHTML = recentComments
        .map(({ time, name, comment, path }) => {
          const recipeName = getRecipeNameFromPath(path);
          const recipeLink = path ? `<a href="{{site.baseurl}}${path}">${recipeName}</a>` : '';
          return `
            <article class="comment">
              <div class="comment__content-wrapper">
                <h4>${name}</h4>
                ${recipeLink ? `<small>${recipeLink}</small><br>` : ''}
                ${comment}
                <small> - ${formatTimestamp(time)}</small>
              </div>
              <hr>
            </article>
          `;
        })
        .join("");
    })
    .catch(error => {
      console.error('Error fetching recent comments:', error);
      const container = document.getElementById("recent-google-comments");
      if (container) {
        container.innerHTML = "<p>Error loading recent comments. Please try again later.</p>";
      }
    });
})();
</script>

<!-- Old Commenting System (no longer works) -->
 <div class="comments pad-top">
          <h3>Old Comments:</h3><hr>
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
