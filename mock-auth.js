module.exports = (req, res, next) => {
  if (req.path === '/api/auth/login' && req.method === 'POST') {
    const { collarNumber } = req.body;
    const users = require('./src/data/database.json').users;
    
    const user = users.find(u => u.collarNumber === collarNumber);
    
    if (user) {
      res.json({
        id: user.id,
        email: user.email,
        collarNumber: user.collarNumber,
        petName: user.petName,
        petType: user.petType,
        token: 'mock-jwt-token-' + Date.now()
      });
    } else {
      res.status(401).json({ error: 'Número da coleira não encontrado' });
    }
    return;
  }
  
  if (req.path.startsWith('/api/pets/') && req.method === 'GET') {
    const collarNumber = req.path.split('/').pop();
    const pets = require('./src/data/database.json').pets;
    
    const pet = pets.find(p => p.collarNumber === collarNumber);
    
    if (pet) {
      res.json({
        id: pet.id,
        collarNumber: pet.collarNumber,
        petName: pet.name,
        petType: pet.type,
        location: pet.location,
        status: pet.status,
        battery: pet.battery
      });
    } else {
      res.status(404).json({ error: 'Pet não encontrado' });
    }
    return;
  }
  
  next();
};
