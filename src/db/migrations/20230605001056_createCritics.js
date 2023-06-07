exports.up = function (knex) {
	return knex.schema.createTable("critics", (table) => {
		table.increments("critic_id").primary(); //Primary Key
		table.string("preferred_name"); //First Name
		table.string("surname"); //Last Name
		table.string("organization_name"); // The name of the organization the critic works for.
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("critics");
};
