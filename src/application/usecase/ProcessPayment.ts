import axios from "axios";
import { CieloPaymentGateway, PJBankPaymentGateway } from "../../infra/gateway/PaymentGateway";
import { inject } from "../../infra/di/Registry";
import RideRepository from "../../infra/repository/RideRepository";
import { PaymentProcessorFactory } from "../../infra/fallback/PaymentProcessor";

export default class ProcessPayment {
    @inject("rideRepository")
    rideRepository!: RideRepository;

    async execute (rideId: string): Promise<void> {
        const ride = await this.rideRepository.getRideById(rideId);
        // const gateway = new CieloPaymentGateway();
        // const gateway = new PJBankPaymentGateway();
        const processor = PaymentProcessorFactory.create();
        const input = { creditCardToken: "", amount: ride.getFare() };
        const output = await processor.processPayment(input);
        // saveTransaction...
    }
}
