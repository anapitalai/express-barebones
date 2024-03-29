// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const upload = sequelizeClient.define('upload', {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    orignalName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    newNameWithPath: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
   {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  upload.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    const {
      users
    } = models;
    upload.belongsTo(users);
  };

  return upload;
};
