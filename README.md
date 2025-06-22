# Item Management System

This is a ReactJS web application designed to manage items, allowing users to add new items and view existing ones. It features a clean, modern interface and is built with best practices in mind, making it suitable for an internship submission.

## Features

*   **Add Items Page:** A form to add new items with fields for Item Name, Item Type, Item Description, Item Cover Image URL, and Additional Image URLs.
*   **View Items Page:** Displays all added items in a grid layout, showing the item name, type, and cover image.
*   **Item Details Modal:** Clicking on an item in the "View Items" page opens a modal/lightbox displaying full details, including a carousel for all images.
*   **Local Storage:** All added items are persisted in the browser's local storage, so they remain even after closing and reopening the browser.
*   **Responsive Design:** The website is designed to be responsive and work well on various screen sizes, from mobile devices to desktops.
*   **Clean Code:** The codebase is written with readability and maintainability in mind, with no comments as per the initial request.

## Technologies Used

*   **ReactJS:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool that provides a lightning-fast development experience.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **shadcn/ui:** A collection of re-usable components built using Radix UI and Tailwind CSS.
*   **Lucide Icons:** A beautiful, open-source icon library.
*   **React Router DOM:** For declarative routing in React applications.

## Installation and Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and pnpm installed on your system.

*   **Node.js:** Download and install from [nodejs.org](https://nodejs.org/).
*   **pnpm:** If you don't have pnpm, install it globally using npm:

    ```bash
    npm install -g pnpm
    ```

### Installation

1.  **Unzip the project:** Extract the contents of the provided `item-management-website.zip` file to your desired directory.

2.  **Navigate to the project directory:**

    ```bash
    cd path/to/item-management-website
    ```

3.  **Install dependencies:**

    ```bash
    pnpm install
    ```

### Running the Development Server

To start the development server and view the application in your browser:

```bash
pnpm run dev
```

This will typically open the application at `http://localhost:5173/` in your default web browser.

### Building for Production

To create a production-ready build of the application:

```bash
pnpm run build
```

The optimized production files will be generated in the `dist` directory.

## Usage

### Adding Items

1.  Navigate to the "Add Items" page.
2.  Fill in the required details: Item Name, Item Type, Item Description, and Item Cover Image URL.
3.  Optionally, add multiple Additional Image URLs (one per line).
4.  Click the "Add Item" button. A success message will appear, and the form will clear.

### Viewing Items

1.  Navigate to the "View Items" page.
2.  All items you have added will be displayed.
3.  Click on any item card to open a modal with its full details, including a carousel for all associated images.

## Author

**Sumit Nain**

Feel free to explore the code and adapt it for your needs. If you have any questions or feedback, please reach out!

