# to-do list

## About the Project
<img src="/public/todo-simulation.gif" width="250" align="right" alt="simulation of todo app"/>

This to-do list is a simple, yet useful tool for the users task-management.

Several users can use the same app, but each user has his own, private tasks and can only create, see, mark as done/undone & delete his own tasks through the supabase data-management setup.

The app is a CRUD, fully responsive SPA for desktop and mobile devices.



https://worlds-best-to-do-list.netlify.app/home

## Project technologies

This todo list is a fullstack API SPA-project created with Vue.js and Quasar Frameworks, Pinia, Vite and Node technology in front-end and with Supabase in back-end and as DB.

The Supabase database is currently handling four databases: one for the users Auth (authentification and authorization) and the other three for the tasks, shopping- and drugstore-items.

Implementation of additional tables is not presenting any difficulties.

In order to enhance the user experience the feedback to the user is handled through the Quasar-Dialog for user confirmations of the delete function, and Quasar-Notify for other user notifications like task-uploads, -deletes, -logout...

The Quasar framework is the main responsible for the design of the app with its corresponding components and styles which than have been customized to fit the projects needs.

## Vue.js

Vue.js has been chosen as it is a progressive and very flexible framework for building user interfaces.
The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.

This projects has been created in Vue composition API and it is a Single Page Application.

## Quasar Framework

The Quasar Framework is a Vue.js based framework that allows to build responsive Single Page Applications, Progressive Web Apps, Server-Side Rendered Apps, Hybrid Mobile Apps and Electron Apps, all using the same codebase, powered with Vue.js. It offers a state of the art Store, Router, which is why it seemed to be a good option to complement this project and enable a future expansion from SPA to PWA.

## Pinia

The Pinia state management is the responsible for the data handling and the communication between the components.

For me it seemed to be the obvious choice for this project as it is a very light and easy to use state management library for Vue.js and created for and by the Vue creators team.

## Features

- Fully responsive SPA for desktop and mobile devices
- User Authentification and Authorization
- Login
- Register
- Logout
- Add task/shopping-item/drugstore-item
- User can see his tasks, shopping-items and drugstore-items
- Delete task/shopping-item/drugstore-item
- Mark task/shopping-item/drugstore-item as done
- Mark task/shopping-item/drugstore-item as undone
- Task list/ db and page
- Shopping list / db and page
- Drugstore list / db and page
- User profile editable (name and surname)

## Future Features

- User profile email, avatar and password editable
- Dates and times for tasks
- User profile update
- PWA implementation

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

Thanks to Marc Compte for your knowledge, guiding and help in the darkest moments 🧙🏻‍♂️.

https://worlds-best-to-do-list.netlify.app/home

[![Netlify Status](https://api.netlify.com/api/v1/badges/a316bb73-316b-4b3d-a68e-463b2db8f5f2/deploy-status)](https://app.netlify.com/sites/worlds-best-to-do-list/deploys)

Copyright 2022 Boris Randebrock

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<!--- ![Alt text](/public/todo-simulation.gif) -->
