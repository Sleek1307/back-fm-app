import { Router } from "express";
import connection from "../conection.js";
import costumers from "../querys/costumers.js";

const costumer = Router();
const queries = costumers();

//Get all costumers
costumer.get('/costumers', (req, res)=>{
    connection.query(queries.get_all_costumers, (err, rows, fields)=>{
        if (!err) {
            console.log(rows)
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

//Get one costumer
costumer.get('/costumers/:id', (req, res) =>{
    const id = req.params.id;

    connection.query(queries.get_one_costumer(id), (err, rows, fields)=>{
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

//Create a new costumer
costumer.post('/costumers', (req, res)=>{
    const {idCostumer, nameCostumer, numberCostumer, addres} = req.body;

    connection.query(queries.create_costumer(idCostumer, nameCostumer, numberCostumer, addres), (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Employed Saved'})
        } else {
            console.log(err);
        }
    });
})

//Update someone costumer
costumer.post('/costumers/:id', (req, res)=>{
    const id = req.params.id;
    const {nameCostumer, numberCostumer, addres, state} = req.body;

    connection.query(queries.update_costumer(id, nameCostumer, numberCostumer, addres, state), (err, rows, fields) =>{
        if (!err) {
            res.json({status: 'Employed Update'})
        } else {
            console.log(err);
        }
    })
})

costumer.post('')
export default costumer;