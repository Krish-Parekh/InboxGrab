import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { postFetcher } from "@/lib/fetcher";

export function useMutation<ExtraArgs, Data>(
	key: string,
	fetcher: (_key: string, _options?: { arg: ExtraArgs }) => Promise<Data>,
	config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>,
) {
	return useSWRMutation<Data, Error, string, ExtraArgs>(key, fetcher, {
		...config,
	});
}

export function useEmailServerMutation<ExtraArgs, Data>(
	key: string,
	config?: SWRMutationConfiguration<Data, Error, string, ExtraArgs>,
) {
	return useMutation<ExtraArgs, Data>(key, postFetcher(), config);
}
