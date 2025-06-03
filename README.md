# PROJECT ALAN

**Section**: C-4L  
**Team Members**:
- Joy Christine Laura Guevarra  
- Hans Dean Guzman  
- Alan Benedict Vender  

---

## Project Features

### 🔐 Authentication

#### Landing Page
This is the first page. It contains **Login** and **Sign Up** buttons for authentication.

![Landing](readme_images/landing.png)

#### Login Page
- User is asked to log in with **email** and **password**.
- The account must exist in the database; otherwise, the login will fail.
- Includes a **Sign Up** text button to redirect to the Sign Up page.
  
![Login](readme_images/login.png)

#### Sign Up Page
- User is asked to register with their **first name**, **last name**, **email**, and **password**.
- The password will be **encrypted** in the database.
  
![SignUp](readme_images/signup.png)

---

## Customer Side

### Product Listing
- Displays a list of products from the database.
- Entries can be **sorted** by name, type, price, or quantity using a drop-down menu.
- Sorting order can be toggled **ascending/descending** with an arrow.
- Users can **add products to the cart**.
- The **cart button** in the header shows the current cart and allows quantity adjustments.
- A **hamburger menu** leads to transaction history.
- Includes a **logout** button.
- Clicking the **logo** in the header navigates back to the product listings.
  
![UserProducts](readme_images/user_products.png)

### Shopping Cart
- Displays a list of the user’s transactions in the cart.
- Users can **increase/decrease** the quantity or **cancel** transactions.
- Users may **select individual** items or use the **select all** checkbox to checkout.
- Clicking the **logo** in the header navigates back to the product listings.

![Cart](readme_images/user_cart.png)

### Manage Orders
- Shows both **pending** and **completed** transactions.
- Pending transactions can still be **canceled**.
- Clicking the **logo** in the header navigates back to the product listings.

![UserOrders](readme_images/user_order.png)

---

## Admin Side

### Dashboard
- Admin is directed here after logging in.
- Contains **navigation buttons** for admin pages.
- The header includes a **Sign Out** button.

![Dashboard](readme_images/dashboard.png)

### Product Listing
- Shows the product list from the database.
- Can be **sorted** by name, type, price, or quantity.
- Sorting order toggled with an arrow.
- Admin can **edit stock and price**.
- Clicking the **logo** in the header navigates to the dashboard.

![AdminProducts](readme_images/admin_products.png)

### Order Fulfillment
- Displays **pending transactions** from the database.
- Admin can **confirm** transactions, marking them as completed.
- Clicking the **logo** in the header navigates to the dashboard.

![AdminOrder](readme_images/admin_order.png)

### Manage Users
- Shows a list of customers from the database.
- Each customer is listed with their **total spent**.
- Clicking the **logo** in the header navigates to the dashboard.

![AdminUsers](readme_images/admin_user_management.png)

### Sales Reports
- Displays **sales data** by product or completed transactions.
- Can be filtered by **last week**, **month**, or **year**.
- Clicking the **logo** in the header navigates to the dashboard.

![AdminProductSales](readme_images/admin_sales_product.png)
![AdminTransactionSales](readme_images/admin_sales_transaction.png)
---

## Usage Guidelines

1. Ensure you have a `.env` file with your own **MongoDB `authKey`**.
2. Run `npm i` inside both the `backend` and `frontend` directories (❗️**not in root**).

---

## How to Run

1. Navigate to the `backend` directory on the terminal and run:
   - node index.js
2. Navigate to the `frontend` directory on the terminal and run:
   - npm run dev
3. Open your browser and go to:
   - http://localhost:5173

Alternatively you can access: https://project-alan-bank.vercel.app/
