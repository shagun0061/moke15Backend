const express = require("express");
const cors = require("cors");
const { connect } = require("./config/dbConnect");
const user_Rigester_Routes = require("./Routes/UserRegisterRoutes")
const Admin_Routes = require("./Routes/AdmminRoutes")

const app = express();
app.use(cors());

app.use(express.json());
app.use(user_Rigester_Routes)
app.use(Admin_Routes)

app.listen(8080, async () => {
  try {
    await connect;
    console.log("connext ot DB moke 15 💻 ✔");
  } catch (error) {
    console.log(error);
  }
  console.log(`server is running  🤝 ✔ `);
});
