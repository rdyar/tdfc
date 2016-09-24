---
layout: default
---

## Odds and Ends
{: .pad-top} 
---
{% for recipe in site.odds-and-ends %}
[{{recipe.title}}]({%site.baseurl%}{{ recipe.url }}) {% if recipe.s %}<span style="color:red;"> Needs Review!</span>{% endif %}  {% endfor %}

## Soups and Salads
{: .pad-top}
---
{% for recipe in site.soup-and-salad %}
[{{recipe.title}}]({%site.baseurl%}{{ recipe.url }}) {% if recipe.s %}<span style="color:red;"> Needs Review!</span>{% endif %}  {% endfor %}

## Main Courses / Vegetables
{: .pad-top}
---
{% for recipe in site.main-courses %}
[{{recipe.title}}]({%site.baseurl%}{{ recipe.url }}) {% if recipe.s %}<span style="color:red;"> Needs Review!</span>{% endif %}  {% endfor %}

## Desserts 
{: .pad-top}
---
{% for recipe in site.desserts %}
[{{recipe.title}}]({%site.baseurl%}{{ recipe.url }}){% if recipe.s %}<span style="color:red;"> Needs Review!</span>{% endif %}  {% endfor %}