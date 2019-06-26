import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from "@nestjs/websockets";
import { Client, Server } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class EventsGateway {

	@WebSocketServer()
	public server: Server;

	@SubscribeMessage("")
	public print(client: Client, data: any): string {
		Logger.error("Message received not related to any channel ");
		return "WOAW! ";

	}

	@SubscribeMessage("message")
	public displayMessage(client: Client, data: any): string {
		console.log("Message arriving on message canal:  " + data);
		// console.log("data" + JSON.stringify(data));
		return data;

	}

	@SubscribeMessage("identity")
	public async identity(client: Client, data: any): Promise<string> {
		console.log("data content arrived in identity gateway message: " + data.content);
		console.log("data client in identity gateway message: " + data.client);
		return data.content;
	}
}
