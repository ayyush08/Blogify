import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
const app = express()


const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        // Check if the origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    credentials: true
}))


app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.static('public'))
app.use(cookieParser())

//routes import

import userRouter from './routes/user.route.js'
app.use('/blogapi/v1/users', userRouter);
import blogRoutes from './routes/blogs.route.js'
app.use('/blogapi/v1/blogs', blogRoutes);
import likeRoutes from './routes/like.route.js'
app.use('/blogapi/v1/likes', likeRoutes);
import commentRoutes from './routes/comments.route.js'
app.use('/blogapi/v1/comments', commentRoutes);


export { app };