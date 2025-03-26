# RemainderMicroService

## Overview

RemainderMicroService is a microservice designed to handle reminders. It is part of the Auth_Service project and is built using Node.js.

## Features

- Create reminders
- Update reminders
- Delete reminders
- Retrieve reminders

- Different types of email notifications:
  - Welcome Email
  - Verification Email
  - Forgotten Password Email
  - Task Reminder Email
- **RabbitMQ Message Broker**: Integrates RabbitMQ for message brokering to handle asynchronous tasks.
- **Nodemailer**: Uses Nodemailer to send email notifications for reminders.
- **Cron Jobs**: Implements cron jobs for automatic scheduling of reminder notifications.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/RemainderMicroService.git
   ```
2. Navigate to the project directory:
   ```bash
   cd RemainderMicroService
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. The service will be available at `http://localhost:3004`.

## Environment Configuration

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
PORT=3004

EMAIL_ID=your_email@example.com
EMAIL_PASS='your_email_password'
EMAIL_SENDER=your_sender_email@example.com

EXCHANGE_NAME=AUTH_MICROSERVICE
REMINDER_BINDING_KEY=REMINDER_AUTH_SERVICE
MESSAGE_BROKER_URL='amqp://localhost'
```

## API Endpoints

- `POST /api/v1/createTicket` - Create a new ticket
- `POST /api/v1/deleteTicket` - Delete a ticket
- `POST /api/v1/updateTicket` - Update a ticket
- `POST /api/v1/updateNotificationTicket` - Update notification ticket
- `GET /api/v1/getTicketById` - Get a ticket by ID
- `GET /api/v1/filterByRange` - Filter tickets by date range
- `GET /api/v1/getPendingMail` - Get pending mail

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
