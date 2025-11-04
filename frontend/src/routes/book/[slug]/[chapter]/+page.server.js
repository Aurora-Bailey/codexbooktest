import { error } from '@sveltejs/kit';
import {
	getChapterWithNeighbors,
	listBookSlugs,
	listChapterSlugs,
	formatBookTitle
} from '$lib/server/book-data';

export const entries = async () => {
	const slugs = await listBookSlugs();
	const chaptersPerBook = await Promise.all(
		slugs.map(async (slug) => (await listChapterSlugs(slug)).map((chapter) => ({ slug, chapter })))
	);
	return chaptersPerBook.flat();
};

export const load = async ({ params: { slug, chapter } }) => {
	try {
		const { current, prev, next } = await getChapterWithNeighbors(slug, chapter);
		return {
			bookSlug: slug,
			bookTitle: formatBookTitle(slug),
			chapter: current,
			prev,
			next
		};
	} catch (err) {
		console.error(`Unable to load chapter '${chapter}' from book '${slug}':`, err);
		throw error(404, 'Chapter not found');
	}
};
