import { Router } from 'express';
const router = Router();
// import {getUserModule,signup} from'./controller/user.js';
import  * as userController from'./controller/user.js';


router.get('/', userController.getUserModule)
// -user APIs-
// 1- sign up
router.post("/signup",userController.signup)

//2- sign in 
router.post('/login', userController.signIn);

//3- update user 
router.put("/:id", userController.updateUser)

//4- delete user
router.delete("/:id", userController.deleteUser)

//5- search for user where his name start with "a" and age less than 30 => using like for characters
router.get("/search", userController.searchUser)

  
  //6- search for user where his age is between 20 and 30 
  router.get('/age', userController.searchAge);

//7 - get the 3 oldest users(اكبر ٣ مستخدمين فى العمر)
router.get('/oldest',userController.oldestUser);
  

  //8- search for users by list of ids => using IN 
  router.get("/searchId", userController.listUser)

  //9- get all user 
  router.get("/users", userController.getAllUsers);

  // module.exports = router;
  export default router