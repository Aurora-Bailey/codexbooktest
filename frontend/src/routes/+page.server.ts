import type { PageServerLoad } from './$types';
import { listBooks } from '$lib/server/book-data';

export const load: PageServerLoad = async () => {
	const books = await listBooks();
	return {
		books
	};
};
