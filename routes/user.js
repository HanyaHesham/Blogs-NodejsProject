const express = require('express');
const { create, login, getAll, getById, editById, deleteById, pushfollowID,pullfollowID} = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

//register new user
router.post('/', async (req, res, next)=>{
    const { body } = req;
    try{
        const user = await create(body);
        res.json(user);
    }catch (e){
        next(e);
    }
});

//user login
router.post('/login', async (req, res, next) => {
    const { body } = req;
    try {
      const user = await login(body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });

  //get all users
router.get('/', async (req, res, next) => {
    try {
      const users = await getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  });

  //get one user
  router.get('/:id', async (req, res, next)=>{
    const { params: { id } } = req;
    try{
        const user = await getById(id);
        res.json(user)
    } catch(e){
        next (e); //sending error handler
    }
});

//edit user
router.patch('/',authMiddleware ,async (req, res, next) => {
  const { params: { id }, body } = req;
  try {
    const user = await editById(id, body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//delete user
  router.delete('/', authMiddleware, async (req, res, next)=>{
    const { params: { id } } = req;
    try{
        const user = await deleteById(id);
        res.json(user)
    } catch(e){
        next (e); //sending error handler
    }
});

//follow user
router.post('/follow/:fid',authMiddleware ,async(req, res, next)=>{
  const {user: { id }, params:{ fid }} = req;
  try{
    const userFollowID = await pushfollowID(id, fid);
    res.json(userFollowID);
  }catch (e){
    next(e);
  }
});

//unfollow user
router.post('/unfollow/:fid',authMiddleware ,async(req, res, next)=>{
  const {user: { id }, params:{ fid }} = req;
  try{
    const userFollowID = await pullfollowID(id, fid);
    res.json(userFollowID);
  }catch (e){
    next(e);
  }
});

module.exports = router;