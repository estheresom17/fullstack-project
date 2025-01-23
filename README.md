# Chomis Restaurant Practice Work Documentation
Esomchi Eze

# Date when practice work is done:
 Autumn 2024
 
## **Topic of the Practice Work**
The project is an online ordering system for Chomis Restaurant, a place offering authentic Nigerian cuisine. The goal was to create a full-stack web application where users can browse the restaurant's menu, place orders, and interact with the system for both menu viewing and order management.

## **Description of the Project**

### **Project Architecture**
This web application is divided into two main parts:
- **Frontend**: A static HTML page powered by JavaScript for dynamic content rendering and form handling.
- **Backend**: A Node.js server using Express.js to handle API requests, MongoDB for database management, and Mongoose to model the data.

The project consists of the following components:
1. **Frontend (HTML, CSS, JavaScript)**:
   - **HTML**: Provides the structure for the website (navigation, home, menu, order, contact).
   - **CSS**: Custom styling for various sections, including buttons, navigation, and the hero section.
   - **JavaScript**: Handles fetching data, placing orders, and interacting with the backend API.
   
2. **Backend (Node.js, Express, MongoDB)**:
   - **Express**: Handles routes for fetching menu items, placing orders, and managing data.
   - **MongoDB**: Stores the menu items and order information.
   - **Mongoose**: Used to interact with MongoDB through defined schemas (MenuItem and Order).

### **JavaScript Functions and Relationships**
1. **`fetchMenuItems()`**: Fetches menu data from a local `data.json` file or a backend API.
2. **`renderMenuItems()`**: Dynamically renders menu items (name, description, price) in the UI.
3. **`addItemToOrder()`**: Adds selected dishes to the current order list.
4. **`updateCurrentItemsList()`**: Updates the list of items in the current order.
5. **`placeOrder()`**: Sends the order to the backend API and saves it to the database.
6. **`syncWithBackendAPI()`**: Optionally syncs the menu with the backend to ensure the menu is up-to-date.

### **UI Mockups**
The UI consists of several sections:
- **Navigation Bar**: Allows users to navigate between home, menu, order, and contact pages.
- **Home Section**: A hero banner with a brief description of the restaurant and a call-to-action button to browse the menu.
- **Menu Section**: Displays all the available dishes in the menu with their name, description, and price.
- **Order Section**: Users can add items to their order, view the current order, and place the order.
- **Contact Section**: A simple form to contact the restaurant.

[LINK TO UI MOCKUP](https://www.figma.com/proto/EgRGXds52FypMo7TqgMobE/Chomis-Restaurant?page-id=0%3A1&node-id=1-8&node-type=canvas&viewport=805%2C809%2C0.49&t=YvvbHGPC0Wy6AQm4-1&scaling=min-zoom&content-scaling=fixed)


### **REST Endpoints**
- **`GET /api/menu`**: Fetches all menu items from the database.

![Menu Get](documentation/menu get.png)

- **`POST /api/orders`**: Submits a new order to the backend for storage.
- **`GET /api/orders`**: Retrieves all orders from the database (used by restaurant admins).
- **`DELETE /api/orders/{orderId}`**: Deletes an order from the database.

### **Database Visualization**
The MongoDB database contains two primary collections:
1. **MenuItem**: Stores details about menu items (name, description, price, image).

![Menu Items](documentation/menu db.png)

2. **Order**: Stores customer orders, including the customer name, address, ordered dishes, and total price.

![Sent Orders](documentation/orders in db.png)

### **Developer Tool Test** 

![Developer tool test](documentation/successful order.png)

## **Work Tracking**

| Day   | Task                                         | Time Spent (Esom) | 
|-------|----------------------------------------------|-------------------|
| Day 1 | Set up project structure and UI components.  | 4 hours           |
| Day 2 | Implemented JavaScript for fetching menu items. | 4 hours        |
| Day 3 | Developed order form and order handling logic. | 4 hours           |
| Day 4 | Created backend with Express.js and MongoDB integration. | 6 hours  |
| Day 5 | Implemented database models for menu items and orders. | 6 hours           |
| Day 6 | Connected frontend to backend, tested functionality. | 4 hours           |
| Day 7 | Designed UI elements for responsive layout and fixed bugs. | 4 hours           |
| Day 8 | Integrated order placing feature with payment method handling . | 4 hours           |
| Day 9 | Tested error handling and validation features . | 4 hours           |
| Day 10 | Final testing, debugging, and code cleanup .  | 4 hours           | 
| **Total** |                                            | **44 hours**       | 

*Total time spent: 80 hours*

## **Strengths of the Project**
- **User-friendly UI**: The layout is simple, intuitive, and easy to navigate.
- **Full-stack implementation**: The application demonstrates both frontend and backend technologies with full integration.
- **Dynamic content rendering**: The menu items are fetched and displayed dynamically, allowing easy updates.
- **Responsive design**: The design adapts to different screen sizes for a smooth user experience.

## **Weaknesses of the Project**
- **Limited error handling**: Some edge cases (like invalid order submissions) could be better managed with more comprehensive validation.
- **No authentication**: The system does not have user authentication or authorization for order management.
- **Database connection dependency**: The app is dependent on a live MongoDB connection, which might create issues if the database is down.

## **Personal Reflection and Grade Proposal**
Working on this project was an insightful experience, as it gave us the opportunity to combine both frontend and backend skills. We learned how to handle dynamic data fetching and order management using JavaScript, and how to set up a server and manage a database with MongoDB.
