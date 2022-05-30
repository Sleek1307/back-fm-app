const purchases = () => {
  const cadenas = {
    create_purchase: (idProvider, costPurchase, date) => {
      return `INSERT INTO purchases 
            (idProvider, costPurchase, date) 
            VALUES(${idProvider}, ${costPurchase}, ${date});`;
    },
    create_purchase_product: (arr) => {
      let query =
        "INSERT INTO purchases_products (idPurchase, idProduct, amount, amountRemaining, cost, total) \nVALUES";
      arr.map((item) => {
        query += `((SELECT MAX(idPurchase) from purchases), '${
          item.product
        }', ${item.amount}, ${item.amount}, ${item.cost}, ${
          item.cost * item.amount
        }),`;
      });

      query = query.split("");
      query.pop();
      query = query.join("");
      query += ";";

      arr.map((item) => {
        query += `\nCALL updateProductPurchase('${item.product}', ${item.amount});`;
      });
      return query;
    },
    update_purchase_product: async (
      amountRemaining,
      purchase,
      product,
      asyncQuery
    ) => {
      console.log('Estas en el update');
      let query = `CALL updateProductPurchases_Products(${amountRemaining}, ${purchase}, '${product}')`;

      let result;
      try {
        result = asyncQuery(query);
      } catch (error) {
        result = {"error": error.errno, "mensaje": error.sqlMessage, "query": error.sql};
      }

      return result;
    },
    get_purchase_if_has_product: async(idProduct, asyncQuery) => {
      console.log('Estas en el get');
      let query = `SELECT MIN(idPurchase) as purchase, amountRemaining as amount, cost  
        FROM purchases_products 
        WHERE idProduct= '${idProduct}'
        AND amountRemaining > 0`;
    
      let result;
      try {
        result = await asyncQuery(query)
        console.log(result);
      } catch (error) {
        result = {"error": error.errno, "mensaje": error.sqlMessage, "query": error.sql};
      }

      return result;
    },
  };
  return cadenas;
};

export default purchases;
