const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    released :{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW   
    },
    rating: {
      type: DataTypes.INTEGER,
      validate:{max:5},
      defaultValue:0

    }
  });
};
// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *