import { GAME_STATUS } from "./game.service";
import { Player } from "../player/player.controller";

export class Game {
	public name: string;
	public status: GAME_STATUS;
	public minPlayersRequired: number;
	public players: Player[];

	constructor(name: string, minPlayersRequired: number) {
		this.name = name;
		this.minPlayersRequired = minPlayersRequired;
		this.status = GAME_STATUS.WAITING;
		this.players = [];
	}

	public changeGameStatus(status: GAME_STATUS) {
		this.status = status;
	}

	public getGameStatus(): string {
		return this.status;
	}

	public findPlayer(uuid: string): Player {
		return this.players.find(player => player.uuid === uuid);
	}

	public addPlayer(player: Player) {
		this.players.push(player);
	}

	public removePlayer(player: Player) {
		// find and kick a player
	}
}
