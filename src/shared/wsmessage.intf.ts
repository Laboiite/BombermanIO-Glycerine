export interface WSMessage {
	event: string;
	data: {
		client: any,
		content: any,
	};
}
