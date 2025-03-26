# Todo App - Microservice Architecture

This project is a Todo system built using Node.js and React, following a microservice architecture. Each microservice is containerized using Docker, and the frontend is also served as a separate container.

## Project Structure

The project is divided into the following components:

1. **API Gateway**: Handles routing and acts as a gateway for all microservices.
2. **Authentication Microservice**: Manages user authentication and authorization.
3. **Remainder Microservice**: Handles reminders for todos and authentication.
4. **Todo Microservice**: Manages the core todo operations.
5. **Frontend**: A React-based frontend for interacting with the Todo system.

## Prerequisites

- Install Docker and Docker Compose on your system.
- Install Node.js if you want to run services locally.

## Setup and Configuration

### Clone the Repository

```bash
git clone https://github.com/Saroj-kr-tharu/TodoApi.git
cd TodoApi
```

### Environment Variables

Each service requires a `.env` file for configuration. Below are the required environment variables for each service:

#### API Gateway (`01_ApiGateway_Todo/.env`)

```
PORT=<API Gateway Port>
```

#### Authentication Microservice (`02_AuthMicroService_Todo/.env`)

```
PORT=<Auth Service Port>
DB_URI=<Database Connection String>
JWT_SECRET=<JWT Secret>
```

#### Remainder Microservice (`03_RemainderMicroService_Todo/.env`)

```
PORT=<Remainder Service Port>
DB_URI=<Database Connection String>
```

#### Todo Microservice (`04_TodoApp_Main_MicroService_Todo/.env`)

```
PORT=<Todo Service Port>
DB_URI=<Database Connection String>
```

#### Frontend (`05_Fortend_Todo/.env`)

```
REACT_APP_API_URL=<API Gateway URL>
```



### Build and Run with Docker Compose

To build and run all services using Docker Compose, execute the following command in the root directory:

```bash
docker-compose up --build
```

This will start all the microservices and the frontend in separate Docker containers.

## API Endpoints

### API Gateway

- **Get all Todos**: `GET /api/v1/todos`
- **Get Todo by ID**: `GET /api/v1/todo?id=todoId`

### Authentication Microservice

- **Login**: `POST /auth/login`
- **Register**: `POST /auth/register`

### Remainder Microservice

- **Set Reminder**: `POST /remainder`
- **Get Reminders**: `GET /remainder`

### Todo Microservice

- **Create Todo**: `POST /todo`
- **Update Todo**: `PUT /todo`
- **Delete Todo**: `DELETE /todo`

## Frontend

The frontend is built using React and Tailwind CSS. It provides a user-friendly interface for managing todos, setting reminders, and user authentication.

### Accessing the Frontend

Once the Docker containers are running, the frontend can be accessed at:

```
http://localhost:<Frontend Port>
```

## Contributing

Contributions to the Todo App are welcome. If you find any issues or want to add new features, please open an issue or submit a pull request. Ensure that your code follows the established coding style and is well-documented.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

We would like to acknowledge the following resources and libraries that contributed to the development of the Todo App:

- Node.js: https://nodejs.org/
- React: https://reactjs.org/
- Tailwind CSS: https://tailwindcss.com/
- Other dependencies mentioned in the `package.json` files.