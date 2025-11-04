import { error } from '@sveltejs/kit';
import { getBook, listBookSlugs } from '$lib/server/book-data';

export const entries = async () => (await listBookSlugs()).map((slug) => ({ slug }));

export const load = async ({ params: { slug } }) => {
	try {
		return { book: await getBook(slug) };
	} catch (err) {
		console.error(`Unable to load book '${slug}':`, err);
		throw error(404, 'Book not found');
	}
};
