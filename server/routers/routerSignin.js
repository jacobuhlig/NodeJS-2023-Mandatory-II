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
      return res.status(400).json("Invalid email or password.");
    }

    // Authenticate the user
    req.session.user = {
        email: user.email
    };

    res.json("Logged in successfully.");
});



// Sign Out route
router.get("/auth/signout", (req, res) => {
    if (req.session.user) {
        req.session.destroy(function(err) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.send("Logged out successfully.");
        });
    } else {
        res.send("No user is currently logged in.");
    }
});

export default router;