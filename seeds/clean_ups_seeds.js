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
      date_of_clean_up: "2022-12-30",
      time_of_clean_up: "3:30 P.M.",
      email: "DaveWest@gmail.com",
      city: "Toronto",
      state: "Onatrio",
      country: "Canada",
      long_map_value: -79.41359719253505,
      lat_map_value: 43.64674640965648
    },
    {
      name: "Roland Young",
      date_of_clean_up: "2022-12-23",
      time_of_clean_up: "1:30 P.M.",
      email: "RolandYoung@gmail.com",
      city: "Madrid",
      state: "Spain",
      country: "Spain",
      long_map_value: -3.755553960800171,
      lat_map_value: 40.42532340569747
    },
    {
      name: "Sergio Rodriguez",
      date_of_clean_up: "2022-12-23",
      time_of_clean_up: "10:30 A.M.",
      email: "Sergio@gmail.com",
      city: "Rio de Janeiro",
      state: "Brazil",
      country: "Brazil",
      long_map_value: -43.21644902229309,
      lat_map_value: -22.972270113366204
    },
    {
      name: "Grant Ross",
      date_of_clean_up: "2022-12-31",
      time_of_clean_up: "3:30 P.M.",
      email: "GrantRoss@gmail.com",
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      long_map_value: -115.02859354019165,
      lat_map_value: 36.10144024204773
    },
  ]);
};
