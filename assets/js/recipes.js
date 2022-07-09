---
---

const desserts = [ {% for dessert in site.desserts %} {title: "{{dessert.title}}", url: "{{dessert.url}}"}, {% endfor %} ];

const main_courses = [ {% for recipe in site.main-courses %} {title: "{{recipe.title}}", url: "{{recipe.url}}"}, {% endfor %} ];
const take_out = [
    {title: 'Pizza - Take out', url: ''},
    {title: 'BBQ - Take out', url: ''},
    {title: 'Mystic Grill - Take out', url: ''},
    {title: 'Burgers and Brats' , url: ''},
    {title: 'Chicken and Waffles' , url: ''},

]

//combine main_courses and take_out arrays



