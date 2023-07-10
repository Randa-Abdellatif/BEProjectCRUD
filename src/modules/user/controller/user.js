import {connection} from '../../../../index.js'
// import {connection} from "../../../../databases/dbConnection.js"

const getUserModule = (req,res)=> res.send("ES6");

// -user APIs-
// 1- sign up
const signup = (req, res, next)=>{
    const{name , email , password ,age} = req.body;
    const query = `SELECT * FROM users WHERE email='${email}'`;
    connection.execute(query,(err, result, fields)=>{
        if(err){
            return res.json({message:"Query error", err})
        }
        if(result.length){
            return res.json({message:"Email Exist"})
        }
        const query = `INSERT INTO users (name , email , password ,age)
                                   VALUES('${name}' , '${email}' , '${password}' ,'${age}')`
        connection.execute(query,(err, result, fields)=>{
            if(err){ return res.json({message:"Query error", err})}
            return res.json({message:"Done", result})
        })
    })

}

//2- sign in 
const signIn = (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    connection.execute(sql, (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        return res.json({ error: 'Invalid email or password' });
      } else {
        const { id, name, email, age } = results[0];
        return res.json({message:"success",user: {id, name, email, age} });
      }
    });
  }

  //3- update user 
  const updateUser = (req, res, next)=>{
    const {id} = req.params;
    const{name , email , password ,age} = req.body;
    // console.log({name , email , password ,age});
    const query =`UPDATE users SET name = '${name}', email = '${email}', password ='${password}', age = ${age} WHERE id = ${id}`;
    connection.execute(query,(err, result, fields)=>{
        if(err){
            return res.json({message: "Query error", err})
        }
        return result.affectedRows ? res.json({message:"Done"})
                                   : res.json({message:"In-valid Id"})
    })

}

//4- delete user
const deleteUser = (req, res, next)=>{
    const {id} = req.params;
  
    const query = `DELETE FROM users WHERE id=${id}`;
    connection.execute(query,(err, result, fields)=>{
      if(err){
        return res.json({message: "Query error", err})
      }
      return result.affectedRows ? res.json({message: "Done"})
             : res.json({message:"In-valid Id"})
    })
  } 

  //5- search for user where his name start with "a" and age less than 30 => using like for characters
  const searchUser = (req, res, next)=>{
    const {name,age} = req.query;
  
    const query = `SELECT * FROM users WHERE name like '${name}%' AND age < ${age}`;
    connection.execute(query,(err, result, fields)=>{
      if(err){
        return res.json({message: "Query error", err})
      }
      return res.json({message: "Done", result})
  
    })
  }

//6- search for user where his age is between 20 and 30 
const searchAge = (req, res) => {
    const {age1,age2} = req.query;
    const sql = `SELECT * FROM users WHERE age BETWEEN ${age1} AND ${age2}`;
    connection.execute(sql, (err, results) => {
      if (err) throw err;
      return res.json(results);
    });
  }

  //7 - get the 3 oldest users(اكبر ٣ مستخدمين فى العمر)
  const oldestUser =  (req, res) => {
    const {num} = req.query;
    const sql = `SELECT * FROM users ORDER BY age DESC LIMIT ${num}`;
    connection.execute(sql, (err, results) => {
      if (err) throw err;
      return res.json(results);
    });
  }

//8- search for users by list of ids => using IN 
const listUser = (req, res, next)=>{
    const {ids} = req.query;
  
    const query = `SELECT * FROM users WHERE id IN (${ids})`;
    connection.execute(query,(err, result, fields)=>{
      if(err){
        return res.json({message: "Query error", err})
      }
      return res.json({message: "Done", result})
  
    })
  }

    //9- get all user 
const getAllUsers = (req, res, next) => {
    const query = `SELECT * FROM users`;
    connection.execute(query, (err, result, fields) => {
      if (err) {
        return res.json({ message: "Query error", err });
      }
      return res.json({ message: "Done", result });
    });
  }


export {
    getUserModule,
    signup,
    signIn,
    updateUser,
    deleteUser,
    searchUser,
    searchAge,
    oldestUser,
    listUser,
    getAllUsers
}

// module.exports = {
//     getUserModule, 
//     signup
// }

