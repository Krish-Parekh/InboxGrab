export function getFirstDayOfThreeYearsAgo(): Date {
	return new Date(new Date().getFullYear() - 3, 0, 1);
}

export function getFirstDayOfYear(): Date {
	return new Date(new Date().getFullYear(), 0, 1);
}

export function getToday(): Date {
	return new Date();
}
