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
{: .pad-top}
--- 
Mom hardly ever adds salt to a recipe. She either leaves it out or reduces the amount, except in a few recipes where it mixes with baking soda/powder to make dough rise. 

When using canned tomatoes, always rinse can in a small amount of water and add to recipe. 

When boiling chicken, save the leftover broth. It freezes well and can be used in many recipes. If you don't have real chicken broth available for a recipe, use canned broth or bullion cubes (1 cube to a cup of boiling water). 

Mom makes her recipes based on what is in the kitchen, if an ingredient is missing, she either substitutes another or leaves it out. (This only works for the variables (vegetables, fruits...) in a recipe, not the core ingredients like flour, baking soda/powder...). 

Use lemon pepper instead of black pepper in a recipe. It adds more flavor. 

Use only a heavy Teflon skillet. If you don't have one, you will need to add more butter or liquid to your recipe. 

Mom's best piece of advice is: "Learn the basics, then experiment!" 



## Cuts of Meat
{: .pad-top}
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

## Odds and Ends
{: .pad-top} 
---
{% for recipe in site.odds-and-ends %}
[{{recipe.title}}]({{site.baseurl}}{{ recipe.url }}) {% if recipe.s %}<span style="color:red;"> Needs Review!</span>{% endif %}  {% endfor %}

## Soups and Salads
{: .pad-top}
---
{% for recipe in site.soup-and-salad %}
[{{recipe.title}}]({{site.baseurl}}{{ recipe.url }}) {% if recipe.s %}<span style="color:red;"> Needs Review!</span>{% endif %}  {% endfor %}

## Main Courses / Vegetables
{: .pad-top}
---
{% for recipe in site.main-courses %}
[{{recipe.title}}]({{site.baseurl}}{{ recipe.url }}) {% if recipe.s %}<span style="color:red;"> Needs Review!</span>{% endif %}  {% endfor %}

## Desserts 
{: .pad-top}
---
{% for recipe in site.desserts %}
[{{recipe.title}}]({{site.baseurl}}{{ recipe.url }}){% if recipe.s %}<span style="color:red;"> Needs Review!</span>{% endif %}  {% endfor %}

 <div class="comments pad-top">
          <h3 class="pad-top">What people are saying:</h3><hr>
 {{site.data.comments}}
          {% assign comments = site.data.comments | sort %}
          {% for comment in comments %}

  {{comment[0]}}<br>
 {{comment[1]}}<br> {{comment[1].name}}
            {% assign name = comment[1].name %}
            {% assign url = comment[1].url %}
            {% assign date = comment[1].date %}
            {% assign message = comment[1].message %}
            {% include comment.html index=forloop.index name=name url=url date=date message=message %}
          {% endfor %}
        </div>
