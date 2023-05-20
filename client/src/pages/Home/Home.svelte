<script>
    "use strict";
    import { navigate } from "svelte-navigator";
    import { get } from "svelte/store";
    import { BASE_URL } from "../../stores/urls.js";
    import { user } from "../../stores/user.js";
    import { onMount } from "svelte";

    let blogs = [];

    async function fetchBlogs() {
        
        const baseUrl = get(BASE_URL); 
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
    <h1>Blog Posts</h1>
    {#if blogs.length}
        {#each blogs as blog (blog.id)}
            <h2 class="blog-title">{blog.title}</h2>  <!-- Blog title moved outside the blog-post div -->
            <div class="blog-post">
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
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    padding: 2em 1em;
    color: #f4f4f4;
  }

  h1 {
    margin: 2em 0 1.2em 0; 
    color: #cdd1d4;
  }

  .blog-post {
    width: 100%;
    margin-bottom: 2em;
    padding: 1em;
    border-radius: 10px;  
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);  
    background-color: #3b3b3b;
  }

  .blog-title {
    margin: 0 0 1em 0;
    color: #dadada;
    font-size: 2em;
  }

  .blog-content {
    color: #d3d3d3;
    line-height: 1.6;
    white-space: pre-line; 
  }

  @media (max-width: 768px) {
    .container {
      align-items: flex-start;
      padding: 2em 0.5em;  
    }

    .blog-post {
      width: 100%;  
    }
  }
</style>
