import { Router } from "express";
import connection from "../conection.js";

const product = Router();

// Read all products
product.get("/products", (req, res) => {
  connection.query("call listProducts;", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// Read one product
product.get("/products/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "select * from products where idProduct = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//Create a new product
product.post("/products", (req, res) => {
  console.log(req.body);
  const { idProduct, description, fullAmount, voidAmount, amount } = req.body;

  const query = `
    insert into products(
        idProduct, 
        description)
    values(?, ?);`;

  connection.query(
    query,
    [idProduct, description, fullAmount, voidAmount, amount],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "OK" });
      } else {
        res.json({ status: err.errno });
      }
    }
  );
});

//Update someone product
product.post("/products/:id", (req, res) => {
  console.log(req.params.id + " " + req.body);

  const id = req.params.id;
  const { description, fullAmount, voidAmount, amount, state } = req.body;
  const query = `
    update products set 
        description = ${description},
        fullAmount = ${fullAmount},
        voidAmount = ${voidAmount},
        amount = ${amount},
        state = ${state}
    where idProduct = ${id};`;

  connection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json({ status: `Products ${description} Update'` });
    } else {
      console.log(err);
      res.json({ status: err });
    }
  });
});

// kardex
product.post("/products/kardex/:id", (req, res) => {
  const id = req.params.id;

  console.log(id)

  const query = `SELECT sales.date as fecha, sales.idSale as factura, sales.type_operation as detalle, sales_products.salePrice as unitario, sales.valor as valor, sales_products.amount as cantidad, sales_products.idProduct as producto
  FROM sales
  INNER JOIN sales_products ON sales.idSale = sales_products.idSale
  WHERE sales_products.idProduct = ${id}
  
  UNION ALL
  
  SELECT purchases.date as fecha, purchases.idPurchase as factura, purchases.type_operation as detalle, purchases_products.cost as unitario, purchases.costPurchase as valor, purchases_products.amount as cantidad, purchases_products.idProduct as producto
  FROM purchases
  INNER JOIN purchases_products ON purchases.idPurchase = purchases_products.idPurchase
  WHERE purchases_products.idProduct = ${id}
  
  ORDER BY fecha DESC`; 

    connection.query(query, (err, rows) =>{
        if (!err) {
            res.json(rows)
        } else {
            res.json({status: err});
        }
    })
});
export default product;
