# Kisan Network

### Links

-   Live URL: https://thriving-melomakarona-890674.netlify.app/
-   API Documentation: https://documenter.getpostman.com/view/15410355/2s8Z75SV4p

## Frontend Codebase Summary

-   The **`src`** directory contains the source code for the app. It has the following structure:
    -   The **`App.css`**, **`App.tsx`**, **`index.css`**, and **`index.tsx`** files define the root component of the app and the entry point for the app.
    -   The **`components`** directory contains reusable components that are used throughout the app. In this case, it contains **`HomeHeader.tsx`** and **`Toast.tsx`**.
    -   The **`contacts.json`** file contains sample contact data that is used by the app.
    -   The **`contexts`** directory contains context providers that provide shared state for the app. In this case, it contains **`ContactsProvider.tsx`**, which provides the contacts data to the app.
    -   The **`pages`** directory contains the route components for the app. It has the following structure:
        -   **`ContactInfo`**: This folder contains a React component and styles for a page that displays information about a specific contact. This page can be accessed at the route **`/contactInfo/:id`**, where **`:id`** is the ID of the contact to display.
        -   **`Home`**: This folder contains a React component and styles for the home page of the application, which can be accessed at the route **`/`**. The home page also includes several subfolders for additional components used on the home page. The **`Contacts`** folder contains a React component and styles for displaying a list of contacts, and the **`Messages`** folder contains a React component and styles for displaying a list of text messages.
        -   **`Message`**: This folder contains a React component and styles for a page that sends OTP to specific user. This page can be accessed at the route **`/contactInfo/:i/sendMessage`**, where **`:id`** is the ID of the message to display.
-   The **`tsconfig.json`** file contains TypeScript configuration for the app.

## Backend Codebase Summary

-   The **`src`** directory contains the source code for the app. It has the following structure:
    -   The **`controllers`** directory contains files that define the logic for handling HTTP requests. There are two controllers: **`contact.controller`** and **`textMessage.controller`**.
    -   The **`database`** directory contains files related to the database. The **`models`** subdirectory contains files that define the database models, and the **`index`** file exports functions for connecting to the database.
    -   The **`routes`** directory contains files that define the routes for the server, which map HTTP methods and URLs to specific controller functions.
    -   The **`services`** directory contains files that provide utility functions or wrap external APIs. In this case, the **`twilio`** directory contains files that wrap the Twilio API for sending SMS messages.
    -   The **`store`** directory contains data stores and related types and Enum. The **`enum`** subdirectory contains files that define enumerations, and the **`types`** subdirectory contains files that define custom type definitions.
    -   The **`utils`** directory contains utility functions that are used throughout the codebase. The **`controller.decorator`** file exports functions that can be used to decorate controller functions with additional behavior.
    -   The **`index`** file is the entry point for the server. It exports the server instance and the functions for starting and stopping the server.
-   The **`tsconfig.json`** file contains TypeScript configuration for the app.

-   API Documentation: https://documenter.getpostman.com/view/15410355/2s8Z75SV4p

```
send_sms
├─ client
│  ├─ .env
│  ├─ build
│  │  ├─ asset-manifest.json
│  │  ├─ index.html
│  │  ├─ robots.txt
│  │  └─ static
│  │     ├─ css
│  │     │  ├─ main.c6ec41ee.css
│  │     │  └─ main.c6ec41ee.css.map
│  │     └─ js
│  │        ├─ 787.ecd9f5f6.chunk.js
│  │        ├─ 787.ecd9f5f6.chunk.js.map
│  │        ├─ main.cbe4e6f9.js
│  │        ├─ main.cbe4e6f9.js.LICENSE.txt
│  │        └─ main.cbe4e6f9.js.map
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ index.html
│  │  └─ robots.txt
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.tsx
│  │  ├─ components
│  │  │  ├─ HomeHeader.tsx
│  │  │  └─ Toast.tsx
│  │  ├─ contacts.json
│  │  ├─ contexts
│  │  │  └─ ContactsProvider.tsx
│  │  ├─ index.css
│  │  ├─ index.tsx
│  │  ├─ pages
│  │  │  ├─ ContactInfo
│  │  │  │  ├─ ContactInfo.css
│  │  │  │  └─ ContactInfo.tsx
│  │  │  ├─ ErrorPage
│  │  │  │  └─ ErrorPage.tsx
│  │  │  ├─ Home
│  │  │  │  ├─ Components
│  │  │  │  │  ├─ Contacts
│  │  │  │  │  │  ├─ Contacts.css
│  │  │  │  │  │  └─ Contacts.tsx
│  │  │  │  │  └─ Messages
│  │  │  │  │     ├─ Messages.css
│  │  │  │  │     └─ Messages.tsx
│  │  │  │  ├─ Home.css
│  │  │  │  └─ Home.tsx
│  │  │  └─ Message
│  │  │     ├─ Message.css
│  │  │     └─ Message.tsx
│  │  ├─ react-app-env.d.ts
│  │  └─ reportWebVitals.ts
│  └─ tsconfig.json
├─ README.md
└─ server
   ├─ .env
   ├─ dist
   │  ├─ controllers
   │  │  ├─ contact.controller.js
   │  │  └─ textMessage.controller.js
   │  ├─ database
   │  │  ├─ index.js
   │  │  └─ models
   │  │     ├─ contact.model.js
   │  │     └─ message.model.js
   │  ├─ error
   │  │  └─ index.js
   │  ├─ index.js
   │  ├─ routes
   │  │  └─ index.js
   │  ├─ services
   │  │  └─ twilio
   │  │     └─ index.js
   │  ├─ store
   │  │  ├─ enum
   │  │  │  ├─ httpMethod.enum.js
   │  │  │  ├─ httpStatusCode.enum.js
   │  │  │  ├─ messageStatus.enum.js
   │  │  │  └─ status.enum.js
   │  │  └─ types
   │  │     ├─ functionResponse.type.js
   │  │     └─ route.type.js
   │  └─ utils
   │     └─ decorators
   │        └─ controller.decorator.js
   ├─ package-lock.json
   ├─ package.json
   ├─ src
   │  ├─ controllers
   │  │  ├─ contact.controller.ts
   │  │  └─ textMessage.controller.ts
   │  ├─ database
   │  │  ├─ index.ts
   │  │  └─ models
   │  │     ├─ contact.model.ts
   │  │     └─ message.model.ts
   │  ├─ error
   │  │  └─ index.ts
   │  ├─ index.ts
   │  ├─ routes
   │  │  └─ index.ts
   │  ├─ services
   │  │  └─ twilio
   │  │     └─ index.ts
   │  ├─ store
   │  │  ├─ enum
   │  │  │  ├─ httpMethod.enum.ts
   │  │  │  ├─ httpStatusCode.enum.ts
   │  │  │  ├─ messageStatus.enum.ts
   │  │  │  └─ status.enum.ts
   │  │  └─ types
   │  │     ├─ functionResponse.type.ts
   │  │     └─ route.type.ts
   │  └─ utils
   │     └─ decorators
   │        └─ controller.decorator.ts
   └─ tsconfig.json

```
