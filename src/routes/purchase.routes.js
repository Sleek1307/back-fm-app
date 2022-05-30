import { Router } from "express";
import connection from "../conection.js";
import purchases from "../querys/purchase.js";

const purchase = Router();
const purchaseQueries = purchases();

//Create one purchase
purchase.post("/purchase", (req, res) => {
  const { idProvider, costPurchase, date, productos } = req.body;

  connection.query(purchaseQueries.create_purchase(idProvider, costPurchase, date), (err) => {
    if (!err) {
      connection.query(purchaseQueries.create_purchase_product(), (err) => {
         if (!err) {
            res.json({status:'OK', message: 'Compra registrada con exito'})
         }
      })
    }else{
           
      res.json(err)
    }
  })
});

// get all purchases whithouth details
purchase.get("/purchase", (req, res) => {
  const query =
    "SELECT purchases.idPurchase, providers.nameProvider,  purchases.costPurchase, purchases.date from purchases inner join providers on purchases.idProvider = providers.idProvider";
  connection.query(query, (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.json(rows);
    } else {
      res.json({ status: "Ups, algo ha ido mal" });
    }
  });
});

export default purchase;
