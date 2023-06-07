const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
	const { movieId } = req.params;
	let movie = await service.read(movieId);
	if (movie) {
		res.locals.movie = movie;
		return next();
	}
	return next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res) {
	if (req.query.is_showing) {
		const data = await service.listWithQuery();
		res.json({ data: data });
	} else {
		const data = await service.list();
		res.json({ data: data });
	}
}

async function read(req, res) {
	res.json({ data: res.locals.movie });
}

async function readReviews(req, res, next) {
	const data = await service.readReviews(res.locals.movie.movie_id);
	res.json({ data: data });
}

async function readTheaters(req, res, next) {
	const data = await service.readTheaters(res.locals.movie.movie_id);
	res.json({ data });
}
module.exports = {
	list: asyncErrorBoundary(list),
	read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
	movieExists: [asyncErrorBoundary(movieExists)],
	readReviews: [
		asyncErrorBoundary(movieExists),
		asyncErrorBoundary(readReviews),
	],
	readTheaters: [
		asyncErrorBoundary(movieExists),
		asyncErrorBoundary(readTheaters),
	],
};
