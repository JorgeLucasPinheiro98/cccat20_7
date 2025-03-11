import ProcessPayment from "../../application/usecase/ProcessPayment";
import { inject } from "../di/Registry";
import HttpServer from "../http/HttpServer";

// Interface Adapter
export default class PaymentController {
    @inject("httpServer")
    httpServer!: HttpServer;
    @inject("processPayment")
    processPayment!: ProcessPayment;

    constructor () {
        this.httpServer.register("post", "/process_payment", async (params: any, body: any) => {
            const input = body;
            const output = await this.processPayment.execute(input);
            return output;
        });
    }
}
