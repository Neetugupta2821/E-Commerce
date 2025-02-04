# E-Commerce Project

This project is a simple e-commerce application built using **Vite** and **React**. It includes core features like authentication, product listing, cart management, and a checkout process.

---

## Features

### 1. Authentication
- Google Sign-In: Allows users to log in and out using Google credentials (Google Login API used directly).

### 2. Product Listing
- Products are fetched from the [Fake Store API](https://fakestoreapi.com/products).
- Displayed in a responsive grid layout using **MUI** components.

### 3. Cart Management
- Add products to the cart.
- View cart items and their details.
- **Checkout Process**:
  - Displays the total price of items in the cart.
  - Clears the cart after successful checkout with a confirmation message.

### 4. Navigation
- A Navbar with:
  - Google Login/Logout button
  - Search bar for filtering products by title
- A Sidebar showing product categories, allowing filtering by category.

---
### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Neetugupta2821/E-Commerce.git
   cd E-Commerce
npm install
npm run dev

