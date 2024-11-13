import { Category } from "../../entities/Category";
import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get("/", async (req, res) => {
  try {
    const categoryName = req.query.name;
    let whereClause = {};
    if (categoryName) {
      whereClause = {
        name: categoryName,
      };
    }
    const categories = await Category.find({
      where: whereClause,
    });

    if (categories.length === 0) {
      return res.status(404).send({ message: "Aucune catégorie trouvée." });
    }

    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: "Erreur lors de la récupération des catégories." });
  }
});


categoryRouter.post("/", (req, res) => {
  const category = new Category();
  category.name = req.body.name;
  category.save();
  res.status(201).send;
});

categoryRouter.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await Category.delete({ id });
  res.status(422);
});

export default categoryRouter;
