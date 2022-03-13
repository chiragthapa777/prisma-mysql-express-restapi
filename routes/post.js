const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const { post, user } = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { title, content, user_id } = req.body;
    //checking if user exists
    const userExists = await user.findUnique({
      where: {
        id: user_id,
      },
    });
    if (!userExists)
      return res.status(400).json({ error: "user doesnot exists" });
    const newPost = await post.create({
      data: {
        title,
        post: content,
        user_id,
      },
    });
    res.json(newPost);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    //checking if user exists
    const userExists = await user.findUnique({
      where: {
        id: parseInt(user_id),
      },
    });
    if (!userExists)
      return res.status(400).json({ error: "user doesnot exists" });
    const posts = await post.findMany({
      where: {
        user_id: parseInt(user_id),
      },
      //is all dont user select clause
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error);
}
});

router.put("/:post_id",async(req,res)=>{
    try {
        const {post_id}=req.params
        const {title, content}=req.body
        //check if post exists
        let newPost= await post.findUnique({
            where:{
                id:parseInt(post_id)
            }
        })
        if(!newPost) return res.status(400).send("post doesnot exits")
        newPost= await post.update({
            where:{
                id:parseInt(post_id)
            },
            data: {
                title,
                post:content,
                updated_at: new Date()
            },
        })
        res.send(newPost)
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
        
    }
})
router.delete("/:post_id",async(req,res)=>{
    try {
        const {post_id}=req.params
        //check if post exists
        let newPost= await post.findUnique({
            where:{
                id:parseInt(post_id)
            }
        })
        if(!newPost) return res.status(400).send("post doesnot exits")
        newPost= await post.delete({
            where:{
                id:parseInt(post_id)
            }
        })
        res.send(newPost)
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
        
    }
})

module.exports = router;
