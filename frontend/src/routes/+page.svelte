<script>
	export let data;
	const { books } = data;
</script>

<svelte:head>
    <title>Codex Library</title>
    <meta
        name="description"
        content="Browse infernal and luminous tomes rendered by the SvelteKit static reader."
    />
</svelte:head>

<section class="intro">
	<h1>The Reading Room</h1>
	<p>
		Each volume below is sourced directly from the JSON manuscripts in <code>books/</code>. Choose a
		title to open its chapters within the same weathered folio.
	</p>
</section>

{#if books.length === 0}
	<p class="empty">No books available yet.</p>
{:else}
	<section class="shelf" aria-label="Available books">
		{#each books as book}
			<a class="card" href={`/book/${book.slug}`}>
				<header>
					<h2>{book.title}</h2>
				</header>
				<p class="chapters">{book.chapterCount} chapters</p>
				{#if book.firstChapterTitle}
					<p class="lead-in">Opens with “{book.firstChapterTitle}”.</p>
				{/if}
			</a>
		{/each}
	</section>
{/if}

<style>
	.intro {
		margin-bottom: 2.25rem;
	}

	h1 {
		font-size: clamp(2.2rem, 4vw, 3rem);
		margin-bottom: 0.65rem;
		font-family: 'Merriweather', serif;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	p {
		color: #2a1c12;
		margin: 0;
	}

	.empty {
		color: rgba(52, 34, 22, 0.7);
	}

	.shelf {
		display: grid;
		gap: 1.6rem;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	}

	.card {
		display: block;
		border-radius: 12px;
		padding: 1.6rem 1.4rem 9rem 1.4rem;
		text-decoration: none;
		background: rgba(255, 252, 245, 0.92);
		box-shadow:
			0 8px 22px rgba(25, 16, 9, 0.12),
			0 0 0 1px rgba(120, 98, 73, 0.08);
		transition: transform 150ms ease, box-shadow 150ms ease;
		position: relative;
	}

	.card:hover,
	.card:focus-visible {
		transform: translateY(-4px);
		box-shadow:
			0 12px 28px rgba(25, 16, 9, 0.18),
			0 0 0 1px rgba(120, 98, 73, 0.12);
	}

	.card h2 {
		margin: 0;
		font-size: 1.25rem;
		font-family: 'Merriweather', serif;
		color: #21140c;
		letter-spacing: 0.05em;
	}

	.chapters {
		margin-top: 0.75rem;
		font-size: 0.95rem;
		color: rgba(42, 28, 18, 0.7);
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}

	.lead-in {
		margin-top: 0.85rem;
		font-size: 0.98rem;
		color: #2a1c12;
		font-style: italic;
	}

	@media (max-width: 600px) {
		.shelf {
			grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		}
	}
</style>
