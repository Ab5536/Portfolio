const express=require('express')
const router=express.Router()
const controller=require('./controller')
router.use(express.json())

router.post('/signup',controller.signup)
router.post('/signin',controller.logIn)

module.exports=router