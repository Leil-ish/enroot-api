# Enroot API

![Landing Header](https://i.imgur.com/kT7Fbbb.png)

This is the backend for a fullstack gardening task tracker project called Enroot, found online at <https://leilish-enroot-app.now.sh/> with backend hosted at <https://mysterious-tor-42670.herokuapp.com/>. It allows users to:

* View all plants in their gardens in a condensed form

![Garden page](https://i.imgur.com/KsJEnUZ.png)

* View plant details within a collapsible

![Plant details](https://i.imgur.com/U31MSnB.png)

* Add plants to a virtual garden

![Add plant page](https://i.imgur.com/S47ErEm.png)

* Update plant information as you learn more about your plants

![Update plant page](https://i.imgur.com/5oZUCTX.png)

* Add tasks to the plants in their gardens  

![Tasks page](https://i.imgur.com/Zguuul0.png)

* Sort plants by common name, scientific name, flower color, or temperature minimum

![Sort plants](https://i.imgur.com/HCRxLxp.png)

* Sort tasks by plant name, task frequency, or maintenance needed

![Sort tasks](https://i.imgur.com/2DooIJ2.png)

To get started, click "Register" on the landing page and enter your name, username, and password. On this page, you can also send me an email, check out my portfolio site, or visit me on LinkedIn or GitHub.  

![Landing Page](https://i.imgur.com/YSi5xPF.png)

From there, you can navigate using the fixed nav icons at the top right, labeled in the photo and referenced in order below. Descriptions are also available in tooltip form on the site itself.  

![Nav](https://i.imgur.com/EYgrazY.png) 

From the top:

* Click on the logout arrow icon to log out of your account.
* Click on the garden icon to visit your garden.
* Click on the plus icon to add plant details manually.
* Click on the shovel icon to view all plant-related tasks.

The API endpoints that are useful in using this app are:

* <https://guarded-taiga-77278.herokuapp.com/api/garden> - gets all plants
* <https://guarded-taiga-77278.herokuapp.com/api/tasks> - gets all tasks
* <https://guarded-taiga-77278.herokuapp.com/api/garden/:plant_id> - gets a plant by ID
* <https://guarded-taiga-77278.herokuapp.com/api/garden/:plant_id/tasks> - gets tasks related to a particular plant
* <https://guarded-taiga-77278.herokuapp.com/api/garden/:plant_id/:task_id> - gets a particular task related to a particular plant

Endpoints that specify a particular resource can handle DELETE and GET requests. All other endpoints can handle GET and POST requests. All endpoints beyond the landing page require JWT authentication, most easily accomplished by registering at <https://https://leilish-enroot-app.now.sh//> and getting an auth token.

This project was created using React on the frontend and Node.js, Express, and PostgreSQL on the backend. If you like this repo, you can find its frontend companion at <https://github.com/leil-ish/enroot-client>!
