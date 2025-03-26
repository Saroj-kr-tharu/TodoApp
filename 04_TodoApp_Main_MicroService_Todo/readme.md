# Node.js Basic Todo Api - Microservice Architecture

This project is a Todo system built using Node.js and following a microservice architecture.

# Welcome to Todo Service

## Project Setup

- Clone the project on your local
- Execute `npm install` on the same path as of your root directory of the downloaded project
- Create a `.env` file in the root directory and add the following environment variable
  - `PORT=<Any specified port>`

## API Endpoints

- **Get all Todo**

  ```
  GET /api/v1/todos
  ```

  Retrieves a list of all available todos.

  Response:

  ```json
  [
    {
      "id": "4e1a8250-d9a9-470b-8452-0a1ac07012b6",
      "title": "web complete",
      "completed": "false",
      "description": "web is completing the word",
      "createdAt": "2024-12-01 20:32:00",
      "updatedAt": "2024-12-01 21:50:04"
    },
    {
      "id": "607f83e1-16e0-4362-bbea-a57027ee1be9",
      "title": "call the doctor",
      "completed": "false",
      "description": "at 2p m",
      "createdAt": "2024-12-01 21:13:40",
      "updatedAt": "2024-12-01 21:13:40"
    }
  ]
  ```

- **Get Todo details by Todo ID**

  ```
  GET /api/v1/todo?id=todoId
  ```

  Retrieves details of a specific todo by todo ID.

  Response:

  ```json
  {
        "id": "e9b4bcc8-005e-4ac6-a172-1bf24a62a703",
        "title": "web complete",
        "completed": "false",
        "description": "web is completing the word",
        "createdAt": "2024-12-01 21:16:34",
        "updatedAt": "2024-12-01 22:27:13"
    }
  ```


## Setup and Configuration

To set up and run the Todo Service, follow these steps:

1. Install Node.js if they are not already installed.

2. Clone the repository:

   ```
   git clone https://github.com/Saroj-kr-tharu/TodoApi.git
   ```

3. Install the dependencies:

   ```
   cd TodoApi
   npm install
   ```
.



7. Start Todo Api:

   ```
   npm start
   ```

The Todo Api should now be running and ready to handle Todo information retrieval and search operations.

## Contributing

Contributions to the Todo Service are welcome. If you find any issues or want to add new features, please open an issue or submit a pull request. Ensure that your code follows the established coding style and is well-documented.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

We would like to acknowledge the following resources and libraries that contributed to the development of the Todo API:

- Node.js: https://nodejs.org/
- Other dependencies mentioned in the `package.json` file.
