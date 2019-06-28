export interface WSMessageContent {
	sender: any;
	content: any;
}

export interface WSMessage {
	event: string;
	data: WSMessageContent;
}
