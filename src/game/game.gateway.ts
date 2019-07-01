import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection } from "@nestjs/websockets";
import { GameService } from "./game.service";
import { Client, Server } from "socket.io";
import { Player } from "../player/player.controller";
import { Game } from "./game.controller";
import { WSMessage, WSMessageContent } from "../shared/wsmessage.intf";
import { BROADCAST } from "../shared/broadcast.enum";

@WebSocketGateway()
export class GameGateway  {
	// implements OnGatewayConnection
	@WebSocketServer()
	public server: Server;
	public wsClients = [];
	constructor(public gameService: GameService) { }

	// public handleConnection(client: any) {
	// 	console.log("new client declared in wsClients");
	// 	let alreadyThere = false;
	// 	if (this.wsClients.length) {
	// 		for (let c of this.wsClients) {
	// 			if (c === client) {
	// 				alreadyThere = true;
	// 			}
	// 		}
	// 		if (!alreadyThere) {
	// 			this.wsClients.push(client);
	// 		}

	// 	} else {
	// 		console.log("init of wsClient");
	// 		this.wsClients.push(client);
	// 	}
	// }

	@SubscribeMessage("getGames")
	public getGames(client: Client, msg: WSMessageContent): any {
		console.log("our games :", this.gameService.getGameList());
		return JSON.stringify(new WSMessage(BROADCAST.MESSAGE, msg.sender, this.gameService.getGameList()) );
	}

	@SubscribeMessage("createGame")
	public createGame(client: any, msg: WSMessageContent): any {

		const creator: Player = msg.sender;
		creator.client = client;
		this.gameService.createGame(msg.content, creator);

		console.log("--- createGame", msg.content, creator.nickName, creator.id);

		// return { event: "message", data: { client: null, content: "Game created"}};
	}

	@SubscribeMessage("joinGame")
	public registerNewPlayer(client: any, msg: WSMessageContent) {

		const newPlayer: Player = msg.sender;
		newPlayer.client = client;
		const mygame = this.gameService.getGame(msg.content);
		mygame.addPlayer(newPlayer);

		console.log("--- joinGame", msg.content, newPlayer.nickName, newPlayer.id);

		// this.broadcast(mygame, { event: BROADCAST.NEWPLAYER, data: { client: newPlayer, content: mygame.players}});
		this.broadcast(mygame, newPlayer.id, BROADCAST.NEWPLAYER, mygame.players);

		return this.gameService.getGameList();

	}

	@SubscribeMessage("movePlayer")
	public movePlayer(client: any, msg: WSMessageContent) {

		console.log("--- movePlayer", msg.sender.id, msg.content);

		try {
			const magame = this.gameService.getPlayerGame(msg.sender.id);
			console.log("--- mygame", magame, magame.players);
			this.broadcast(magame, msg.sender.id, BROADCAST.MOVEPLAYER, msg.content );
		}
		catch(e) {
			console.log("ERROR", e);
		}

		return "OK";
	}

	public broadcast(game: Game, sender: string, message: BROADCAST, data: any) {
		const wsmsg: WSMessage= {
			event: message,
			data: {
				content: data,
				sender: sender
			}
		};
		game.players.forEach(player => {
			console.log(">>> BORADCAST ", message," TO ", player.nickName);
			player.client.send(JSON.stringify(wsmsg));
		});
	}


}
