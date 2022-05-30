import { Router } from "express";
import connection from "../conection.js";
import sales from "../querys/sales.js";
import credit from "../querys/credits.js";
import saleServices from "../services/sales.services.js";

const sale = Router();
const saleQueries = sales();
const creditsQueries = credit();

//Select all sales
sale.get("/sales", (req, res) => {
  // const query = `
  //   select a.idSale, b.nameCostumer,
  //   a.valor, a.date
  //   from sales a 
  //   inner join costumers b
  //   ON a.idCostumer = b.idCostumer;`;

  // connection.query(query, (err, rows, fields) => {
  //   if (!err) {
  //     res.json(rows); 
  //   } else {
  //     console.log(err);
  //   }
  // });
});

// Select one sale
sale.get("/sales/:idCostumer", (req, res) => {
  const id = req.params.idCostumer;
  const query = `
    select a.idSale, b.nameCostumer,
    a.valorTotal, a.dateSale, a.credit
    from sales a 
    inner join costumers b
    ON a.idCostumer = b.idCostumer
    where a.idCostumer = ${id};`;

  connection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// Select all product of a sale
sale.get("/sales/:idSale", (req, res) => {
  const id = req.params.idSale;
  const query = `
    SELECT a.description, b.amount, 
    b.salePrice, b.profit 
    FROM products a 
    INNER JOIN sales_products b 
    ON b.idProduct = a.idProduct 
    WHERE b.idSale = ${id}; `;

  connection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// Create a sale and sale_product register
sale.post("/sale", async(req, res) => {

const sale = req.body;

console.log(sale)
res.json(await saleServices.saleProcess(sale));
  //Se extraen todos los datos para ralizar los registros correspondientes
  // const sale = req.body;
  // const response = await saleQueries.create_sale(sale, saleQueries.queryAsync)

  // if (condition) {
    
  // }

  // res.json(response);

  // Se hace la consulta para registrar la venta
  // connection.query
  //   saleQueries.sale,
  //   [idCostumer, costSale, date, credit],
  //   (err) => {
  //     if (!err) {
  //       connection.query(
  //         "select MAX(idSale) as id from sales;",
  //         (err, rows) => {
  //           if (!err) {
  //             //Si todo va bien se extrae el id de la venta realizada
  //             idSale = rows[0].id;
  //             //Se recorren todos los productos ingresados
  //             products.forEach((element) => {
  //               const { idProduct, amount, unitValue } = element;
  //               //Se registra cada uno de los productos asociados a esa venta
  //               connection.query(
  //                 saleQueries.insert_sale_purchase,
  //                 [idSale, idProduct, amount, unitValue, 0],
  //                 (err) => {

  //                   if (err) {
  //                     //Si algo sucede se envia el error en un response
  //                     res.json({ error: err });
  //                   }
  //                 }
  //               );
  //             });


  //             //Si existe un credito se realiza el debido registro de este
  //             if (credit) {
  //               connection.query(
  //                 creditsQueries.create_credit,
  //                 [idCostumer, idSale, costSale, 0, costSale],
  //                 (err) => {
  //                   // Si algo pasa se retorna un mensaje de error por medio de un response
  //                   if (err) {
  //                     res.json({ err: "No se pudo registrar el credito" });
  //                   }
  //                 }
  //               );
  //             }

  //           // Si todo va bien la venta se registra con exito
  //             res.json({ msg: "Venta realizada con exito" });
  //           } else {
  //             res.json({ error: err });
  //           }
  //         }
  //       );
  //     } else {
  //       res.json({ error: err });
  //     }
  //   }
  // );
});

export default sale;
