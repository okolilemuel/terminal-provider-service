import {PubSub} from '@google-cloud/pubsub';
import * as Transactions from './Transactions';

const pubsub = new PubSub();

export async function receive() {
    const subscriptionName = 'terminal-transactions';
    const timeout = 60;

    // References an existing subscription
    const subscription = pubsub.subscription(subscriptionName);

    // Create an event handler to handle messages
    let messageCount = 0;
    const messageHandler = async message => {
        try {
            console.log(`Received message ${message.id}`);
            const data = JSON.parse(message.data);
            const savedTransactionId = await Transactions.saveTransaction(data);
            await Transactions.saveTransactionLabel(data.labels, savedTransactionId);

            messageCount += 1;
            message.ack();
        } catch (error) {
            console.error(error);
        }
    };

    // Listen for new messages until timeout is hit
    subscription.on(`message`, messageHandler);

    // setTimeout(() => {
    //     subscription.removeListener('message', messageHandler);
    //     console.log(`${messageCount} message(s) received.`);
    // }, timeout * 1000);
}