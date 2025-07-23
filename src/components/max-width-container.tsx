import { cn } from "@/lib/utils";
import type React from "react";

interface MaxWidthContainerProps {
	children: React.ReactNode;
	className?: string;
}

export default function MaxWidthContainer({
	children,
	className,
}: MaxWidthContainerProps) {
	return (
		<div className={cn("mx-auto w-full max-w-7xl px-2.5 md:px-20", className)}>
			{children}
		</div>
	);
}
