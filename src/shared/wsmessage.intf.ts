import { BROADCAST } from "./broadcast.enum";

export interface IWSMessageContent {
	sender: any;
	content: any;
}

export class WSMessage {
	public event: string;
	public data: IWSMessageContent;

	constructor(eventMessage: BROADCAST, sender: any, content: any) {
		this.event= eventMessage,
		this.data.sender= sender;
		this.data.content= content;
	}
}
