const amqp = require('amqplib');
require('dotenv').config();
const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ', error);
    throw new Error('Could not connect to RabbitMQ');
  }
};

module.exports = { connectRabbitMQ };
