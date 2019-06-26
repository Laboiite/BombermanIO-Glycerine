import { Injectable } from "@nestjs/common";
import { Game } from "./game.controller";
import { Player } from "../models/player.model";
export enum GAME_STATUS {
	WAITING = "WAITING",
	ONGOING = "ONGOING",
	ENDED = "ENDED",
	BREAK = "BREAK",
}
@Injectable()
export class GameService {
	private games: Game[] = [];

	public createGame(gameName: string, gameCreator: Player) {
		const newGame = new Game(gameName, 2);
		newGame.addPlayer(gameCreator);
		this.games.push(newGame);
	}

	public getGame(name: string) {
		return this.games.find(game => game.name === name);
	}

	public getGameList() {
		return this.games;
	}

}
