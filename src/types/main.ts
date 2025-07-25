export interface IEmailServerRequest {
	from: string;
	startDate: Date;
	endDate: Date;
}

export interface IEmailServerResponse {
	emails: IEmailResponse[];
	message: string;
}

export interface IEmailResponse {
	id: string;
	threadId: string;
	subject: string;
	from: string;
	date: string;
	attachments: IAttachment[];
}

export interface IMessage {
	id: string;
	threadId: string;
}

export interface IMessageResponse {
	messages: IMessage[];
}

export interface IMessageDetail {
	id: string;
	threadId: string;
	labelIds: string[];
	snippet: string;
	sizeEstimate: number;
	historyId: string;
	internalDate: string;
	payload: IPayload;
}

export interface IAttachment {
	id: string;
	filename: string;
	mimeType: string;
	size: number;
	data: string;
}

export interface IPayload {
	partId: string;
	mimeType: string;
	filename: string;
	headers: IHeader[];
	body: IBody;
	parts: IPart[];
}

export interface IHeader {
	name: string;
	value: string;
}

export interface IBody {
	size: number;
}

export interface IPart {
	partId: string;
	mimeType: string;
	filename: string;
	headers: IPartHeader[];
	body: IPartBody;
}

export interface IPartHeader {
	name: string;
	value: string;
}

export interface IPartBody {
	size: number;
	data?: string;
	attachmentId?: string;
}
