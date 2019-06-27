import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection } from "@nestjs/websockets";
import { GameService } from "./game.service";
import { Client, Server } from "socket.io";
import { Player } from "../player/player.controller";
import { Game } from "./game.controller";
import { WSMessage } from "src/shared/wsmessage.intf";

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
		return { event: "message", data: { client: null, content: "Game created"}};
	}

	@SubscribeMessage("joinGame")
	public registerNewPlayer(client: any, data: any) {
		const newPlayer: Player = data.client;
		newPlayer.client = client;
		let mygame = this.gameService.getGame(data.content);
		mygame.addPlayer(newPlayer);


		this.broadcast(mygame, { event: "newPlayer", data: { client: newPlayer, content: mygame.players}});

		return this.gameService.getGameList();

	}

	@SubscribeMessage("movePlayer")
	public movePlayer(client: any, data: any) {
		let magame = this.gameService.getPlayerGame(data.client.id);
		this.broadcast(magame, { event: "movePlayer", data: data.content });

	}

	public broadcast(game: Game, message: WSMessage) {
		const data = JSON.stringify(message);
		game.players.forEach(player => player.client.send(data));
	}
}
