# Cinema Time

Cinema Time is a MERN (MongoDB, Express, React, Node.js) stack web application that allows users to discover and explore movies, TV shows, and anime. Users can register, login, and manage their accounts. They can watch trailers, view details of items including title, poster image, description, and category, and add or remove items from their favorites list. The application also provides search functionality.

Admins have additional privileges, such as adding, removing, or updating items, and accessing a dashboard to manage items and view user data.

## Technologies Used

### Frontend
- React
- Bootstrap
- Axios
- Formik
- Yup
- Context API
- SweetAlert2
- Font Awesome

### Backend
- Node.js
- Express
- MongoDB
- Cloudinary
- Nodemon

## Installation

1. Clone the repository:
git clone https://github.com/mo-ibrahim22/CinemaTime-MERN.git

2. Navigate to the project directory:
cd CinemaTime-MERN/Cinema_Time/backend


3. Install backend dependencies:
npm install


4. Create a `.env` file in the backend directory and add the following environment variables:
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

5. Start the backend server:
npm run dev

6. Open another terminal window and navigate to the frontend directory:
cd ../../frontend

7. Install frontend dependencies:
npm install

8. Start the React app:
npm start


9. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

### User Features
- Register a new account or login with existing credentials.
- Discover and explore movies, TV shows, and anime.
- Watch trailers and view details of items including title, poster image, description, and category.
- Add or remove items from favorites list.
- Search for specific items.
- Manage account: update or delete.

### Admin Features
- Add, remove, or update items.
- Access dashboard to manage items and view user data.

## Context Provider

The application uses React Context API for state management.

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Axios](https://github.com/axios/axios)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Font Awesome](https://fontawesome.com/)
- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Nodemon](https://nodemon.io/)



