# Interview Scheduler

## Description

Using the latest tools and techniques, we build and test a React application that allows users to book and cancel interviews. We combine a concise API with a WebSocket server to build a realtime experience. Project completed by John O'Halloran with LHL direction.

## Setup

1. Fork and clone this project
2. Install dependencies with `npm install`.
3. Fork and clone [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) and follow instructions to setup.

## Dependencies (Also included in package.json)

- "axios": "^0.20.0",
- "classnames": "^2.2.6",
- "normalize.css": "^8.0.1",
- "react": "^16.9.0",
- "react-dom": "^16.9.0",
- "react-scripts": "3.4.4"

## Dev-dependencies (Also included in package.json)

- "@babel/core": "^7.4.3",
- "@storybook/addon-actions": "^5.0.10",
- "@storybook/addon-backgrounds": "^5.0.10",
- "@storybook/addon-links": "^5.0.10",
- "@storybook/addons": "^5.0.10",
- "@storybook/react": "^5.0.10",
- "@testing-library/jest-dom": "^4.0.0",
- "@testing-library/react": "^8.0.7",
- "@testing-library/react-hooks": "^8.0.1",
- "babel-loader": "8.1.0",
- "prop-types": "^15.8.1",
- "react-test-renderer": "^16.14.0",
- "sass": "^1.53.0"

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

First time use:
```sh
npm build-storybook
```
regular use:
```sh
npm run storybook
```

## Running the Scheduler-API server

regular mode:
```sh
npm start
```
Error mode:
```sh
npm run error
```
Cypress mode:
```sh
npm run test:server
```

## Running Cypress

run config.xlaunch file found in the file directory (root)

```sh
npm run cypress
```

## Screenshots
### Application View
!["applicationview"](https://github.com/JohnnyOhall/scheduler/blob/master/screenshots/Application.PNG?raw=true)
### Delete Appointment
!["delete-app"](https://github.com/JohnnyOhall/scheduler/blob/master/screenshots/delete_appointment.PNG?raw=true)
### Edit Appointment
!["edit-app"](https://github.com/JohnnyOhall/scheduler/blob/master/screenshots/edit_appointment.PNG?raw=true)
### New Appointment
!["new-app"](https://github.com/JohnnyOhall/scheduler/blob/master/screenshots/new_appointment.PNG?raw=true)