<script>
	export let data;
	const { bookSlug, bookTitle, chapter, prev, next } = data;
	const { metadata, body } = chapter;
</script>

<svelte:head>
	<title>{metadata.title} · {bookTitle}</title>
	<meta name="description" content={metadata.summary} />
</svelte:head>

<nav class="crumbs" aria-label="Breadcrumb">
	<a href="/">Library</a>
	<span>›</span>
	<a href={`/book/${bookSlug}`}>{bookTitle}</a>
	<span>›</span>
	<span aria-current="page">Chapter {metadata.chapter}</span>
</nav>

<header class="chapter-head">
	<h1>{metadata.title}</h1>
	<p class="summary">{metadata.summary}</p>
	<p class="meta">
		{metadata.approx_word_count.toLocaleString()} words · Keywords:
		{#each metadata.keywords as keyword, index}
			<span>{keyword}</span>{index < metadata.keywords.length - 1 ? ', ' : ''}
		{/each}
	</p>
</header>

<section class="chapter-body">
	{#each body as paragraph, index}
		<p class:lead={index === 0}>{paragraph}</p>
	{/each}
</section>

<section class="references">
	<h2>Sources</h2>
	{#if metadata.references.length === 0}
		<p class="empty">No references recorded for this chapter.</p>
	{:else}
		<ol>
			{#each metadata.references as reference}
				<li>
					<strong>{reference.title}</strong> — {reference.author} ({reference.year}).
					<a href={reference.url} target="_blank" rel="noreferrer">{reference.url}</a>
					<small>{reference.note}</small>
				</li>
			{/each}
		</ol>
	{/if}
</section>

<nav class="chapter-nav" aria-label="Chapter navigation">
	<div>
		{#if prev}
			<a href={`/book/${bookSlug}/${prev.slug}`} class="nav-link">
				← Previous: {prev.metadata.title}
			</a>
		{/if}
	</div>
	<div>
		{#if next}
			<a href={`/book/${bookSlug}/${next.slug}`} class="nav-link">
				Next: {next.metadata.title} →
			</a>
		{/if}
	</div>
</nav>

<style>
    .crumbs {
        display: flex;
        gap: 0.55rem;
        font-size: 0.9rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(30, 20, 13, 0.7);
        margin-bottom: 1.2rem;
    }

    .crumbs a {
        text-decoration: none;
        color: rgba(30, 20, 13, 0.78);
    }

    h1 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 3rem);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        font-family: 'Merriweather', serif;
        color: #1a120b;
    }

    .summary {
        margin: 0.6rem 0 0;
        color: #26170f;
        font-size: 1.1rem;
        line-height: 1.66;
    }

    .meta {
        margin: 0.35rem 0 0;
        font-size: 0.95rem;
        color: rgba(26, 17, 11, 0.7);
    }

    .chapter-body {
        margin-top: 2rem;
    }

    .chapter-body p {
        margin: 0 0 1.55rem;
        text-indent: 1.75rem;
        font-size: 1.08rem;
        line-height: 1.85;
        color: #21150d;
        letter-spacing: 0.01em;
    }

    .chapter-body p.lead {
        text-indent: 0;
        position: relative;
    }

    .chapter-body p.lead::first-letter {
        float: left;
        font-size: 3.4rem;
        line-height: 0.8;
        margin-right: 0.45rem;
        font-family: 'Merriweather', serif;
        color: #1a0f07;
        font-weight: 600;
    }

    .references {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(32, 22, 15, 0.15);
    }

    .references h2 {
        margin: 0 0 1rem;
        font-size: 1.1rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #1f140c;
    }

    .references ol {
        margin: 0;
        padding-left: 1.4rem;
        display: grid;
        gap: 1rem;
        color: #24170e;
        font-size: 0.98rem;
        line-height: 1.6;
    }

    .references a {
        color: rgba(28, 18, 11, 0.85);
        word-break: break-word;
    }

    .references small {
        display: block;
        color: rgba(26, 17, 12, 0.65);
        margin-top: 0.3rem;
    }

    .references .empty {
        color: rgba(28, 18, 11, 0.6);
    }

    .chapter-nav {
        margin-top: 2.75rem;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        font-size: 0.95rem;
    }

    .nav-link {
        text-decoration: none;
        color: rgba(26, 17, 11, 0.8);
        letter-spacing: 0.04em;
    }

    @media (max-width: 640px) {
        .chapter-body p {
            text-indent: 1.2rem;
        }

        .chapter-nav {
            flex-direction: column;
            gap: 0.75rem;
        }
    }
</style>
