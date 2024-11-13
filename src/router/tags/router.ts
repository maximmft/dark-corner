import { Tag } from "../../entities/Tag";
import { Router } from "express";

const tagRouter = Router();

tagRouter.get("/", async (req,res) => {
    const tags= await Tag.find()
    res.send(tags)
})

tagRouter.post("/", (req, res) => {
    const tag = new Tag();
    tag.name = req.body.name;
    tag.save();
    res.status(201).send;
  });
  
  tagRouter.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await Tag.delete({ id });
    res.status(422);
  });
  

export default tagRouter