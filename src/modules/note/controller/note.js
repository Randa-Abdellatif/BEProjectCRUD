import {connection} from '../../../../index.js'

export const getNoteModule = (req,res,next)=>{
    return res.json({message:"Note Module"})
}
//   -Notes APIs-
// 1- add note
export const addNote = (req, res, next)=>{
    const{ title, content, userID } = req.body;
    const query = `SELECT * FROM users WHERE id='${userID}'`;
    connection.execute(query,(err, result, fields)=>{
        if(err){
            console.log("err")
            return res.json({message:"Query error", err})
        }
        if(!result.length){
            return res.json({message:"Invalid Id",result})
        }
        const query = `INSERT INTO notes (title, content, userID)
                                   VALUES('${title}' , '${content}' ,'${userID}')`
        connection.execute(query,(err, result, fields)=>{
            if(err){ return res.json({message:"Query error", err})}
            return res.json({message:"Done",id: result.insertId, title, content, userID });
        })
    })

}

//2- delete note (note creator only )
export const deleteNote = (req, res, next)=>{
    const {noteId,userId} = req.params;
  
    const query = `DELETE FROM notes WHERE id = ${noteId} AND userID = ${userId}`;
    connection.execute(query,(err, result, fields)=>{
      if(err){
        return res.json({message: "Query error", err})
      }
      return result.affectedRows ? res.json({message:"Done",delete:`note with id ${noteId} deleted`})
             : res.json({message:"Note not found or unauthorized"})
    })
  }
 //3- update note (note owner only)
 export const updateNote = (req, res, next)=>{
    const {id,userId} = req.params;
    const{title, content} = req.body;
    const query =`UPDATE notes SET title = '${title}', content ='${content}' WHERE id =${id}  AND userID = ${userId}`;
    connection.execute(query,(err, result, fields)=>{
        if(err){
            return res.json({message: "Query error", err})
        }
        return result.affectedRows ? res.json({ id:id, title, content, userID: userId })
                                   : res.json({message:'Note not found or unauthorized'})
    })

}

//4- get all notes
export const getAllNotes = (req, res, next) => {
    const query = `SELECT * FROM notes`;
    connection.execute(query, (err, result, fields) => {
      if (err) {
        return res.json({ message: "Query error", err });
      }
      return res.json({ message: "Done", result });
    });
  }

  //5- get all notes with their owners informaion (using include)
export const getAllNotesWithOwner = (req, res) => {
    //n.id as noteId, n.title as titleNote ,n.content as contentNote,
    const sql = `SELECT n.id as noteId, n.title ,n.content,n.userID,
     u.name as userName, u.email, u.age
     FROM notes as n INNER JOIN users as u ON n.userID = u.id`;
    connection.execute(sql, (err, result) => {
      if (err) {
        return res.json({message:"Query error",err});
      }
      res.json({message:"Done",result});
    });
  }

  // Get all notes with their owners' information
  export const getAllNotesWithOwner1= function(req, res) {
    const {token} = req.params;
    var sql = `SELECT notes.* FROM notes INNER JOIN users ON notes.userID = users.id where notes.userID = ${token}`;
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json(results);
    });
  }

// module.exports = getNoteModule 