---
---

const main = ["toast", "chili", "pizza"];

const main_courses = [ {% for recipe in site.main-courses %} {title: "{{recipe.title}}", url: "{{recipe.url}}"}, {% endfor %} ];
const desserts = [ {% for dessert in site.desserts %} {title: "{{dessert.title}}", url: "{{dessert.url}}"}, {% endfor %} ];