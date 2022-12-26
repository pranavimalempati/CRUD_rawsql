const { client } = require("../db");
const pg = require('pg');
const format = require('pg-format');


const create = async(req,res)=>{
    try {
        const resp = await client.query(`CREATE TABLE students(id SERIAL PRIMARY KEY,fullname VARCHAR NOT NULL,email VARCHAR NOT NULL)`)
       res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
}
const add = async (req, res) => {
    try {
        const fullname = req.body.fullname
        const email = req.body.email
        console.log("start excecution.......")
        const resp = await client.query(`INSERT INTO students(fullname,email) VALUES('${fullname}','${email}')`);
        res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
}

const findById = async (req, res) => {
    try {
        const id = req.params.id
        console.log("start excecution.......")
        const resp = await client.query(`SELECT * FROM students WHERE id = ${id}`);
        res.send(resp.rows)
    } catch (error) {
        res.send(error.message)
    }
}

const findAll = async (req, res) => {
    try {
        console.log("start excecution.......")
        const resp = await client.query(`SELECT * FROM students`);
        res.send(resp.rows)
    } catch (error) {
        res.send(error.message)
    }
}

const update = async (req, res) => {
    try {
        const fullname = req.body.fullname
        const email = req.body.email
        const id = req.body.id
        console.log("start excecution.......")
        const resp = await client.query(`UPDATE students SET fullname = '${fullname}', email = '${email}' WHERE id = ${id}`);
        res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
}

const removeById = async (req, res) => {
    try {
        const id = req.params.id
        console.log("start excecution.......")
        const resp = await client.query(`DELETE FROM students WHERE id =${id}`);
        res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
}

const findByName = async (req, res) => {
    try {
        const fullname = req.body.fullname
        console.log("start excecution.......")
        const resp = await client.query(`SELECT * FROM students WHERE name like '%${fullname}%'`);
        res.send(resp.rows)
    } catch (error) {
        res.send(error.message)
    }                
}

const bulk = async (req, res) => {
    try {
      const values = req.body;
      let arr = [];
      values.map((item) => {
        let data = [(fullname = item.fullname), (email = item.email)];
        console.log("data", data);
        arr.push(data);
      });
      const sql = `INSERT INTO students(fullname,email) VALUES %L returning id`;
      const formatedQuery = format(sql, arr);  
      console.log("array values", arr);
      await client.query(formatedQuery, function (error, result) {  
        if (error) {
          console.log(error.message);
        }
        console.log("result", result);
        res.status(200).json({
          message: "inserted records into db",
          res: result.rows,
        });
      });
    } catch (error) {
      console.log("unable to insert record into db");
      console.log(error.message);
      res.status(400).json({
        message: "unable to insert record into db",
      });
  }
}


module.exports = {create,add ,findById,findAll,update,removeById,findByName,bulk}