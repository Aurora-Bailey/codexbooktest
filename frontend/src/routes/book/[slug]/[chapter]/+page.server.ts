import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	getChapterWithNeighbors,
	listBookSlugs,
	listChapterSlugs,
	formatBookTitle
} from '$lib/server/book-data';

export const entries = async () => {
	const slugs = await listBookSlugs();
	const entries: Array<{ slug: string; chapter: string }> = [];

	for (const slug of slugs) {
		const chapters = await listChapterSlugs(slug);
		for (const chapter of chapters) {
			entries.push({ slug, chapter });
		}
	}

	return entries;
};

export const load: PageServerLoad = async ({ params }) => {
	const { slug, chapter } = params;

	try {
		const chapterData = await getChapterWithNeighbors(slug, chapter);
		return {
			bookSlug: slug,
			bookTitle: formatBookTitle(slug),
			chapter: chapterData.current,
			prev: chapterData.prev,
			next: chapterData.next
		};
	} catch (err) {
		console.error(`Unable to load chapter '${chapter}' from book '${slug}':`, err);
		throw error(404, 'Chapter not found');
	}
};
