const last_id = (table) => {
  return `select MAX(idSale) as id from ${table};`;
};

export {last_id}