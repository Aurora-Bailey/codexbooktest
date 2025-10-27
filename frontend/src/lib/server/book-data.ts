import type { Dirent } from 'fs';
import { readdir, readFile } from 'fs/promises';
import { resolve, join } from 'path';

const BOOKS_ROOT = resolve('..', 'books');

export interface Reference {
	title: string;
	author: string;
	year: string | number;
	url: string;
	note: string;
}

export interface ChapterMetadata {
	chapter: number;
	title: string;
	summary: string;
	keywords: string[];
	references: Reference[];
	approx_word_count: number;
}

export interface ChapterSummary {
	slug: string;
	metadata: ChapterMetadata;
}

export interface ChapterContent extends ChapterSummary {
	body: string[];
}

export interface BookSummary {
	slug: string;
	title: string;
	chapterCount: number;
	firstChapterTitle: string | null;
}

export interface BookDetail {
	slug: string;
	title: string;
	chapters: ChapterSummary[];
}

export function formatBookTitle(slug: string): string {
	return slug
		.replace(/[-_]/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

async function listBookDirectories(): Promise<string[]> {
	const entries = await readdir(BOOKS_ROOT, { withFileTypes: true });
	return entries
		.filter((entry: Dirent) => entry.isDirectory())
		.map((entry: Dirent) => entry.name)
		.sort((a: string, b: string) => a.localeCompare(b));
}

function isChapterFile(name: string): boolean {
	return name.toLowerCase().endsWith('.json');
}

function chapterSlugFromFilename(filename: string): string {
	return filename.replace(/\.json$/i, '');
}

async function loadChapterSummary(bookSlug: string, chapterFilename: string): Promise<ChapterSummary> {
	const filePath = join(BOOKS_ROOT, bookSlug, chapterFilename);
	const raw = await readFile(filePath, 'utf-8');
	const parsed = JSON.parse(raw) as { metadata: ChapterMetadata };

	return {
		slug: chapterSlugFromFilename(chapterFilename),
		metadata: parsed.metadata
	};
}

async function loadChapterContent(bookSlug: string, chapterSlug: string): Promise<ChapterContent> {
	const filePath = join(BOOKS_ROOT, bookSlug, `${chapterSlug}.json`);
	const raw = await readFile(filePath, 'utf-8');
	const parsed = JSON.parse(raw) as { metadata: ChapterMetadata; body: string[] };

	return {
		slug: chapterSlug,
		metadata: parsed.metadata,
		body: parsed.body
	};
}

function sortChapterSummaries(a: ChapterSummary, b: ChapterSummary): number {
	const diff = a.metadata.chapter - b.metadata.chapter;
	if (!Number.isNaN(diff) && diff !== 0) return diff;
	return a.slug.localeCompare(b.slug);
}

export async function listBooks(): Promise<BookSummary[]> {
	const slugs = await listBookDirectories();
	const results: BookSummary[] = [];

	for (const slug of slugs) {
		const chapters = await listChapters(slug);
		results.push({
			slug,
			title: formatBookTitle(slug),
			chapterCount: chapters.length,
			firstChapterTitle: chapters[0]?.metadata.title ?? null
		});
	}

	return results;
}

export async function listChapters(bookSlug: string): Promise<ChapterSummary[]> {
	const entries = await readdir(join(BOOKS_ROOT, bookSlug), { encoding: 'utf8' });
	const summaries = await Promise.all(
		entries
			.filter(isChapterFile)
			.map((filename: string) => loadChapterSummary(bookSlug, filename))
	);
	return summaries.sort(sortChapterSummaries);
}

export async function getBook(bookSlug: string): Promise<BookDetail> {
	const chapters = await listChapters(bookSlug);
	return {
		slug: bookSlug,
		title: formatBookTitle(bookSlug),
		chapters
	};
}

export interface ChapterWithNeighbors {
	current: ChapterContent;
	prev: ChapterSummary | null;
	next: ChapterSummary | null;
}

export async function getChapterWithNeighbors(
	bookSlug: string,
	chapterSlug: string
): Promise<ChapterWithNeighbors> {
	const chapters = await listChapters(bookSlug);
	const index = chapters.findIndex((chapter) => chapter.slug === chapterSlug);

	if (index === -1) {
		throw new Error(`Chapter ${chapterSlug} not found in book ${bookSlug}`);
	}

	const current = await loadChapterContent(bookSlug, chapterSlug);
	const prev = index > 0 ? chapters[index - 1] : null;
	const next = index < chapters.length - 1 ? chapters[index + 1] : null;

	return { current, prev, next };
}

export async function listBookSlugs(): Promise<string[]> {
	return listBookDirectories();
}

export async function listChapterSlugs(bookSlug: string): Promise<string[]> {
	const chapters = await listChapters(bookSlug);
	return chapters.map((chapter) => chapter.slug);
}
