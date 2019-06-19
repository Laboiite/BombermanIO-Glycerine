import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from "@nestjs/websockets";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
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

	// @SubscribeMessage("events")
	// public handleEvent(client: Client, data: string): string {
	// 	Logger.debug("In handleEvent of events with client id: " + client.id);
	// 	Logger.debug("In handleEvent of events with data: " + data);
	// 	return data;
	// }

	@SubscribeMessage("events")
	public findAll(client: Client, data: any): Observable<WsResponse<number>> {
		return from([1, 2, 3]).pipe(map(item => ({ event: "events", data: item })));
	}

	@SubscribeMessage("identity")
	public async identity(client: Client, data: number): Promise<number> {
		Logger.debug("In identity of events with client id: " + client.id);
		Logger.debug("In identity of events with data: " + data);
		return data;
	}
}
