import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBook, listBookSlugs } from '$lib/server/book-data';

export const entries = async () => {
	const slugs = await listBookSlugs();
	return slugs.map((slug) => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	try {
		const book = await getBook(slug);
		return { book };
	} catch (err) {
		console.error(`Unable to load book '${slug}':`, err);
		throw error(404, 'Book not found');
	}
};
