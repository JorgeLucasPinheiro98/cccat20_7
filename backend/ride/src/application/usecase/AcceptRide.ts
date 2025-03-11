import { inject } from "../../infra/di/Registry";
import Ride from "../../domain/entity/Ride";
import RideRepository from "../../infra/repository/RideRepository";
import AccountGateway from "../../infra/gateway/AccountGateway";

export default class AcceptRide {
    @inject("accountGateway")
    accountGateway!: AccountGateway;
    @inject("rideRepository")
    rideRepository!: RideRepository;

    async execute (input: Input): Promise<void> {
        const account = await this.accountGateway.getAccountById(input.driverId);
        if (!account || !account.isDriver) throw new Error("The account must be from a driver");
        const ride = await this.rideRepository.getRideById(input.rideId);
        ride.accept(input.driverId);
        await this.rideRepository.updateRide(ride);
    }
}

type Input = {
    rideId: string,
    driverId: string
}
