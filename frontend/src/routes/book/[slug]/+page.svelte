<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>{data.book.title} · Codexarium</title>
    <meta
        name="description"
        content={`Chapter summaries for ${data.book.title} available in the Codexarium reader.`}
    />
</svelte:head>

<nav class="back">
    <a href="/">← Library</a>
</nav>

<header class="hero">
    <h1>{data.book.title}</h1>
    <p>
        {data.book.chapters.length} chapters · select a summary below to open the corresponding
        manuscript page.
    </p>
</header>

<section class="toc">
    <ol>
        {#each data.book.chapters as chapter}
            <li>
                <a href={`/book/${data.book.slug}/${chapter.slug}`}>
                    <span class="number">{chapter.metadata.chapter}</span>
                    <div class="summary">
                        <h2>{chapter.metadata.title}</h2>
                        <p>{chapter.metadata.summary}</p>
                    </div>
                </a>
            </li>
        {/each}
    </ol>
</section>

<style>
    .back {
        margin-bottom: 1.25rem;
    }

    .back a {
        text-decoration: none;
        font-size: 0.95rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(26, 18, 12, 0.75);
    }

    .hero h1 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 2.8rem);
        font-family: 'Merriweather', serif;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #21140c;
    }

    .hero p {
        margin: 0.45rem 0 0;
        color: rgba(32, 22, 15, 0.75);
        font-size: 1rem;
    }

    .toc {
        margin-top: 2.2rem;
    }

    .toc ol {
        margin: 0;
        padding: 0;
        display: grid;
        gap: 1.4rem;
        list-style: none;
    }

    .toc li a {
        display: flex;
        gap: 1rem;
        padding: 1.4rem 1.2rem;
        border-radius: 12px;
        text-decoration: none;
        background: rgba(255, 252, 246, 0.95);
        box-shadow:
            0 8px 20px rgba(25, 16, 9, 0.1),
            0 0 0 1px rgba(116, 96, 74, 0.08);
        transition: transform 150ms ease, box-shadow 150ms ease;
        color: inherit;
    }

    .toc li a:hover,
    .toc li a:focus-visible {
        transform: translateY(-3px);
        box-shadow:
            0 12px 26px rgba(25, 16, 9, 0.15),
            0 0 0 1px rgba(116, 96, 74, 0.12);
    }

    .number {
        font-family: 'Merriweather', serif;
        font-size: 1.6rem;
        font-weight: 600;
        color: rgba(26, 17, 10, 0.85);
        min-width: 2.5rem;
    }

    .summary h2 {
        margin: 0;
        font-size: 1.25rem;
        color: #21140c;
        letter-spacing: 0.03em;
    }

    .summary p {
        margin: 0.45rem 0 0;
        color: rgba(32, 22, 15, 0.75);
        line-height: 1.6;
    }

    @media (max-width: 600px) {
        .toc li a {
            flex-direction: column;
            gap: 0.75rem;
        }

        .number {
            min-width: auto;
        }
    }
</style>
