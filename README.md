# Crops Info

[![License: MIT](https://img.shields.io/badge/Licence-MIT-teal)](https://opensource.org/licenses/MIT)
[![styled with: Prettier](https://img.shields.io/badge/styled_with-prettier-purple)](https://github.com/prettier/prettier)

This application serves as a comprehensive wiki for crops, providing users with detailed information on various types of plants and their cultivation, pests, dieses and nutrition. Users can browse through the catalog to find specific crops, and if they are the original creators, they have the ability to modify crop information. They can also add a specific crop to favorites or create a new one.

**Important Notes:**

- *Angular based project with REST api and mongo DB*
- *The project is still in early stage, but the most common CRUD operations are implemented*
- *demo coming soon*

During development, I've learned about:
- fully utilizing the features that the Angular 18 version provides
- configure database in MongoDB and store images to the Cloudinary cloud provider
- build a functional backend API and provide data to the client
- store tokens with cookies
- implementing guards to prevent unauthorized access
- configuring CORS
- encryption methods (salting) and many more.


## Table of Content
- [🔬 Technologies used](#🔬-technologies-used)
- [🎬 Features](#🎬-features)
- [🔧 Installation](#🔧-installation)
- [📁 Project content](#📁-project-content)
- [📁 Folder Structure](#📁-folder_structure.md)
- [🎨 Design and Architecture](#🎨-design-and-architecture)
  - [⚙️ Frontend architecture](#⚙️-frontend-architecture)
  - [⚙️ Backend architecture](#️⚙️-backend-architecture)
- [🚀 FUTURE Development:](#🚀-future-development)
- [📐Fixes and updates:](#📐-fixes-and-updates)


## 🔬 Technologies used

| Category         | Technologies                                                                           |
| ---------------- | -------------------------------------------------------------------------------------- |
| Frontend         | `Angular 18`, `TypeScript`                                                             |
| Server           | `Node`, `Express`, `Cors`, `Cookie-parser`, `Multer`,`Express-Mongoose-RA-JSON-Server` |
| UI               | `SASS`,                                                                                |
| Forms            | `NG forms`                                                                             |
| State management |                                                                                        |
| Database         | `MongoDB`, `Mongoose`                                                                  |
| Encryption       | `bcryptjs`                                                                             |
| Authentication   | `JsonWebToken`                                                                         |
| API Request      | `http module`                                                                          |
| Tools            | `Git`, `Vite`, `ESLint`, `Prettier`, `npm`, `Nodemon`,                                 |

## 🎬 Features

Here are some examples of how to use this project:

- Register and login as a user
- Browse crops in the catalog page
- Create and edit crops
- Add and manage items to the favorites
- Check each crop details in the Details Page

## 🔧 Installation

Follow the instructions below:

1. Clone the repository

    ```bash
    git clone https://github.com/batanoffs/crops-info.git
    ```

2. Navigate to the project directory: `cd your-project-directory`
3. Install dependencies for the server and the client:

    ```bash
    ./cd client && npm install
    ```

    ```bash
    ./cd server && npm install
    ```
4. **The application should start automatically because of the `vscode config` file.**
5. If it does not, you can manually run the development server and the client cd to the main directory and:

    ```bash
    ./cd server && npm start
    ```

    ```bash
    ./cd client && npm start
    ```

6. Open your browser and go to [http://localhost:4200/](http://localhost:4200/) to view the app.
7. Register a new account and login

## 📁 Project content

-   Home page
-   Login Register
-   Catalog
-   Crops details
-   Favorites
-   Create crops
-   Edit crops

## 🎨 Design and Architecture

Server built on `express` and `mongodb` with `mongoose`. Client built with `Angular 18`.

### ⚙️ **Frontend architecture**

- #### Signals
    - placeholder

-   #### 🛫 Routers

    -   Routes

-   #### 🧮 Utils

    -   Constants

        -   **placeholder** - *info*

    -   Helpers

        -   **placeholder** - *info*


-   #### 🙋‍♀️ Services

    -   **placeholder** - *info*

### ⚙️ **Backend architecture**

-   #### 🛠 Express config

    -   **express.ts** - contains express middleware
    -   **database.ts** - contains mongoose middleware
    -   **routes.ts** - contains express routes

-   #### 📮 Models

    | Model      | Attributes                                                         |
    | ---------- | ------------------------------------------------------------------ |
    | Crops      | `id`, `name`, `description`, `pesticides`, `picture`, `createdAt`, |
    | Pesticides | `id`,  `name`, `description`, `picture`, `createdAt`,              |
    | User       | `id`, `email`, `password`, `register_date`, `role`                 |
    | Favorites  | `id`, `user`, `productRefs`                                        |

-   #### 🛫 Routes 

    | Name    | Route url    | Description                                                  |
    | ------- | ------------ | ------------------------------------------------------------ |
    | Main    | `/api/**`    | Main router that combines all routes under `/api`            |
    | Catalog | `/api/crops` | Catalog router that combines all routes under `/api/crops/*` |

-   #### 📡 Controllers

    -   **placeholder** - *info*


-   #### 🙋‍♀️ Services

    -   **placeholder** - *info*

-   #### ⌨️ Middlewares

    -   **placeholder** - *info*

-   #### 🧮 Utils

    -   **placeholder** - *info*

## 🚀 FUTURE Development:

1. Placeholder

## 📐Fixes and updates:

-   [ ] placeholder
