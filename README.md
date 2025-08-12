# Game Journal

## Notes

- The backend is hosted on Render and may take a few moments to start up
  if it has been inactive. Please allow some time for the server to respond on
  your first request.

- Currently, the auth token is stored in local storage instead of cookies to
  avoid CORS issues, particularly with WebKit on iOS.

## About Me

- **Author**: Ednan Rogério Frizzera Filho
- [GitHub](https://github.com/ednanf) • [LinkedIn](https://www.linkedin.com/in/ednanrff/)
- Contact methods available on my GitHub profile!

## Objective

- This project is a personal endeavor to create a game journal application
  that allows users to track their gaming experience, logging their gaming activities with dates and
  rating them.
- It is designed to be a simple and intuitive platform, no frills, just a quick way to log activities.
- The project was built using TypeScript and the MERN stack (MongoDB, Express, React, Node.js).
- On the backend, it uses JWT for authentication and bcrypt for password hashing, along with best practices for
  security,
  such as input validation, sanitization, rate limiting, CORS configuration, and more.

## Application

*UNDER DEVELOPMENT*

## API Documentation

- For an indepth look at the API data flow, please refer to this [report]().
- See the API documentation at [Scalar]().

## Main Technologies

### Languages

- TypeScript
- HTML
- CSS

### Backend

- Node.js
- Express
- MongoDB
- JWT
- bcrypt

### Frontend

- React
- Axios

### Hosting

- Backend: [Render](https://render.com/)
- Frontend: [Vercel](https://vercel.com)

## Dependencies

### Backend

```plaintext
game-journal-backend
├── bcryptjs ^3.0.2
├── cors ^2.8.5
├── express ^5.1.0
├── express-rate-limit ^8.0.1
├── express-xss-sanitizer ^2.0.0
├── helmet ^8.1.0
├── http-status-codes ^2.3.0
├── jsonwebtoken ^9.0.2
├── mongoose ^8.16.5
├── morgan ^1.10.1
├── ms ^2.1.3
├── validator ^13.15.15
├── zod ^4.0.14
├── @types/axios ^0.9.36 (dev)
├── @types/cors ^2.8.19 (dev)
├── @types/express ^5.0.3 (dev)
├── @types/express-xss-sanitizer ^2.0.0 (dev)
├── @types/jsonwebtoken ^9.0.10 (dev)
├── @types/mongoose ^5.11.96 (dev)
├── @types/morgan ^1.9.10 (dev)
├── @types/node ^24.1.0 (dev)
├── @types/validator ^13.15.2 (dev)
├── @typescript-eslint/eslint-plugin ^7.18.0 (dev)
├── @typescript-eslint/parser ^7.18.0 (dev)
├── eslint ^8.57.1 (dev)
├── eslint-config-airbnb-base ^15.0.0 (dev)
├── eslint-config-airbnb-typescript ^18.0.0 (dev)
├── eslint-config-prettier ^10.1.8 (dev)
├── eslint-plugin-import ^2.32.0 (dev)
├── prettier ^3.6.2 (dev)
├── tsx ^4.20.3 (dev)
└── typescript ~5.5.0 (dev)
```

### Frontend

```plaintext
game-journal-frontend
├── axios ^1.11.0
├── react ^19.1.0
├── react-dom ^19.1.0
├── react-icons ^5.5.0
├── react-router-dom ^7.7.1
├── react-toastify ^11.0.5
├── @eslint/js ^9.30.1 (dev)
├── @types/react ^19.1.8 (dev)
├── @types/react-dom ^19.1.6 (dev)
├── @types/react-router-dom ^5.3.3 (dev)
├── @vitejs/plugin-react ^4.6.0 (dev)
├── eslint ^9.30.1 (dev)
├── eslint-plugin-react-hooks ^5.2.0 (dev)
├── eslint-plugin-react-refresh ^0.4.20 (dev)
├── globals ^16.3.0 (dev)
├── prettier ^3.6.2 (dev)
├── typescript ~5.8.3 (dev)
├── typescript-eslint ^8.35.1 (dev)
└── vite ^7.0.4 (dev)
```
