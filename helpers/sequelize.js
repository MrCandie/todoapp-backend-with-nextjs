import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  username: process.env.NEXT_PUBLIC_USER,
  // password: process.env.NEXT_PUBLIC_PASSWORD,
  database: process.env.NEXT_PUBLIC_DATABASEs,
  host: process.env.NEXT_PUBLIC_HOST,
  benchmark: true,
  dialect: "mysql",
  dialectModule: require("mysql2"),
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DATABASE CONNECTION SUCCESSFUL");

    await sequelize.sync({ alter: true });
    console.log("sync successful");
  } catch (error) {
    console.log(error);
  }
})();

export default sequelize;
