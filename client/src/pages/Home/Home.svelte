<script>
    let blogs;

    async function fetchBlogs() {
        const response = await fetch('http://localhost:8081/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        blogs = await response.json();
    }

    fetchBlogs();
</script>

{#if blogs}
    {#each blogs as blog (blog.id)}
        <p>{blog.title}<br>
            {blog.content}</p>
    {/each}
{:else}
    <p>Loading...</p>
{/if}
