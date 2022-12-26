export function convertDate(days: number): number {
	if (days == 0) {
		return Number(+new Date() / 1000 + 1800)
	}

	return Number(+new Date() / 1000 + 86400 * days)
}
