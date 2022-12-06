const {Router} = require ('express')
const {apiInfo} =require('../controllers/tempController')
const { Temperamento } = require('../db')
const router = Router()

router.get('/', async (req,res)=>{
    const data = await apiInfo()
    try {

        res.status(200).send(data)

    } catch (error) {
        res.status(400).send(error)
}
})


module.exports= router