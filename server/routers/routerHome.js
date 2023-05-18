import { Router } from "express";
const router = Router();

// authorization
router.get("/auth/home", (req, res) => {
    res.status(200).send({ message: `Viewing this page, means that you're logged in` });
});

export default router;