import { inject } from "../../infra/di/Registry";
import { PaymentProcessorFactory } from "../../infra/fallback/PaymentProcessor";
import Mediator from "../../infra/mediator/Mediator";

export default class ProcessPayment {

    async execute (input: Input): Promise<void> {
        const processor = PaymentProcessorFactory.create();
        const output = await processor.processPayment(input);
        // saveTransaction...
        // await this.mediator.notifyAll("payment_approved", { externalId: input.externalId, type: input.type });
    }
}

type Input = {
    type: string,
    externalId: string,
    creditCardToken: string,
    amount: number
}
