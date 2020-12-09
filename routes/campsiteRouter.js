// const express = require('express');
// const { authenticate } = require('passport');
// const Campsite = require('../models/campsite');
// const user = require('../models/user');

// const campsiteRouter = express.Router();

// campsiteRouter.route('/')//This is your endpoint. localhost:300/dishes, need to go to endpoint to access all your http verbs
// .get((req, res, next) => {
//     Campsite.find()//Mongoose method meaning to find all the documents inside the Campsite collection, A mongoose method will always return a promise, .then() and .catch()
//     .populate('comments.author')
//     .then(campsites => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(campsites);
//     })
//     .catch(err => next(err));
// })
// //first, see if the user to in our database. If user is not in database then go to error handler
// //second, if user is in our database and creditentials are correct, go to authenticate.verifyAdmin
// //authenticate.verifyAdmin will not work if you dont call authenticate.verifyUser first.
// // .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
// //     Campsite.create(req.body)//Mongoose method used to create a document to be put in your database
// //     .then(campsite => {
// //         console.log('Campsite Created ', campsite);
// //         res.statusCode = 200;
// //         res.setHeader('Content-Type', 'application/json');
// //         res.json(campsite);
// //     })
// //     .catch(err => next(err));
// // })
// .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Campsite.create(req.body)
//     .then(campsite => {
//         console.log('Campsite Created ', campsite);
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(campsite);
//     })
//     .catch(err => next(err));
// })
// .put((req, res) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /campsites');
// })
// .delete(authenticate.user, authenticate.verifyAdmin, (req, res, next) => {
//     Campsite.deleteMany()//MOngood methode use to delete more than one docment from the collection
//     .then(response => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(response);
//     })
//     .catch(err => next(err));
// });

// campsiteRouter.route('/:campsiteId')
// .get((req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .populate('comments.author')
//     .then(campsite => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(campsite);
//     })
//     .catch(err => next(err));
// })
// .post((req, res) => {
//     res.statusCode = 403;
//     res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
// })
// .put(authenticate.user, authenticate.verifyAdmin, (req, res, next) => {
//     Campsite.findByIdAndUpdate(req.params.campsiteId, {
//         $set: req.body
//     }, { new: true })
//     .then(campsite => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(campsite);
//     })
//     .catch(err => next(err));
// })
// .delete(authenticate.user, authenticate.verifyAdmin, (req, res, next) => {
//     Campsite.findByIdAndDelete(req.params.campsiteId)
//     .then(response => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(response);
//     })
//     .catch(err => next(err));
// });

// //this is post a comment to the campsite with that specific Id
// campsiteRouter.route('/:campsiteId/comments')//
// .get((req, res, next) => {
//     Campsite.findById(req.params.campsiteId)//Mongoose method to find a specific campsiteId, we are getting user input and we will access the database using that user input
//     .populate('comments.author')
//     .then(campsite => {
//         if (campsite) {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(campsite.comments);
//         } else {
//             err = new Error(`Campsite ${req.params.campsiteId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// })
// .post((req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .then(campsite => {
//         if (campsite) {
//             campsite.comments.push(req.body);
//             campsite.save()
//             .then(campsite => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(campsite);
//             })
//             .catch(err => next(err));
//         } else {
//             err = new Error(`Campsite ${req.params.campsiteId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// })
// .put(authenticate.user, authenticate.verifyAdmin, (req, res) => {
//     res.statusCode = 403;
//     res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}/comments`);
// })
// .delete(authenticate.user, (req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .then(campsite => {
//         if (campsite) {
//             for (let i = (campsite.comments.length-1); i >= 0; i--) {
//                 campsite.comments.id(campsite.comments[i]._id).remove();
//             }
//             campsite.save()
//             .then(campsite => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(campsite);
//             })
//             .catch(err => next(err));
//         } else {
//             err = new Error(`Campsite ${req.params.campsiteId} not found`);
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// });

