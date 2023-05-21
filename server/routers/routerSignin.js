import bcrypt from "bcrypt";
import getDb from "../database/connection.js"
import { sendResetPassword } from "../util/nodemailer/nodemailer.js";
import { Router } from "express";
const router = Router();



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



// Reset Password route
router.post("/auth/reset", async (req, res) => {
    const db = await getDb();
    const { email } = req.body;

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    // Check if user exists
    if (!user) {
      return res.status(400).send("User doesn't exist.");
    }

    // Send reset password email
    const response = await sendResetPassword(email);
    console.log(response);

    if (!response.ok) {
        return res.status(500).send({message: "Failed to send reset password email."});
    }
    else {
        return res.status(200).send({message: "Password reset email sent successfully."});
    }
});



export default router;