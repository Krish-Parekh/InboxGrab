import { create } from "zustand";
import { IEmailServerRequest } from "@/types/main";
import { IEmailDownloadRequest } from "@/types/main";

type EmailSearchStore = {
	triggerSearch: (data: IEmailServerRequest) => void;
	setTriggerSearch: (fn: (data: IEmailServerRequest) => void) => void;
};

type EmailDownloadStore = {
	downloadAttachments: (data: IEmailDownloadRequest[]) => void;
	setDownloadAttachments: (fn: (data: IEmailDownloadRequest[]) => void) => void;
};

export const useEmailSearchStore = create<
	EmailSearchStore & EmailDownloadStore
>((set) => ({
	triggerSearch: () => {},
	setTriggerSearch: (fn) => set({ triggerSearch: fn }),
	downloadAttachments: () => {},
	setDownloadAttachments: (fn) => set({ downloadAttachments: fn }),
}));
