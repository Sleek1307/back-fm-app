import { Router } from "express";
import connection from "../conection.js";
import credit from "../querys/credits.js";

const credito = Router();
const queries = credit();

// Select all credits of a costumer
credito.get("/credits/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    queries.select_credits_costumer,
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

// Select credits of a date range
credito.get("/credits/date", (req, res) => {

  const {from, to} = req.body;

  connection.query(queries.select_credits_in_time(from, to), (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  })
})

// Select all credits
credito.get("/credits", (req, res) => {
  connection.query(queries.select_all_credits, (err, rows) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// Create a new credit register
credito.post("/credits", (req, res) => {
  const { idCostumer, idSale, debtTotal, paymentTotal, debtRemaining } = req.body;

  connection.query(
    queries.create_credit,
    [idCostumer, idSale, debtTotal, paymentTotal, debtRemaining],
    (err) => {
      if (!err) {
        res.json({ status: "credit saved" });
      } else {
        console.log(err);
      }
    }
  );
});

//Delete payment
credito.post("/credits/payments/:idPayment", (req, res) => {
  const idPayment = req.params.idPayment;
  const idCredit = req.body.idCredit;
  const paymentTotal = req.body.paymentTotal;
  const debtRemaining = req.body.debtRemaining;
  const paymentValue = req.body.paymentValue;

  connection.query(
    `UPDATE credits SET 
      paymentTotal = (${paymentTotal} - ${paymentValue}),
      debtRemaining = (${debtRemaining} + ${paymentValue})
    WHERE idCredit = ${idCredit};`,
    (err, rows) => {
      if (!err) {
        console.log(rows);
        connection.query(
          queries.delete_payment,
          [idPayment, idCredit],
          (err, rows) => {
            if (!err) {
              console.log(rows);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );

  // console.log(`credito: ${idCredit} - pago: ${idPayment}`)
});

// Update a credit
credito.post("/credits/:idCredit", (req, res) => {

  console.log('Hola mundo')
  const idCredit = req.params.idCredit;
  const { paymentTotal, debtRemaining, date, amount } = req.body;
  console.log(req.body);
  // Se obtienen todos los datos necesarios para realizar la operacion

  //Se añade un elemento a la tabla de payments
  connection.query(
    queries.create_payment,
    [idCredit, amount, date],
    (err) => {
      if (!err) {
        // Si todo va bien se realiza la actualización de los saldos en la tabla credits
        connection.query(
          queries.update_credit,
          [paymentTotal, debtRemaining, idCredit],
          (err) => {
            if (!err) {
              // Si la actualizacion se realiza con exito manda el siguiente mensaje
              res.json({ status: "Credit update" });
            } else {
              // SI algo malo pasa y no se puede actualizar creditos, se elimina el ultimo
              //elemento de la tabla payments
              console.log(err);
            }
          }
        );
      }
    }
  );
});

export default credito;
