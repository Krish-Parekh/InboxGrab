import { create } from "zustand";
import { IEmailServerRequest } from "@/types/main";

type EmailSearchStore = {
	triggerSearch: (data: IEmailServerRequest) => void;
	setTriggerSearch: (fn: (data: IEmailServerRequest) => void) => void;
};

export const useEmailSearchStore = create<EmailSearchStore>((set) => ({
	triggerSearch: () => {},
	setTriggerSearch: (fn) => set({ triggerSearch: fn }),
}));
