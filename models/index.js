// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreingKey: "category_id"
});

// Categories have many Products
Category.hasMany(Product, {
  foreingKey: "category_id",
  onDelete: "CASCADE",
  OnUpdate: "CASCADE"
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {through: ProductTag});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {through: ProductTag});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
