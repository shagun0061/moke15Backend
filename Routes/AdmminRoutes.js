const express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AdminAddModal } = require("../model/AdminAddModal");

const Admin_Routes = express.Router();

Admin_Routes.get("/adminget", async (req, res) => {
  let totalJobs = await AdminAddModal.find();

  let totalLength = totalJobs.length;
  let page = +req.query.page || 1;
  let skip = (page - 1) * 4;
   
  if (req.query) {
    if (req.query.name) {
      let filter_query = req.query.name;
      let jobs = await AdminAddModal.find({ Company_name: filter_query })
        .skip(skip)
        .limit(4);
      res.send({ data: jobs, total: totalLength });
    } else if (req.query.location) {
      let filter_query = req.query.location;
      let jobs = await AdminAddModal.find({ Location: filter_query })
        .skip(skip)
        .limit(4);
      res.send({ data: jobs, total: totalLength });
    } else if (req.query.contract) {
      let filter_query = req.query.contract;
      let jobs = await AdminAddModal.find({ Contract: filter_query })
        .skip(skip)
        .limit(4);
      res.send({ data: jobs, total: totalLength });
    } else {
      let jobs = await AdminAddModal.find().skip(skip).limit(4);;
      res.send({ data: jobs, total: totalLength });
    }}
   
});

Admin_Routes.post("/adminadd", async (req, res) => {
  console.log(req.body);
  try {
    let newCompany = new AdminAddModal(req.body);
    await newCompany.save();
    res.send("Add sucessfully");
  } catch (error) {
    res.send(error);
  }
});

Admin_Routes.delete("/admindel/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let r = await AdminAddModal.findOneAndDelete({ _id: id });
    res.send({ r, res: "post delete sucessful" });
  } catch (error) {
    res.send(error);
  }
});

Admin_Routes.patch("/adminpatch/:id", async (req, res) => {
  let payload = req.body;
  let ID = req.params.id;
  try {
    await AdminAddModal.findByIdAndUpdate(ID, payload);
    res.send("updated sucessfully");
  } catch (error) {
    res.send(error);
  }
});
module.exports = Admin_Routes;
