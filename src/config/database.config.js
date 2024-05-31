import { Sequelize } from 'sequelize';

const host = "aws-0-eu-central-1.pooler.supabase.com";
const user = "postgres.dozkwxhwbqmclqrlvbar";
const database_user = "postgres";
const password = "Manisa2024.";
const port = 6543; // Custom port provided in the URI

const sequelize = new Sequelize(database_user, user, password, {
  host: host,
  port: port,
  dialect: 'postgres', // Change this to 'postgres'
  define: {
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000, // Increased acquire timeout
    idle: 20000     // Increased idle timeout
  },
  retry: {
    match: [/ETIMEDOUT/],
    max: 5  // Increased retry attempts
  }
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connectToDatabase();

export default sequelize;
