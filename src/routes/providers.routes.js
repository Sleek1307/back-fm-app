import { Router } from "express";
import connection from "../conection.js";

const provider = Router();

// Create a new provider 
provider.post('/providers', (req, res) => {

    const {idProvider, nameProvider, numberProvider, addres} = req.body;
    const query = `
        insert into providers(
            idProvider, 
            nameProvider,
            numberProvider,
            addres
        )
        values(?,?,?,?);`

    connection.query(query, [idProvider, nameProvider, numberProvider, addres], (err, rows, fields)=>{
        if (!err) {
            res.json({status: 'Provider Saved'})
        } else {
            console.log(err);
        }
    })
})

// Read all providers
provider.get('/providers', (req, res) => {
    connection.query('call  listProviders;', (err, rows, fields)=>{
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
})

// Read one provider 
provider.get('/providers/:id', (req, res) => {
    const id = req.params.id;

    connection.query('select * from providers where idProvider=?', [id], (err, rows, fields)=>{
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

// Update one provider
provider.post('/providers/:id', (req, res) => {
    const id = req.params.id;
    const {nameProvider, numberProvider, addres} = req.body;
    const query = `update providers set 
        nameProvider = ${nameProvider},
        numberProvider = ${numberProvider},
        addres = ${addres}
    where idProvider = ${id};`

    connection.query(query, (err, rows, fields) =>{
        if (!err) {
            res.json({status: 'Provider Update'})
        } else {
            console.log(err);
        }
    })
})

export default provider;