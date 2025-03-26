const amqp = require("amqplib");

const {
  EXCHANGE_NAME,
  MESSAGE_BROKER_URL,
  REMINDER_BINDING_KEY,
  CHANNEL_NAME,
} = require("../Config/ServerConfig");

const createChannel = async () => {
  try {
    const connection = await amqp.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: false });

    return channel;
  } catch (error) {
    throw error;
  }
};

const publishMessage = async (channel, binding_key, message) => {
  try {
    await channel.assertQueue("REMINDER_EMAIL_QUEUE");
    await channel.publish(
      EXCHANGE_NAME,
      binding_key,
      Buffer.from(message)
    );
  } catch (error) {
    throw error;
  }
};

const subscribeMessage = async (channel, service, binding_key) => {
  try {
    const applicationQueue = await channel.assertQueue("REMINDER_EMAIL_QUEUE");

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applicationQueue.queue, (msg) => {
      console.log("In subscribeMessage function ");
      console.log("Received data =>", msg.content.toString());

      const payload = JSON.parse(msg.content.toString());
      service(payload);

      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createChannel,
  publishMessage,
  subscribeMessage,
};
