const express = require('express');

import { body } from 'express-validator';

import { register, login, logout } from '../controllers/auth';
import { isGuest } from '../middlewares/guards';

const router = express.Router();

router.post(
    '/register',
    isGuest(),
    [
        body('email')
            .trim()
            .notEmpty()
            .isEmail()
            .isLength({ min: 10 })
            .withMessage('Email is required'),
        body('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 8 characters'),
        body('rePassword')
            .trim()
            .custom((value, { req }) => value == req.body.password)
            .withMessage("Passwords don't match"),
    ],
    register
);

router.post(
    '/login',
    isGuest(),
    [
        body('email').trim().notEmpty().withMessage('Email is required'),
        body('password').trim().notEmpty().withMessage('Password is required'),
    ],
    login
);

router.get('/logout', logout);

export default router;
