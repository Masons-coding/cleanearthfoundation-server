/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      first_name: "User",
      last_name: "User",
      cell_phone: '+15199556645',
      email: "user@gmail.com",
      password: "Password123"
    },
  ]);
};
