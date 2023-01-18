const express = require("express");
const router = express.Router();
const knex = require("../knexConfig.js");


router.post("/register", async (req, res) => {
    const { name, date_of_clean_up, time_of_clean_up, email, city, state, country, long_map_value, lat_map_value, user_id } = req.body;

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
        !lat_map_value||
        !user_id
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
                lat_map_value: lat_map_value,
                user_id: user_id
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
        .select('id','name', 'date_of_clean_up', 'time_of_clean_up', 'city', 'state', 'country', 'long_map_value', 'lat_map_value', 'user_id')
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

router.get("/cleanupbyuser/:user_id", async (req, res) => {
    try {
        const cleanUpData = await knex("clean_ups").where({ user_id: req.params.user_id });
        res.status(200).json(cleanUpData);
      } catch (error) {
        res.status(500).json({ error: error });
      }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        const foundCleanUp = await knex("clean_ups").where({
          id: req.params.id,
        });
        if (!foundCleanUp.length) {
          return res.status(404).json({ message: "Clean up doesn't exist!" });
        }
    
        await knex('clean_ups').where({
            id: foundCleanUp[0].id
        }).del();
        res.sendStatus(204);
    
      } catch(error){
        console.log(error)
        res.status(500).json({ error: error });
      }
  });

router.put("/edit/:id", async (req, res) => {
    try {
        const cleanUpData = await knex("clean_ups")
        .where({ id: req.params.id })
        .update({
          name: req.body.name,
          email: req.body.email, 
          date_of_clean_up: req.body.date_of_clean_up, 
          time_of_clean_up: req.body.time_of_clean_up, 
          city: req.body.city, 
          state: req.body.state,
          country: req.body.country,
          lat_map_value: req.body.lat_map_value,
          long_map_value: req.body.long_map_value,

    })
    
        res.status(200).json(cleanUpData);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
      }
})

module.exports = router;
