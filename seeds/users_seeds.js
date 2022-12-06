/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      first_name: "Mason",
      last_name: "Clarke",
      cell_phone: '519-955-7763',
      email: "Maclarkegdci@gmail.com",
      password: "bailey66"
    },
  ]);
};
