import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EventsModule } from "./events/events.module";
import { GameModule } from "./game/game.module";
import { PlayersModule } from "./players/players.module";

@Module({
  imports: [EventsModule, GameModule, PlayersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
