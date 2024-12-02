// Fetch the menu data from the local JSON file and the backend API
document.addEventListener("DOMContentLoaded", function () {
    fetchMenuItems();
});

// Function to fetch the menu items from the local JSON file
function fetchMenuItems() {
    fetch("data.json")  // Load menu items from local data.json
        .then(response => response.json())
        .then(data => {
            renderMenuItems(data.menuItems);  // Render menu items from local JSON
            syncWithBackendAPI();  // Optionally sync with backend API for future updates
        })
        .catch(error => console.error("Error fetching menu data from local JSON: ", error));
}

// Sync data with backend API (optional)
function syncWithBackendAPI() {
    fetch("http://localhost:3000/api/menu")  // Fetch menu items from backend API
        .then(response => response.json())
        .then(data => {
            console.log("Data synced from backend API: ", data);
            // You could update your local data with the backend data here if needed
        })
        .catch(error => console.error("Error syncing with backend API: ", error));
}

// Function to render the menu items dynamically on the page
function renderMenuItems(items) {
    const menuContainer = document.getElementById("menu-items");
    items.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");

        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span>€${item.price.toLocaleString()}</span>  <!-- Changed to € (Euro) -->
            <button class="add-to-cart" data-id="${item.id}" data-price="${item.price}">Add to Cart</button>
        `;

        menuContainer.appendChild(menuItem);
    });

    // Add event listeners for the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

// Array to store items added to the cart
let cart = [];

// Function to add items to the cart and update the UI
function addToCart(event) {
    const button = event.target;
    const itemId = button.getAttribute("data-id");
    const itemPrice = parseInt(button.getAttribute("data-price"));

    // Fetch item details from the backend API based on the itemId
    fetch(`http://localhost:3000/api/menu/${itemId}`)
        .then(response => response.json())
        .then(item => {
            cart.push(item);  // Add the item to the cart
            updateCartDisplay();  // Update the cart UI
        })
        .catch(error => console.error("Error fetching item details from API:", error));
}

// Update the cart display
function updateCartDisplay() {
    const cartDisplay = document.getElementById("cart-items");
    cartDisplay.innerHTML = '';  // Clear previous cart items

    // Loop through the cart and display each item
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>€${item.price.toLocaleString()}</p>  <!-- Changed to € (Euro) -->
        `;

        cartDisplay.appendChild(cartItem);
    });

    const totalPrice = calculateTotalPrice();
    document.getElementById("total-price").textContent = `€${totalPrice.toLocaleString()}`;  // Changed to € (Euro)
}

// Function to calculate the total price
function calculateTotalPrice() {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Function to validate the order form
function validateOrderForm() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const selectedItem = document.getElementById("pizza").value;

    if (!name || !address || !selectedItem) {
        alert("Please fill all the fields.");
        return false;
    }

    alert("Order placed successfully!");
    return true;
}

// Handle form submission and prevent default behavior
document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateOrderForm()) {
        // Process the order (send the data to the server)
        const orderData = {
            customerName: document.getElementById("name").value,
            address: document.getElementById("address").value,
            items: cart,
            totalPrice: calculateTotalPrice()
        };

        // Send the order to the server
        fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)  // Send the order data as JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log("Order has been placed:", data);
            alert("Order has been placed successfully!");
            cart = [];  // Clear the cart
            updateCartDisplay();  // Update the cart UI
        })
        .catch(error => console.error("Error placing order:", error));  // Error handling
    }
});

// Advanced Navbar Interaction on Scroll
window.addEventListener("scroll", function () {
    const navbar = document.querySelector("header");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
