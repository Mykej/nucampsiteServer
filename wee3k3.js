
// Campsite.findById(req.params.campsiteId).then(campsite => {
//     //     if (campsite && campsite.comments.id(req.params.commentId)) {
//     //         if (req.body.rating) {
//     //             campsite.comments.id(req.params.commentId).rating = req.body.rating;
//     //         }
//     //         if (req.body.text) {
//     //             campsite.comments.id(req.params.commentId).text = req.body.text;
//     //         }
//     //         campsite.save()
//     //         .then(campsite => {
//     //             res.statusCode = 200;
//     //             res.setHeader('Content-Type', 'application/json');
//     //             res.json(campsite);
//     //         })
//     //         .catch(err => next(err));
//     //     } else if (!campsite) {
//     //         err = new Error(`Campsite ${req.params.campsiteId} not found`);
//     //         err.status = 404;
//     //         return next(err);
//     //     } else {
//     //         err = new Error(`Comment ${req.params.commentId} not found`);
//     //         err.status = 404;
//     //         return next(err);
//     //     }
//     // })
//     // .catch(err => next(err));