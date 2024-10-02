# Blogify - Your ultimate Blogging Platform

 Blogify is a fully featured Blog Application built using the MERN Stack (MongoDB, Express, React, Node.js) with advanced state management powered by **Redux**, secure authentication via **JWT**, and media uploads managed through **Cloudinary**, UI enhancementss using **Shadcn UI**,etc.

## 🌟 Features
- **User Authentication**: Secure sign-up/login with bcrypt & JWT.
- Create, Read, Update, Delete (**CRUD**) operations for blogs.
- Text Editor for creating blog posts.
- Image Uploads: Powered by Cloudinary for seamless media management.
- Comment Section: Users can interact with posts via comments.
- Responsive Design: Fully optimized for mobile and desktop devices.
- Redux for State Management: Simplified app-wide state management.

## 🚀 Tech Stack


### Frontend: 

- **React** alongside **Redux** for state management and **React Router** for smooth routing.
-  **TailwindCSS** for styling
- **ShadCN** UI Components - for immersive UI


### Backend:
- **Node.js**, **Express.js** for seamless REST APIs working.
- Database: **MongoDB** (with Mongoose) for data management
- Authentication: bcrypt, **JWT** for secure usage.
- Image Uploads: **Cloudinary** API for easy image uploads processing.
- Version Control: **Git/GitHub**

## 📚 Usage
- **SignUp** and **LogIn** to access your own dashboard containing you details and blogs.
- **Create a post:** Write a Blog using the built-in text editor.
- **Upload images:** Attach images such as blog thumbnail and user profile pic.
- **Manage your activity**: Like, Unlike your blogs/comments or delete you own blogs or comments as per your choice
- **Interact with other users**: Comment on blog posts and engage with the community.

## 🛠️ Installation
To get a local copy of the project up and running, follow these steps:

### 1. Clone the repo
```js
git clone https://github.com/ayyush08/Blogify.git
cd Blogify
```

### 2. Install dependencies

- Install server dependencies
```js
cd backend
npm install
```
- Install client dependencies
```js
cd ../frontend
npm install
```
### 3. Set up environment variables
Create a .env file in the backend directory and add the following:

```js
PORT=your_port
CORS_ORIGIN=your_frontend_url

MONGO_URI=your_mongo_connection_string

ACCESS_TOKEN_SECRET=your_own_secret_for_access_tokens
ACCESS_TOKEN_EXPIRY=your_own_expiry_time_for_access_tokens


REFRESH_TOKEN_SECRET=your_own_secret_for_refresh_tokens
REFRESH_TOKEN_EXPIRY=your_own_expiry_time_for_refresh_tokens

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run the app
In two separate terminals, start the server and the client:
1. Start the server (backend)
```js
cd backend
npm run dev
```

2. Start the client (frontend)
```js
cd frontend
npm run dev
```
The app should now be running on http://localhost:5173.

