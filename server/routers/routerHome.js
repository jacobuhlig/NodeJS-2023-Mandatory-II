import { Router } from "express";

import getDb from "../database/connection.js"
import { authorizationGuard } from "./middlewares.js";
const router = Router();

router.get('/api/home/content', authorizationGuard, async (req, res) => {
    const db = await getDb();
    try {
        const blogs = await db.all("SELECT * FROM blog_posts");
        res.status(200).json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch blog posts" });
    }
});

export default router;