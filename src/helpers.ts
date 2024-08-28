export const makeFirstLetterCapital = (word: string): string =>
	`${word.charAt(0).toUpperCase()}${word.slice(1)}`;
