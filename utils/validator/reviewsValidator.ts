import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware";
import reviewsModel from "../../models/reviewsModel";

export const createReviewValidator: RequestHandler[] = [
    check('comment').notEmpty().withMessage('Comment is Required'),
    check('rating').notEmpty().withMessage('rating Required'),
    check('user')
        .notEmpty().withMessage('User is required')
        .isMongoId().withMessage('Invalid Mongo id'),
    check('product')
        .notEmpty().withMessage('Product is required')
        .isMongoId().withMessage('Invalid Mongo Id')
        .custom(async (val, { req }) => {
        const review = await reviewsModel.findOne({ user: req.user._id, product: val });
        if (review) { throw new Error('You already created a review before') }
        return true;
        }),
    validatorMiddleware
]

export const updateReviewValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id')
        .custom(async (val, { req }) => {
        const review = await reviewsModel.findById(val);
        if (!review) { throw new Error('Review not found') }
        if (review.user._id!.toString() !== req.user._id.toString()) {
            throw new Error('You are not allowed to perform this action')
        }
        return true;
        }),
    validatorMiddleware
]

export const getReviewValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleware
]

export const deleteReviewValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id')
        .custom(async (val, { req }) => {
        if (req.user.role === 'user') {
            const review = await reviewsModel.findById(val);
            if (!review) { throw new Error('Review not found') }
            if (review.user._id!.toString() !== req.user._id.toString()) {
            throw new Error('You are not allowed to perform this action')
            }
        }
        return true;
        }),
    validatorMiddleware
]