---
---

const main = ["toast", "chili", "pizza"];

const main_courses = [ {% for recipe in site.main-courses %} {title: "{{recipe.title}}", url: "{{recipe.url}}"}, {% endfor %} ];