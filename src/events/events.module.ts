import { Module } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";
import { GameService } from "../game/game.service";

@Module({
  providers: [EventsGateway, GameService],
})
export class EventsModule {}
