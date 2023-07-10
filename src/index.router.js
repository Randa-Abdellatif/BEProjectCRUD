import userRouter from "./modules/user/user.router.js"
import noteRouter from "./modules/note/note.router.js"

const bootstap = (app, express)=>{
app.use(express.json())

app.use('/user',userRouter) 
app.use('/notes',noteRouter)

app.use("*", (req,res,next)=>{
    return res.json({message:"In-valid routing"})
})
}

// module.exports = bootstap
export default bootstap