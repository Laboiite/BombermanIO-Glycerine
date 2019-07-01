import { IWSMessageContent } from "./wsmessage.intf";

export interface IWSMessageGame extends IWSMessageContent {
	content: {
		name: string;
	};
}
