import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EventsModule } from "./events/events.module";
import { GameModule } from "./game/game.module";
import { PlayerModule } from "./player/player.module";

@Module({
  imports: [EventsModule, GameModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
