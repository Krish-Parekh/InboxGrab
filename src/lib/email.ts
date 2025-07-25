const URLs = {
	GET_MESSAGES: "/users/me/messages",
};
export async function fetchEmail(from: string, to: string) {
	try {
		console.log("From: ", from);
		console.log("To: ", to);
	} catch (error) {
		console.error(error);
	}
}
