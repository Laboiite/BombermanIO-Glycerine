import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection } from "@nestjs/websockets";
import { GameService } from "./game.service";
import { Client, Server } from "socket.io";
import { Player } from "../models/player.model";
import { Game } from "./game.controller";

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection {

	@WebSocketServer()
	public server: Server;
	public wsClients = [];
	constructor(public gameService: GameService) { }

	public handleConnection(client: any) {
		console.log("new client declared in wsClients");
		let alreadyThere = false;
		if (this.wsClients.length) {
			for (let c of this.wsClients) {
				if (c === client) {
					alreadyThere = true;
				}
			}
			if (!alreadyThere) {
				this.wsClients.push(client);
			}

		} else {
			console.log("init of wsClient");
			this.wsClients.push(client);
		}
	}

	@SubscribeMessage("games")
	public displayGames(client: Client, data: any): any {
		console.log("our games :", this.gameService.getGameList());
		return this.gameService.getGameList();
	}

	@SubscribeMessage("createGame")
	public createGame(client: any, data: any): any {
		const creator: Player = data.client;
		creator.client = client;
		this.gameService.createGame(data.content, creator);
		return this.gameService.getGameList();
	}

	@SubscribeMessage("joinGame")
	public registerNewPlayer(client: any, data: any) {
		const newPlayer: Player = data.client;
		newPlayer.client = client;
		let mygame = this.gameService.getGame(data.content);
		mygame.addPlayer(newPlayer);

		this.broadcast(mygame, { topic: "test", content: "content de test" });

		return this.gameService.getGameList();

	}

	public broadcast(game: Game, message: any) {
		const data = JSON.stringify(message);
		game.players.forEach(player => player.client.send(data));
	}
}
