import queryAsync from "../utilities.js";
import purchases from "../querys/purchase.js";
import sales from "../querys/sales.js";

const saleServices = {
  saleProcess: async (saleData) => {
    let result;
    let resultSale;

    // resultSale = await sales().create_sale(saleData, queryAsync);
    // console.log(resultSale.insertId);

    // if (resultSale.error) return resultSale;

    saleData.products.map(async (item) => {
      let flag = false;
      let amountProduct = item.amount;
      let purchases_products = await purchases().get_purchase_if_has_product(
        item.idProduct,
        queryAsync
      );

      while (!flag) {
        purchases_products = purchases_products[0];
        let resultSaleProduct;

        if (purchases_products.amount >= amountProduct) {
          console.log("Estas en el If");

          resultSaleProduct = await sales().create_sale_products(
            item,
            purchases_products,
            item.amount,
            queryAsync
          );

          let pp = await purchases().update_purchase_product(
            purchases_products.amount - item.amount,
            purchases_products.purchase,
            item.idProduct,
            queryAsync
          );

          console.log(resultSaleProduct);
          flag = true;
        } else {
          console.log("estas en el else");

          resultSaleProduct = await sales().create_sale_products(
            item,
            purchases_products,
            purchases_products.amount,
            queryAsync
          );

          if (resultSaleProduct.error) {
            console.log(resultSaleProduct);
            return;
          }

          await purchases().update_purchase_product(
            0,
            purchases_products.purchase,
            item.idProduct,
            queryAsync
          );

          amountProduct = amountProduct - purchases_products.amount;

          purchases_products = await purchases().get_purchase_if_has_product(
            item.idProduct,
            queryAsync
          );
        }
      }
    });
  },
};

export default saleServices;
