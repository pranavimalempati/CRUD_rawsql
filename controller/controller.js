const { client } = require("../db");


const create = async(req,res)=>{
    try {
        const resp = await client.query(`CREATE TABLE students(id SERIAL PRIMARY KEY,name VARCHAR NOT NULL,email VARCHAR NOT NULL)`)
       res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
}
const add = async (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        console.log("start excecution.......")
        const resp = await client.query(`INSERT INTO students(name,email) VALUES('${name}','${email}')`);
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
        const id = req.params.id
        console.log("start excecution.......")
        const resp = await client.query(`SELECT * FROM students`);
        res.send(resp.rows)
    } catch (error) {
        res.send(error.message)
    }
}

const update = async (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const id = req.body.id
        console.log("start excecution.......")
        const resp = await client.query(`UPDATE students SET name = '${name}', email = '${email}' WHERE id = ${id}`);
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
        const name = req.body.name
        console.log("start excecution.......")
        const resp = await client.query(`SELECT * FROM students WHERE name like '%${name}%'`);
        res.send(resp.rows)
    } catch (error) {
        res.send(error.message)
    }
}



module.exports = {create,add ,findById,findAll,update,removeById,findByName}