// campsiteRouter.route('/:campsiteId/comments/:commentId')
// .get((req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .populate('comments.author')
//     .then(campsite => {
//         if (campsite && campsite.comments.id(req.params.commentId)) {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(campsite.comments.id(req.params.commentId));
//         } else if (!campsite) {
//             err = new Error(`Campsite ${req.params.campsiteId} not found`);
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
//     res.end(`POST operation not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commentId}`);
// })
// .put(authenticate.verifyUser, (req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .then(campsite => {
//         if (req.user._id.equals(campsite.comments.id(req.params.commentId).author._id)) {
//             console.log('');
//             if (campsite && campsite.comments.id(req.params.commentId)) {
//                 if (req.body.rating) {
//                     campsite.comments.id(req.params.commentId).rating = req.body.rating;
//                 }
//                 if (req.body.text){
//                     campsite.comments.id(req.params.commentId).text = req.body.text;
//                 }
//                 campsite.save()
//                 .then(campsite => {
//                     res.statusCode = 200;
//                     res.setHeader('Content-Type', 'application/json');
//                     res.json(campsite);
//                 })
//                 .catch(err => next(err));
//             } else {
//                 res.statusCode = 403;
//                 err = new Error('You are unable to change this text.')
//             }
//         } else if (!campsite) {
//             err = new Error('campsite ${req.params.campsiteId} not found');
//             err.status = 404;
//             return next(err);
//         } else {
//             err = new Error('Comment ${req.params.commentId} not found');
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .catch(err => next(err));
// })
// .delete(authenticate.verifyUser, (req, res, next) => {
//     Campsite.findById(req.params.campsiteId)
//     .then(campsite => {
//         if (campsite && campsite.comments.id(req.params.commentId)) {
//             campsite.comments.id(req.params.commentId).remove();
//             campsite.save()
//             .then(campsite => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(campsite);
//             })
//             .catch(err => next(err));
//         } else if (!campsite) {
//             err = new Error(`Campsite ${req.params.campsiteId} not found`);
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

// module.exports = campsiteRouter;

const express = require('express');
const Campsite = require('../models/campsite');
const authenticate = require('../authenticate');
const User = require('../models/user')
const campsiteRouter = express.Router();
​
campsiteRouter.route('/')
.get((req, res, next) => {
    Campsite.find()
    .populate('comments.author')
    .then(campsites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsites);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.create(req.body)
    .then(campsite => {
        console.log('Campsite Created ', campsite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});
​
campsiteRouter.route('/:campsiteId')
.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .populate('comments.author')
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.findByIdAndUpdate(req.params.campsiteId, {
        $set: req.body
    }, { new: true })
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.findByIdAndDelete(req.params.campsiteId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});
​
campsiteRouter.route('/:campsiteId/comments')
.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .populate('comments.author')
    .then(campsite => {
        if (campsite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite.comments);
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite) {
            req.body.author = req.user._id;
            campsite.comments.push(req.body);
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}/comments`);
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite) {
            for (let i = (campsite.comments.length-1); i >= 0; i--) {
                campsite.comments.id(campsite.comments[i]._id).remove();
            }
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});
​
campsiteRouter.route('/:campsiteId/comments/:commentId')
.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .populate('comments.author')
    .then(campsite => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite.comments.id(req.params.commentId));
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commentId}`);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (req.user._id.equals(campsite.comments.id(req.params.commentId).author._id)) {
            console.log('You are the author of this comment!');
            if (campsite && campsite.comments.id(req.params.commentId)) {
                if (req.body.rating){
                    campsite.comments.id(req.params.commentId).rating = req.body.rating;
                }
                if (req.body.text) {
                    campsite.comments.id(req.params.commentId).text = req.body.text;
                }
                campsite.save()
                .then(campsite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(campsite);
                })
                .catch(err => next(err));
            } else if (!campsite) {
                err = new Error(`Campsite ${req.params.campsiteId} not found`);
                err.status = 404;
                return next(err);
            } else {
                err = new Error(`Comment ${req.params.commentId} not found`);
                err.status = 404;
                return next(err);
            }
            err = new Error('You are not the author of this comment!');
            res.statusCode = 403;
            return next(err);
        }
    })
    .catch(err => next(err)); 
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if(req.user._id.equals(campsite.comments.id(req.params.commentId).author._id)){
            console.log('You are the author of this comment and have the right to delete it!')
            if (campsite && campsite.comments.id(req.params.commentId)) {
                campsite.comments.id(req.params.commentId).remove();
                campsite.save()
                .then(campsite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(campsite);
                })
                .catch(err => next(err));
            } else if (!campsite) {
                err = new Error(`Campsite ${req.params.campsiteId} not found`);
                err.status = 404;
                return next(err);
            } else {
                err = new Error(`Comment ${req.params.commentId} not found`);
                err.status = 404;
                return next(err);
            }
            return next(err);
        } else {
            err = new Error('You are not the author of this comment so you cannot delete it!');
            res.statusCode = 403;
            return next(err);
        }
    })
    .catch(err => next(err));
});
​
module.exports = campsiteRouter;



