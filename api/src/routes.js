const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

// Private routes
const auth = require('./helpers/AuthRoutes')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.post('/sessions', SessionController.store)

routes.get('/spots', auth, SpotController.index)
routes.post('/spots', auth, upload.single('thumbnail'), SpotController.store)

routes.get('/dashboard', auth, DashboardController.show)

routes.post('/spots/:spot_id/bookings', auth, BookingController.store)

routes.post('/bookings/:booking_id/approvals', auth, ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', auth, RejectionController.store)

module.exports = routes