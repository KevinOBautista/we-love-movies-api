const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");
const methodNotAllowed = require("../errors/methodNotAllowed");
// router
// 	.route("/:movieId/theaters")
// 	.get(controller.readTheaters)
// 	.all(methodNotAllowed);

// router
// 	.route("/:movieId/reviews")
// 	.get(controller.readReviews)
// 	.all(methodNotAllowed);
router.use("/:movieId/theaters", controller.movieExists, theatersRouter);

router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);
module.exports = router;
