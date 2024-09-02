import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware";
import usersModel from "../../models/usersModel";
import bcrypt from 'bcryptjs';

export const createUserValidator: RequestHandler[] = [
    check('name')
        .notEmpty().withMessage('User Name is Required')
        .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50 characters'),
    check('email')
        .notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Invalid Email')
        .custom(async (val: string) => {
        const user = await usersModel.findOne({ email: val });
        if (user) { throw new Error(`Email already exists`) }
        return true;
        }),
    check('password')
        .notEmpty().withMessage('Password required')
        .isLength({ min: 6, max: 20 }).withMessage('Password length must between 6 and 20 char')
        .custom((val: string, { req }) => {
        if (val !== req.body.confirmPassword) { throw new Error("Passwords doesn't match") }
        return true
        }),
    check('confirmPassword')
        .notEmpty().withMessage('Confirm password required')
        .isLength({ min: 6, max: 20 }).withMessage('Confirm password length must between 6 and 20 char'),
    validatorMiddleware
]

export const updateUserValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id'),
    check('name').optional()
        .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50 characters'),
    check('active').optional()
        .isBoolean().withMessage('Invalid Active value'),
    validatorMiddleware
]

export const getUserValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleware
    ]

    export const deleteUserValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleware
]

export const changeUserPasswordValidator: RequestHandler[] = [
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6, max: 20 }).withMessage('Password length must between 6 and 20 char')
        .custom((val: string, { req }) => {
        if (val !== req.body.confirmPassword) { throw new Error("passwords doesn't match") }
        return true
        }),
    check('confirmPassword')
        .notEmpty().withMessage('Confirm password is required')
        .isLength({ min: 6, max: 20 }).withMessage('Confirm password length must between 6 and 20 characters'),
    validatorMiddleware
]

export const updateLoggedUserValidator: RequestHandler[] = [
    check('name').optional()
        .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50 characters'),
    validatorMiddleware
]

export const changeLoggedUserPasswordValidator: RequestHandler[] = [
    check('currentPassword')
        .notEmpty().withMessage('Current password required')
        .isLength({ min: 6, max: 20 }).withMessage('Current password length must between 6 and 20 characters'),
    check('password')
        .notEmpty().withMessage('password required')
        .isLength({ min: 6, max: 20 }).withMessage('Password length must between 6 and 20 characters')
        .custom(async (val: string, { req }) => {
        const user = await usersModel.findById(req.user._id);
        const isCorrectPassword: boolean = await bcrypt.compare(req.body.currentPassword, user!.password)
        if (!isCorrectPassword) { throw new Error('Current password invalid') }
        if (val !== req.body.confirmPassword) { throw new Error("Passwords don't match") }
        return true
        }),
    check('confirmPassword')
        .notEmpty().withMessage('Confirm password required')
        .isLength({ min: 6, max: 20 }).withMessage('Confirm password length must between 6 and 20 char'),
    validatorMiddleware
]