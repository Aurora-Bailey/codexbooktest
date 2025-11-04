import { listBooks } from '$lib/server/book-data';

export const load = async () => ({ books: await listBooks() });
