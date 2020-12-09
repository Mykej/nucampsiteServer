// const express = require('express');
// const Promotion = require('../models/promotion');

// const promotionRouter = express.Router();

// promotionRouter.route('/')//This is your endpoint. localhost:300/dishes, need to go to endpoint to access all your http verbs
// .get((req, res, next) => {
//     Promotion.find()//Mongoose method meaning to find all the documents inside the Promotion collection, A mongoose method will always return a promise, .then() and .catch()
//     .then(promotions => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(promotions);
//     })
//     .catch(err => next(err));
// })
// .post((req, res, next) => {
//     Promotion.create(req.body)//Mongoose method used to create a document to be put in your database
//     .then(promotion => {
//         console.log('Promotion Created ', promotion);
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(promotion);
//     })
//     .catch(err => next(err));
// })
// .put((req, res) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /promotions');
// })
// .delete((req, res, next) => {
//     Promotion.deleteMany()//MOngood methode use to delete more than one docment from the collection
//     .then(response => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(response);
//     })
//     .catch(err => next(err));
// });

// promotionRouter.route('/:promotionId')
// .get((req, res, next) => {
//     Promotion.findById(req.params.promotionId)//Mongoose method to find a specific promotionId, we are getting user input and we will access the database using that user input
//     .then(promotion => {
//         if (promotion) {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(promotion.comments);
//         } else {
//             err = new Error(`Promotion ${req.params.promotionId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// })
// .post((req, res, next) => {
//     Promotion.findById(req.params.promotionId)
//     .then(promotion => {
//         if (promotion) {
//             promotion.comments.push(req.body);
//             promotion.save()
//             .then(promotion => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(promotion);
//             })
//             .catch(err => next(err));
//         } else {
//             err = new Error(`Promotion ${req.params.promotionId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// })
// .put((req, res) => {
//     res.statusCode = 403;
//     res.end(`PUT operation not supported on /promotions/${req.params.promotionId}/comments`);
// })
// .delete((req, res, next) => {
//     Promotion.findById(req.params.promotionId)
//     .then(promotion => {
//         if (promotion) {
//             for (let i = (promotion.comments.length-1); i >= 0; i--) {
//                 promotion.comments.id(promotion.comments[i]._id).remove();
//             }
//             promotion.save()
//             .then(promotion => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(promotion);
//             })
//             .catch(err => next(err));
//         } else {
//             err = new Error(`Promotion ${req.params.promotionId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// });

// promotionRouter.route('/:promotionId/comments/:commentId')
// .get((req, res, next) => {
//     Promotion.findById(req.params.promotionId)
//     .then(promotion => {
//         if (promotion && promotion.comments.id(req.params.commentId)) {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(promotion.comments.id(req.params.commentId));
//         } else if (!promotion) {
//             err = new Error(`promotion ${req.params.promotionId} not found`);
//             err.status = 404;
//             return next(err);
//         } else {
//             err = new Error(`Comment ${req.params.commentId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// })
// .post((req, res) => {
//     res.statusCode = 403;
//     res.end(`POST operation not supported on /promotions/${req.params.promotionId}/comments/${req.params.commentId}`);
// })
// .put((req, res, next) => {
//     promotion.findById(req.params.promotionId)
//     .then(promotion => {
//         if (promotion && promotion.comments.id(req.params.commentId)) {
//             if (req.body.rating) {
//                 promotion.comments.id(req.params.commentId).rating = req.body.rating;
//             }
//             if (req.body.text) {
//                 promotion.comments.id(req.params.commentId).text = req.body.text;
//             }
//             promotion.save()
//             .then(promotion => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(promotion);
//             })
//             .catch(err => next(err));
//         } else if (!promotion) {
//             err = new Error(`promotion ${req.params.promotionId} not found`);
//             err.status = 404;
//             return next(err);
//         } else {
//             err = new Error(`Comment ${req.params.commentId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// })
// .delete((req, res, next) => {
//     promotion.findById(req.params.promotionId)
//     .then(promotion => {
//         if (promotion && promotion.comments.id(req.params.commentId)) {
//             promotion.comments.id(req.params.commentId).remove();
//             promotion.save()
//             .then(promotion => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(promotion);
//             })
//             .catch(err => next(err));
//         } else if (!promotion) {
//             err = new Error(`promotion ${req.params.promotionId} not found`);
//             err.status = 404;
//             return next(err);
//         } else {
//             err = new Error(`Comment ${req.params.commentId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// });

const express = require('express');
const Promotion = require('../models/promotions');

const promotionRouter = express.Router();

promotionRouter.route('/')
.get((req, res, next) => {
    Promotion.find()
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.create(req.body)
    .then(promotion => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

promotionRouter.route('/promotions/:promotionId')
.get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = promotionRouter;