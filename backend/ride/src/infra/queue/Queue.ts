import amqp from "amqplib";

export default interface Queue {
    connect (): Promise<void>;
    publish (event: string, input: any): Promise<void>;
    consume (event: string, callback: Function): Promise<void>;
}

export class RabbitMQAdapter implements Queue {
    connection: any;

    constructor () {
    }

    async connect(): Promise<void> {
        this.connection = await amqp.connect("amqp://localhost");
    }

    async publish(exchange: string, input: any): Promise<void> {
        const channel = await this.connection.createChannel();
        channel.publish(exchange, "", Buffer.from(JSON.stringify(input)));
    }

    async consume(queue: string, callback: Function): Promise<void> {
        const channel = await this.connection.createChannel();
        channel.consume(queue, async (msg: any) => {
            const input = msg.content.toString();
            await callback(input);
            channel.ack(msg);
        });
    }

}
