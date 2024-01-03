const { Sequelize, DataTypes, Model } = require('sequelize');

// Initialize Sequelize to use SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/your/database.sqlite' // Specify your SQLite database file
});

// Define the User model
class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usertype: {
        type: DataTypes.STRING
        // allowNull is true by default
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

// Sync the model with the database
sequelize.sync();

module.exports = User;
