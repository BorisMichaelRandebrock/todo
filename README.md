# to-do list

## About the Project


This to-do list is a simple, yet useful tool for the users task-management.

Although, for the moment the implementation for dates and times remains a future feature, it is already a very useful tool for the users to manage their tasks.

Several users can use the same app, but each user has his own, private tasks and can only create, see, mark as done/undone & delete his own tasks through the supabase data-management setup.

The app is a fully responsive SPA for desktop and mobile devices.



https://worlds-best-to-do-list.netlify.app/home

## Project technologies

This todo list is a fullstack API SPA-project created with Vue.js and Quasar Frameworks, Pinia (state management) and Node (engine) technology in front end and Supabase in backend.

The Supabase database is initially handling two databases: one for users and another for tasks.
At a later stage, the database will be updated to handle more tables, as there shall be several tables for different cathegories of tasks as shopping, groceríes...

In order to enhance the user experience, it has used the Quasar-Dialog, for user confirmations of the delete function, and Quasar-Notification for other user feedbacks like task uploads, deletes, logout...

The Quasar framework is the main responsible for the design of the app with its corresponding components and styles which than have been customized to fit the projects needs.



## Vue.js


Vue.js has been chosen as it is a progressive framework for building user interfaces as unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.
The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.

This projects has been created in vue compositions API and it is a single page application.


## Quasar Framework


The Quasar Framework is a Vue.js based framework that allows to build responsive Single Page Applications, Progressive Web Apps, Server-Side Rendered Apps, Hybrid Mobile Apps and Electron Apps, all using the same codebase, powered with Vue.js. It offers a state of the art Store, Router, which is why it seemed to be the good option to complement this project and enable a future expansion from SPA to PWA.




## Pinia


The Pinia state management is the responsible for the data handling and the communication between the components.

It has been the obvious choice for this project as it is a very light and easy to use state management library for Vue.js and created for and by the Vue creators team.



## Features

-  Login
-  Register
-  Logout
-  Add task
-  Delete task
-  Mark task as done
-  Mark task as undone


## Future Features

-  Shopping list / db and page
-  Groceries list / db and page
-  Dates and times for tasks
-  User profile
-  PWA implementation


# Project setup

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### Badges, Deployed & Credits

Thanks to Marc Compte for your knowledge, guiding and help in the darkest moments 🤓.

https://worlds-best-to-do-list.netlify.app/home

[![Netlify Status](https://api.netlify.com/api/v1/badges/a316bb73-316b-4b3d-a68e-463b2db8f5f2/deploy-status)](https://app.netlify.com/sites/worlds-best-to-do-list/deploys)
