import * as noteController from './controller/note.js';
// import {getNoteModule} from './controller/note');


import {Router} from 'express';
const router = Router();

router.get("/note",noteController.getNoteModule)
//   -Notes APIs-
// 1- add note
router.post("/",noteController.addNote)

//2- delete note (note creator only )
router.delete("/:noteId/:userId", noteController.deleteNote)

  //3- update note (note owner only)
  router.put("/:id/:userId", noteController.updateNote)

//4- get all notes
router.get("/", noteController.getAllNotes);

/*
  router.get("/notes/:id", (req, res, next) => {
    const{id}= req.params;
    const query = `SELECT * FROM notes where id = ${id}`;
    connection.execute(query, (err, result, fields) => {
      if (err) {
        return res.json({ message: "Query error", err });
      }
      return res.json({ message: "Done", result });
    });
  });*/


//5- get all notes with their owners informaion (using include)
router.get('/owners', noteController.getAllNotesWithOwner);

  // Get all notes with their owners' information
  router.get('/owner/notes/:token', noteController.getAllNotesWithOwner1);


export default router