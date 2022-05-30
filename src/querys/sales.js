const sales = () => {
  const cadenas = {
    create_sale: async (sale, asyncQuery) => {
      const {idCostumer, date, saleValue, credit} = sale;

      let insert_sale = `INSERT INTO sales (costumer, value, date, credit)
                        VALUES('${idCostumer}',${saleValue}, '${date}', ${credit});`;

      let resultSale;
      try {
        resultSale = await asyncQuery(insert_sale)
      } catch (error) { 
        resultSale = {"error": error.errno, "mensaje": error.sqlMessage, "query": error.sql};
      }    

      return resultSale;
    },
    create_sale_products: async (product, _purchase, amount, asyncQuery) => {

      console.log('Estas en create sale');

      const {cost, purchase} = _purchase;
      const {idProduct, value} = product;

      let insert_sale_product = (cost, purchase, amount, idProduct, value) => {
        return `INSERT INTO sales_products(idSale, idProduct, idPurchase, amount, saleValue, profit) VALUES((SELECT MAX(idSale) FROM sales), '${idProduct}',${purchase}, ${amount}, ${value}, ${value - cost});`
      };
      
      let resultSaleProduct;
      try {
        resultSaleProduct = await asyncQuery(insert_sale_product(cost, purchase, amount, idProduct, value));
      } catch (error) {
        resultSaleProduct = {"error": error.errno, "mensaje": error.sqlMessage, "query": error.sql};
      }

      return resultSaleProduct;
    },
    select_all_sales: `
        SELECT  a.idSale, b.nameCostumer,
                a.valorTotal, a.dateSale
        FROM sales a 
        INNER JOIN costumers b
        ON a.idCostumer = ?;`,
    select_sale: `
        SELECT  a.idSale, b.nameCostumer,
                a.valorTotal, a.dateSale, a.credit
        FROM sales a 
        INNER JOIN costumers b
        ON a.idCostumer = b.idCostumer
        WHERE a.idCostumer = ?;`,
    select_products_sale: `
        SELECT  .description, b.amount, 
                b.salePrice, b.profit 
        FROM products a 
        INNER JOIN sales_products b 
        ON b.idProduct = a.idProduct 
        WHERE b.idSale = ?;`,
  };

  return cadenas;
};

export default sales;
