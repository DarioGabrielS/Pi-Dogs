
const {Router} = require ('express')
const { getBreeds, getDetails, createDog } = require('../controllers/breedControllers')


const router = Router()

router.get('/', async(req,res)=>{

    const {name} = req.query

    const data = await getBreeds()
   
    try {
        if(name){
            const queryDogs = data.filter( el =>{
               return el.name.toLowerCase().includes(name.toLowerCase())
            })
            res.status(200).send(queryDogs)
        }else{
            res.status(200).send(data)
        }
        
    } catch (error) {

        res.status(400).send(error)
        
    }

})

router.get('/:id', async (req,res)=>{

    const {id} = req.params
    try {
        const details = await getDetails(id)
        
        res.status(200).send(details)
        
    } catch (error) {

        res.status(400).send(error)
        
    }

})

router.post('/create', async (req,res)=>{

    try {
        const created = await createDog(req.body)

        res.send(created)
        
    } catch (error) {

        res.status(400).send(error.errors[0].message)
    }
})

module.exports= router
