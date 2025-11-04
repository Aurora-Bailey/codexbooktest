<script>
	import favicon from '$lib/assets/favicon.svg';

	const year = new Date().getFullYear();
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Merriweather:wght@300;400;700&display=swap"
	/>
</svelte:head>

<div class="app">
	<header class="header">
		<a href="/" class="title">Codexarium</a>
		<p class="tagline">Collected writings from shadowed halls &amp; bright labs</p>
	</header>

	<main class="content">
		<section class="page">
			{@render children?.()}
		</section>
	</main>

	<footer class="footer">
		<p>&copy; {year} Codexarium</p>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		min-height: 100vh;
		background-color: #f2e8d9;
		color: #2a1c12;
		font-family: 'Lora', 'Merriweather', Georgia, serif;
		line-height: 1.7;
		-webkit-font-smoothing: antialiased;
	}

	:global(a) {
		color: inherit;
	}

	:global(code) {
		font-family: 'Fira Code', 'Source Code Pro', monospace;
		background: rgba(0, 0, 0, 0.05);
		padding: 0.15rem 0.35rem;
		border-radius: 0.3rem;
	}

	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2.5rem 1.5rem 2rem;
		gap: 2rem;
	}

	.header {
		text-align: center;
	}

	.title {
		font-family: 'Merriweather', serif;
		font-size: clamp(2.2rem, 6vw, 3.4rem);
		letter-spacing: 0.08em;
		text-decoration: none;
		text-transform: uppercase;
		color: #2a1c12;
	}

	.tagline {
		margin: 0.35rem 0 0;
		font-size: 0.95rem;
		letter-spacing: 0.32em;
		text-transform: uppercase;
		color: rgba(42, 28, 18, 0.6);
		font-weight: 500;
	}

	.content {
		width: min(960px, 100%);
	}

	.page {
		background: rgba(255, 252, 245, 0.96);
		border-radius: 14px;
		box-shadow:
			0 10px 35px rgba(33, 22, 15, 0.12),
			0 0 0 1px rgba(112, 86, 59, 0.08);
		padding: clamp(1.8rem, 5vw, 3.2rem);
		backdrop-filter: blur(2px);
	}

	.footer {
		text-align: center;
		font-size: 0.9rem;
		color: rgba(42, 28, 18, 0.55);
	}

	@media (max-width: 640px) {
		.app {
			padding: 1.75rem 1rem 2rem;
		}

		.page {
			padding: clamp(1.25rem, 6vw, 2.25rem);
			border-radius: 12px;
		}

		.tagline {
			letter-spacing: 0.2em;
		}
	}
</style>
