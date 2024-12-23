const express=require('express')
const router=express.Router()
const controller=require('./controller')
router.use(express.json())

router.post('/signup',controller.signup)
router.post('/signin',controller.logIn)


//Person

router.post("/persons", controller.createPerson);
router.get("/persons/get", controller.getPersons);
router.put("/persons/edit", controller.editPerson);
router.delete("/persons/delete", controller.deletePerson);
module.exports=router