const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
	critic_id: "critic.critic_id",
	preferred_name: "critic.preferred_name",
	surname: "critic_id.surname",
	organization_name: "critic.organization_name",
	created_at: ["critics", null, "created_at"],
	updated_at: ["critics", null, "updated_at"],
});

function list() {
	return knex("movies").select(
		"movie_id as id",
		"title",
		"runtime_in_minutes",
		"rating",
		"description",
		"image_url"
	);
}

function listWithQuery() {
	return knex("movies as m")
		.join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
		.select(
			"m.movie_id",
			"m.title",
			"m.runtime_in_minutes",
			"m.rating",
			"m.description",
			"m.image_url"
		)
		.where({ "mt.is_showing": true })
		.groupBy("m.movie_id")
		.orderBy("m.movie_id");
}

function read(movieId) {
	return knex("movies").select("*").where({ movie_id: movieId }).first();
}
//return all the `theaters` where the movie is playing.
function readTheaters(movieId) {
	return knex("movies_theaters as mt")
		.join("theaters as t", "t.theater_id", "mt.theater_id")
		.select("t.*", "mt.*")
		.where({ "mt.movie_id": movieId });
}

function readReviews(movieId) {
	return knex("reviews as r")
		.join("critics as c", "r.critic_id", "c.critic_id")
		.select("r.*", "c.*")
		.where({ "r.movie_id": movieId })
		.first()
		.then(addCritic);
}

module.exports = {
	list,
	listWithQuery,
	read,
	readTheaters,
	readReviews,
};
