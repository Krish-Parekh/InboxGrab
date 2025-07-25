"use client";
import React, { useEffect } from "react";

export default function ClientComponent() {
	const handleFetchEmail = async () => {
		const response = await fetch("/api/email", {
			method: "POST",
			body: JSON.stringify({
				from: "noreply@post.xero.com",
				startDate: new Date("2025-01-01"),
				endDate: new Date("2025-07-25"),
			}),
		});
		const data = await response.json();
		console.log("Data: ", data);
	};
	useEffect(() => {
		handleFetchEmail();
	}, []);
	return <h1>Client Component</h1>;
}
