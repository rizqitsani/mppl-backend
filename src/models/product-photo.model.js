module.exports = (sequelize, Sequelize) => {
  const ProductPhoto = sequelize.define(
    'ProductPhoto',
    {
      id: {
        type: Sequelize.STRING(21),
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.STRING(21),
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Product',
          key: 'id',
          as: 'product_id',
        },
      },
      photo_link: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: 'product_photo',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return ProductPhoto;
};
