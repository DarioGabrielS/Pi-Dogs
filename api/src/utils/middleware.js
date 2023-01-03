

const validateDog = (req, res, next) => {
    const { name, weight, height, temperament, life_span, image } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    if (!/^[A-Za-z\s]*$/.test(name)) return res.status(400).json({error: 'Name not valid'})
    // if(!/^\d{2}-?(\d{2})?$/.test(weight)) return res.status(400).json({error: 'Wrong data structure'}) 
    // if(!/^\d{2}-?(\d{2})?$/.test(height)) return res.status(400).json({error: 'Wrong data structure'}) 
    // if(!/^\d{2}-?(\d{2})?\s[A-Za-z]*$/.test(life_span)) return res.status(400).json({error: 'Wrong data structure'}) 
    // if(temperament.lenght < 1) return res.status(400).json({error:'Must have at least one Temperament'})    
    
    next();
  };
  
  module.exports = {
    validateDog,
  };