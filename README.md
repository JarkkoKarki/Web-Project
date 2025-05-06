[![CodeFactor](https://www.codefactor.io/repository/github/jarkkokarki/web-project-frontend/badge)](https://www.codefactor.io/repository/github/jarkkokarki/web-project-frontend)

# Web Project

![alt text](images/homepage.png)
This project is part of the Web-Project course. The goal is to create a functional restaurant web application that allows users to manage reservations, orders, and menus. The application aims to handle data inconsistencies and errors gracefully while providing a user-friendly interface.

## What the Project Does

This project is a comprehensive restaurant management system that allows users to:

- Order food and make reservations.
- Non-registered users can also make reservations.
- Admins can add menu items and manage the application through a dedicated WorkHub view.
- The WorkHub view provides an overview of all orders, reservations, and user information.

## Why the Project is Useful

The project simplifies restaurant operations by digitizing key processes such as reservations, menu management, and order handling. It reduces manual effort, minimizes errors, and enhances customer satisfaction by providing a seamless and efficient experience.

## Application Features

- User registration and login
- Menu management (add, edit, delete items)
- Reservation management (available for both users and non-users)
- Order management and history
- Shopping cart management
- Multilingual user interface
- Payment transaction management (successful and canceled payments)
- Admin WorkHub view for managing orders, reservations, and user information

## Backend Dependency

This frontend application relies on a backend server to function properly. Ensure that the backend is set up and running before using this application. Without the backend, many features such as user authentication, menu management, and order processing will not work.

### Setting Up the Backend

1. Clone the backend repository from the provided link: [backend repository](https://github.com/JarkkoKarki/Web-Project-Backend).
2. Follow the backend's README instructions to install dependencies and start the server.
3. Ensure the backend server is running and accessible before starting the frontend.

### Connecting the Frontend to the Backend

Make sure the frontend is configured to communicate with the backend server. Update the API base URL in the frontend's configuration file if necessary.

## Demo

To access the demo, you must first connect to the school's VPN and follow these steps:

1. Connect to the school's VPN.
2. Open your browser and navigate to: [https://10.120.32.87/app](https://10.120.32.87/app).
3. Since the link is not SSL certified, type `thisisunsafe` in your browser to bypass the warning.

### Online Demo

After completing the above steps, you can experience the application live at: [Web Project Demo](https://jarkkokarki.github.io/Web-Project-Frontend/).

## How Users Can Get Started with the Project

### Installation Instructions

1. Download the project source code from the GitHub repository.
2. Install Node.js and npm if they are not already installed.
3. Run the command `npm install` to install all dependencies.
4. Start the application using the command `npm run dev`.
5. Open the displayed URL to access the application.

### Instructions for Testing the Application

1. Install the required dependencies using the command `npm install`.
2. Start the application locally using the command `npm run dev`.
3. Open a browser and navigate to the displayed URL.
4. Test the following functionalities:
   - Register and log in.
   - Add items to the shopping cart and place an order.
   - Manage the menu (add, edit, and delete items as an admin).
   - Make a reservation (as a user or non-user) and check the reservation details.
   - Change the application language and ensure all texts update correctly.
   - Verify successful and canceled payment transactions.
   - Access the WorkHub view as an admin to manage orders, reservations, and user information.
