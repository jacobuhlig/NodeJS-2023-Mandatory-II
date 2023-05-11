<script>
    let data;

    async function fetchData() {
        const response = await fetch('http://localhost:8081/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
    }

    fetchData();
</script>

{#if data}
    <p>{JSON.stringify(data)}</p>
{:else}
    <p>Loading...</p>
{/if}
