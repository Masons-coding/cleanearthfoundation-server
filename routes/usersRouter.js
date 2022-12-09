
const express = require("express");
const router = express.Router();
const knex = require("../knexConfig.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const { first_name, last_name, cell_phone, email, password } = req.body;

    // Validate form inputs
    if (
        !first_name ||
        !last_name ||
        !cell_phone ||
        !email ||
        !password
    ) {
        return res.status(400).json({
            message: "All fields are required."
        })
    }
    
    try {
        // TODO: make sure email is unique!
        const users = await knex("users")
            .where({ email: email });
        
        if (users.length !== 0) {
            return res.status(400).json({
                message: "User with that email already exists"
            })
        }

        // Form is valid, save user info to Database?
        const newUserIds = await knex("users")
            .insert({
                first_name: first_name,
                last_name: last_name,
                cell_phone: cell_phone,
                email: email,
                password: bcrypt.hashSync(password, 10) // hash password
            });
        
        // Responds with new user (201 Created)
        const newUserId = newUserIds[0];
        res.status(201).json({
            message: "User created successfully",
            userId: newUserId
        })  
    } catch (error) {
        res.status(500).json({
            message: "Unable to create user",
            error
        })
    }
});

router.post("/login", async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    // Validate user credentials
    const users = await knex("users")
        .where({ email: req.body.email });
    
    if (users.length === 0) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const user = users[0];

    // TODO: use bcrypt again -> bcrypt.compare(req.body.password, user.password)
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        // If invalid: Respond with Invalid Credentials (401)
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }
    
    const token = jwt.sign({ user_id: user.id}, process.env.SECRET_KEY);

    return res.status(200).json({
        message: "User logged in successfully",
        token: token
    })
});

// router.get('/userinfo', async (_req, res) => {
//     const userData = await knex("users");
//     res.status(200).json(userData);
//   });

/* GET current user */
router.get("/current", (req, res) => {
    // req.headers.authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI..."
    if (!req.headers.authorization) {
        return res.status(400).json({
            message: "Bearer token required"
        })
    }

    const bearerTokenArray = req.headers.authorization.split(" ");
    if (bearerTokenArray.length !== 2) {
        return res.status(400).json({
            message: "Bearer token required"
        })
    }

    const token = bearerTokenArray[1];
    // Verify the JWT
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            // if not valid -> send an error response back (401)
            return res.status(401).json({
                message: "Invalid token"
            })
        }

        // - if valid JWT
            // - in JWT payload -> grab the user id
            // - using that user id -> get profile information for that user! (200) 
        const users = await knex("users")
            .where({ id: decoded.user_id });

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const user = users[0];
        delete user.password;
        delete user.id;

        return res.json(user);
    });
});

module.exports = router;