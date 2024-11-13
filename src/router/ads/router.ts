import { Ad } from "../../entities/Ad";
import { Category } from "../../entities/Category";
import { validate } from "class-validator";
import { Router } from "express";
import { Tag } from "../../entities/Tag";
import { In, Like } from "typeorm";

const adsRouter = Router();

adsRouter.get("/", async (req, res) => {
  const categoryName = req.query.category;
  const needle = req.query.needle
  let whereClause = {};

  try {
    if (categoryName) {
      whereClause = {
        category: { name: categoryName },
      };
    }
    if (needle) {
      whereClause = { title: Like(`%${needle}%`)
      }
    }
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
      where: whereClause,
    });
    if (ads.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune annonce trouvée pour cette catégorie." });
    }
    res.status(200).send(ads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des annonces", error });
  }
});

adsRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const ad = await Ad.findOne({
    where: { id },
    relations: {
      category: true,
      tags: true,
    },
  });
  res.send(ad);
});

adsRouter.post("/", async (req, res) => {
  const {
    title,
    description,
    owner,
    price,
    picture,
    location,
    createdAt,
    categoryId,
    tags,
  } = req.body;
  console.log("req.body1", req.body);

  try {
    const ad = new Ad();
    const category = await Category.findOneBy({ id: categoryId });

    if (category) ad.category = category;

    // Assurez-vous que `tags` est un tableau
    const tagIds = JSON.parse(tags);

    const tagsEntities = await Tag.find({
      where: { id: In(tagIds) },
    });

    if (tagsEntities.length) ad.tags = tagsEntities;

    ad.title = title;
    ad.description = description;
    ad.owner = owner;
    ad.price = price;
    ad.picture = picture;
    ad.location = location;
    ad.createdAt = createdAt;

    const errors = await validate(ad);
    if (errors.length > 0) {
      return res.status(400).json(errors[0].constraints);
    }

    await ad.save();
    res.status(201).send(ad);
  } catch (error) {
    console.error("Erreur lors de la création de l'annonce :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'annonce", error });
  }
});

adsRouter.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const ad = await Ad.findOne({
    where: { id },
    relations: {
      category: true,
      tags: true,
    },
  });

  try {
    if (ad !== null) {
      const {
        title,
        description,
        owner,
        price,
        picture,
        location,
        createdAt,
        categoryId,
        tags,
      } = req.body;
      ad.title = title;
      ad.description = description;
      ad.owner = owner;
      ad.price = price;
      ad.picture = picture;
      ad.location = location;
      ad.createdAt = createdAt;
      ad.category = categoryId;
      console.log(categoryId);

      const tagIds = await Tag.find({
        where: { id: In(tags) },
      });

      console.log("adtags", ad.tags);

      ad.tags = tagIds;
      ad.save();
      res.status(200).send(ad);
    }
  } catch (error) {
    if (ad === null) res.status(304);
  }
});

adsRouter.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await Ad.delete({ id });
  res.status(422);
});

export default adsRouter;
