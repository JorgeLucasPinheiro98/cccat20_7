import AccountRepository from "../../infra/repository/AccountRepository";
import { inject } from "../../infra/di/Registry";
import Ride from "../../domain/entity/Ride";
import RideRepository from "../../infra/repository/RideRepository";
import Position from "../../domain/entity/Position";
import PositionRepository from "../../infra/repository/PositionRepository";
import DistanceCalculator from "../../domain/service/DistanceCalculator";
import FareCalculator from "../../domain/service/FareCalculator";
import ProcessPayment from "./ProcessPayment";

export default class FinishRide {
    @inject("positionRepository")
    positionRepository!: PositionRepository;
    @inject("rideRepository")
    rideRepository!: RideRepository;

    async execute (input: Input): Promise<void> {
        const ride = await this.rideRepository.getRideById(input.rideId);
        ride.finish();
        await this.rideRepository.updateRide(ride);
        // um use case chamou o outro
        const processPayment = new ProcessPayment();
        await processPayment.execute(input.rideId);
    }
}

type Input = {
    rideId: string
}
