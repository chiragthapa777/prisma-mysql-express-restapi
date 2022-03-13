const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const users = await user.findMany({
      select: {
        username: true,
        posts: true,
      },
      // where:{
      //filter username="hsdhso"
      // }
    });
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
}
});

router.post("/",async(req,res)=>{
    try {
        const {username}=req.body;
        //check if username exists
        const userExists = await user.findUnique({
            select:{
                username:true
            },
            where:{
                username
            }
        })
        if(userExists) return res.status(400).send("user already exists")
        const newUser= await user.create({
            data:{
                username,
            }
        })
        res.json(newUser)
    } catch (error) {
        
        res.status(500).send(error);
    }
})

module.exports = router;
