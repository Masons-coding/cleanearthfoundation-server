const express = require("express");
const router = express.Router();
const knex = require("../knexConfig.js");


router.post("/register", async (req, res) => {
    const { name, date_of_clean_up, time_of_clean_up, email, city, state, country, long_map_value, lat_map_value } = req.body;

    // Validate form inputs
    if (
        !name ||
        !date_of_clean_up ||
        !time_of_clean_up ||
        !email||
        !city ||
        !state ||
        !country||
        !long_map_value||
        !lat_map_value
    ) {
        return res.status(400).json({
            message: "All fields are required."
        })
    }

        // Form is valid, save user info to Database?
        const newCleanUpIds = await knex("clean_ups")
            .insert({
                name: name,
                date_of_clean_up: date_of_clean_up,
                time_of_clean_up: time_of_clean_up,
                email: email,
                city: city,
                state: state,
                country: country,
                long_map_value: long_map_value,
                lat_map_value: lat_map_value
            });
        
        // Responds with new user (201 Created)
        const newCleanUpId = newCleanUpIds[0];
        res.status(201).json({
            message: "Clean Up Created successfully",
            cleanUpId: newCleanUpId
        })  
    });

router.get("/cleanup", async (req, res) => {
    try {
        const cleanUpData = await knex("clean_ups")
        .select('id','name', 'date_of_clean_up', 'time_of_clean_up', 'city', 'state', 'country', 'long_map_value', 'lat_map_value')
        res.status(200).json(cleanUpData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/cleanup/:id", async (req, res) => {
    try {
        const cleanUpData = await knex("clean_ups").where({ id: req.params.id });
        res.status(200).json(cleanUpData[0]);
      } catch (error) {
        res.status(500).json({ error: error });
      }
});

module.exports = router;