
const {Router} = require ('express')
const { getBreeds, getDetails } = require('../controllers/breedControllers')


const router = Router()

router.get('/', async(req,res)=>{

    const {name} = req.query

    const data = await getBreeds()
    // console.log(data)
    // console.log(name)
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
 console.log(req.params)

 const details = await getDetails(id)
res.status(200).send(details)

})

module.exports= router
