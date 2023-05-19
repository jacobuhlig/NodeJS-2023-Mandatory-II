import { Router } from "express";
const router = Router();

import bcrypt from "bcrypt";
import getDb from "../database/connection.js"




// Sign In route
router.post("/auth/signin", async (req, res) => {
    const db = await getDb();
    const { email, password } = req.body;

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    // Check if email and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("Invalid email or password.");
    }

    // Authenticate the user
    req.session.user = { email: email };

    res.status(200).send({message: "Logged in successfully!", email: email});
});



// Sign Out route
router.get("/auth/signout", (req, res) => {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.json({message: "Logged out successfully."});
        });
    } else {
        res.json("No user is currently logged in.");
    }
});

export default router;