/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('clean_ups').del()
  await knex('clean_ups').insert([
    {
      name: "Mason Clarke",
      date_of_clean_up: '2022-12-14',
      email: "Maclarkegdci@gmail.com",
      city: "Goderich",
      state: "Ontario",
      country: "Canada",
      long_map_value: -80,
      lat_map_value: 44
    },
  ]);
};
