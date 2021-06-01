const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagsAndProdudctsData = await Tag.findAll({
      include: [{
        model: Product
      }]
    });
    res.status(200).json(allTagsAndProdudctsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });
    if (!tagData) {
      res.status(404).json({
        message: "Not Found. There is no tag associated with the id that was provided."
      });
    } else {
      res.status(200).json(tagData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
      {tag_name: req.body.tag_name},
      {where: {id: req.params.id}});
    if (!updatedTag) {
      res.status(404).json({
        message: "Not Found. There is no tag associated with the id that was provided."
      });
    } else {
      try {
        const tagData = await Tag.findByPk(req.params.id);
        if (!tagData) {
          res.status(404).json({
            message: "Not Found. There is no category associated with the id that was provided."
          });
        } else {
          res.status(200).json(tagData);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedTag) {
      res.status(404).json({
        message: "Not Found. There is no tag associated with the id that was provided."
      });
      return;
    } else {
      res.status(200).json(deletedTag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
