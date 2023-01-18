/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('clean_ups').del()
  await knex('clean_ups').insert([
    {
      name: "Dave West",
      date_of_clean_up: "2023-2-25",
      time_of_clean_up: "3:30 P.M.",
      email: "DaveWest@gmail.com",
      city: "Toronto",
      state: "Onatrio",
      country: "Canada",
      long_map_value: -79.41359719253505,
      lat_map_value: 43.64674640965648,
      user_id: 1
    },
    {
      name: "Roland Young",
      date_of_clean_up: "2023-6-15",
      time_of_clean_up: "1:30 P.M.",
      email: "RolandYoung@gmail.com",
      city: "Madrid",
      state: "Spain",
      country: "Spain",
      long_map_value: -3.755553960800171,
      lat_map_value: 40.42532340569747,
      user_id: 1
    },
    {
      name: "Sergio Rodriguez",
      date_of_clean_up: "2023-12-23",
      time_of_clean_up: "10:30 A.M.",
      email: "Sergio@gmail.com",
      city: "Rio de Janeiro",
      state: "Brazil",
      country: "Brazil",
      long_map_value: -43.21644902229309,
      lat_map_value: -22.972270113366204,
      user_id: 1
    },
    {
      name: "Grant Ross",
      date_of_clean_up: "2023-8-20",
      time_of_clean_up: "3:30 P.M.",
      email: "GrantRoss@gmail.com",
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      long_map_value: -115.02859354019165,
      lat_map_value: 36.10144024204773,
      user_id: 1
    },
  ]);
};
