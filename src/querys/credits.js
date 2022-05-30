const credit = () => {
  const cadenas = {
    create_credit: `INSERT INTO credits(idCostumer, idSale, debtTotal, paymentTotal, debtRemaining) VALUES (?, ?, ?, ?, ?)`,
    update_credit: `UPDATE credits SET paymentTotal = ?, debtRemaining = ? WHERE idCredit = ?;`,
    select_credits_values: `SELECT paymentTotal, debtRemaining FROM credits WHERE idCredit = ?;`,
    select_credits_in_time: (date1, date2) => {
      return `SELECT credits.idCredit, credits.debtTotal, credits.debtRemaining, credits.paymentTotal, 
                            costumers.nameCostumer, sales.idSale, sales.date 
                              FROM credits 
                              INNER JOIN costumers ON credits.idCostumer = costumers.idCostumer 
                              INNER JOIN sales ON credits.idSale = sales.idSale
                            WHERE fecha BETWEEN '${date1}' AND '${date2}'
                            `;}, 
    select_all_credits: `SELECT a.idSale, a.debtTotal, a.paymentTotal, a.debtRemaining, b.nameCostumer, c.date 
                            FROM ((credits a 
                            INNER JOIN costumers b ON a.idCostumer = b.idCostumer) 
                            INNER JOIN sales c ON a.idSale = c.idSale) 
                          WHERE a.debtRemaining > 0;`,
    select_credits_costumer: `SELECT a.nameCostumer, b.idSale, b.debtTotal, b.paymentTotal, b.debtRemaining
                            FROM costumers a 
                            INNER JOIN credits b 
                            ON a.idCostumer = b.idCostumer
                            WHERE b.idCostumer = ?;`,
    delete_credit: `DELETE FROM credist WHERE idCredit = ?`,
    create_payment: (paymentTotal, debtRemaining, date, amount) => {
      `INSERT INTO payments(idPayment, idCredit, amount, date) 
      VALUES (SELECT MAX(idPayment+1) FROM payments WHERE idCredit = 2;, ${paymentTotal}, ${debtRemaining}, )`;
    },
    select_credit_payment: `SELECT idPayment FROM payments WHERE idCredit = ?;`,
    select_payment_date: `SELECT * FROM payments WHERE date = ?`,
    select_payment_data: `SELECT amount FROM payments WHERE idCredit = ? AND idPayment = ?;`,
    delete_payment: `DELETE FROM payments WHERE idPayment = ? AND idCredit = ?;`,
  };

  return cadenas;
};

export default credit;
