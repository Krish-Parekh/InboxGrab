import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	getFirstDayOfThreeYearsAgo,
	getFirstDayOfYear,
	getToday,
} from "@/lib/date";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
	from: z.email({ error: "Invalid email address" }),
	startDate: z
		.date({ error: "Invalid start date" })
		.refine(
			(date) => date >= getFirstDayOfThreeYearsAgo() && date <= getToday(),
			{
				message: "Start date must be today or later",
			},
		),
	endDate: z
		.date({ error: "Invalid end date" })
		.refine(
			(date) => date >= getFirstDayOfThreeYearsAgo() && date <= getToday(),
			{
				message: "End date must be today or later",
			},
		),
});

export default function SearchForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			from: "",
			startDate: getFirstDayOfYear(),
			endDate: getToday(),
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				data-testid="search-form"
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-3 gap-4 items-center"
			>
				<FormField
					control={form.control}
					name="from"
					render={({ field }) => (
						<FormItem>
							<FormLabel>From</FormLabel>
							<FormControl>
								<Input {...field} placeholder="From" />
							</FormControl>
							<FormMessage>{form.formState.errors.from?.message}</FormMessage>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="startDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Start Date</FormLabel>
							<FormControl>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"pl-3 text-left font-normal",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Start Date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											defaultMonth={field.value}
											disabled={(date) =>
												date > getToday() || date < getFirstDayOfThreeYearsAgo()
											}
											selected={field.value}
											onSelect={field.onChange}
											startMonth={getFirstDayOfThreeYearsAgo()}
											endMonth={getToday()}
											captionLayout="dropdown"
											broadcastCalendar={false}
										/>
									</PopoverContent>
								</Popover>
							</FormControl>
							<FormMessage>
								{form.formState.errors.startDate?.message}
							</FormMessage>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="endDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>End Date</FormLabel>
							<FormControl>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"pl-3 text-left font-normal",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>End Date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											defaultMonth={field.value}
											selected={field.value}
											disabled={(date) =>
												date > getToday() || date < getFirstDayOfThreeYearsAgo()
											}
											onSelect={field.onChange}
											captionLayout="dropdown"
											broadcastCalendar={false}
										/>
									</PopoverContent>
								</Popover>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit" className="col-span-3">
					Search
				</Button>
			</form>
		</Form>
	);
}
