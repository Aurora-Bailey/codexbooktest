import { readdir, readFile } from 'fs/promises';
import { join, resolve } from 'path';

const BOOKS_ROOT = resolve('..', 'books');

const isJsonFile = (entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.json');
const stripJson = (filename) => filename.replace(/\.json$/i, '');
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

const sortChapters = (a, b) => {
	const diff = (a.metadata?.chapter ?? NaN) - (b.metadata?.chapter ?? NaN);
	return Number.isFinite(diff) && diff !== 0 ? diff : a.slug.localeCompare(b.slug);
};

const listDirectories = async (dir) =>
	(await readdir(dir, { withFileTypes: true }))
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort((a, b) => a.localeCompare(b));

export const formatBookTitle = (slug) =>
	slug
		.replace(/[-_]/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());

const chapterSummaries = async (bookSlug) => {
	const folder = join(BOOKS_ROOT, bookSlug);
	const entries = await readdir(folder, { withFileTypes: true });

	const chapters = await Promise.all(
		entries.filter(isJsonFile).map(async (entry) => {
			const { metadata } = await readJson(join(folder, entry.name));
			return { slug: stripJson(entry.name), metadata };
		})
	);

	return chapters.sort(sortChapters);
};

export const listBooks = async () => {
	const slugs = await listDirectories(BOOKS_ROOT);

	return Promise.all(
		slugs.map(async (slug) => {
			const chapters = await chapterSummaries(slug);
			return {
				slug,
				title: formatBookTitle(slug),
				chapterCount: chapters.length,
				firstChapterTitle: chapters[0]?.metadata.title ?? null
			};
		})
	);
};

export const listChapters = (bookSlug) => chapterSummaries(bookSlug);

export const getBook = async (bookSlug) => ({
	slug: bookSlug,
	title: formatBookTitle(bookSlug),
	chapters: await chapterSummaries(bookSlug)
});

export const getChapterWithNeighbors = async (bookSlug, chapterSlug) => {
	const chapters = await chapterSummaries(bookSlug);
	const index = chapters.findIndex(({ slug }) => slug === chapterSlug);

	if (index === -1) throw new Error(`Chapter ${chapterSlug} not found in book ${bookSlug}`);

	const file = join(BOOKS_ROOT, bookSlug, `${chapterSlug}.json`);
	const { metadata, body = [] } = await readJson(file);

	return {
		current: { slug: chapterSlug, metadata, body },
		prev: chapters[index - 1] ?? null,
		next: chapters[index + 1] ?? null
	};
};

export const listBookSlugs = () => listDirectories(BOOKS_ROOT);

export const listChapterSlugs = async (bookSlug) =>
	(await chapterSummaries(bookSlug)).map(({ slug }) => slug);
