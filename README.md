# realifeRPG-backend

This project is the backend for a real-life RPG app. It uses Node.js, Express, and TypeScript to provide API routes for interacting with a MongoDB database and exposing them to the front app.

## Technologies Used

* **Node.js:** JavaScript runtime environment
* **Express:** Web application framework for Node.js
* **TypeScript:** Typed superset of JavaScript
* **MongoDB:** NoSQL database

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/realifeRPG-backend.git
   ```

2. **Install dependencies:**
   ```bash
   cd realifeRPG-backend
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## API Endpoints

The backend provides the following API endpoints:

* **GET /api/data:** Retrieves data from the MongoDB database.
* **POST /api/data:** Creates new data in the MongoDB database.
* **PUT /api/data/:id:** Updates existing data in the MongoDB database.
* **DELETE /api/data/:id:** Deletes data from the MongoDB database.

## Database Configuration

The MongoDB connection string is configured in the `config.ts` file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
