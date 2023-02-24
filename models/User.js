module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
    
          name: {
            type: DataTypes.STRING(200),
            allowNull: false
          },
    
          email: {
            type: DataTypes.STRING(200),
            allowNull: false
          },

          nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
          },
    
          password: {
            type: DataTypes.STRING(300),
            allowNull: false
          },

    }, {
        tableName: "users",
        timestamp: true,
    });

    return User;
}