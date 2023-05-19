<script>
    "use strict";
    import { navigate } from "svelte-navigator";
    import { get } from "svelte/store";
    import { BASE_URL } from "../../stores/urls.js";
    import { user } from "../../stores/user.js";
    import { onMount } from "svelte";

    let blogs = [];
    let title = "";
    let content = "";

    async function fetchBlogs() {
        
        const baseUrl = get(BASE_URL); // Get the value of the BASE_URL store
        const blogURL = baseUrl + "/api/home/content";

        try {
            const response = await fetch(blogURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            
            const responseData = await response.json();
            console.log("Received data: ", responseData);
            blogs = responseData;
        }
        catch (e) {
            console.log(e);
        }
    };
    
    onMount(fetchBlogs);
</script>

<div class="container">
    <h1>Your Blog Posts</h1>
    {#if blogs.length}
        {#each blogs as blog (blog.id)}
            <div class="blog-post">
                <h2 class="blog-title">{blog.title}</h2>
                <p class="blog-content">{blog.content}</p>
            </div>
        {/each}
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 2em 1em;  /* Add padding to prevent content sticking to the edges */
  }

  h1 {
    margin-top: 2em; /* Ensures a minimum margin from the top */
  }

  .blog-post {
    width: 80%;
    margin-bottom: 2em;
    padding: 1em;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .blog-title {
    margin: 0;
    margin-bottom: 0.5em;
    color: #333;
    font-size: 1.5em;
  }

  .blog-content {
    color: #666;
    line-height: 1.6;
  }

  /* Add media query for smaller screens */
  @media (max-width: 768px) {
    .container {
      align-items: flex-start;
      padding: 2em 0.5em;  /* Reduce side padding for smaller screens */
    }

    .blog-post {
      width: 100%;  /* Allow blog post to take full width on smaller screens */
    }
  }
</style>


<!-- <style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .blog-post {
    width: 80%;
    margin-bottom: 2em;
    padding: 1em;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .blog-title {
    margin: 0;
    margin-bottom: 0.5em;
    color: #333;
    font-size: 1.5em;
  }

  .blog-content {
    color: #666;
    line-height: 1.6;
  }
</style> -->