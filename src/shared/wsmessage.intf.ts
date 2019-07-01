import { BROADCAST } from "./broadcast.enum";

export interface WSMessageContent {
	sender: any;
	content: any;
}

export class WSMessage {
	event: string;
	data: WSMessageContent;

	constructor(eventMessage: BROADCAST, sender: any, content: any) {
		this.event= eventMessage,
		this.data.sender= sender;
		this.data.content= content;
	}
}
