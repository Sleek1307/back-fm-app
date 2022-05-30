const costumers = () => {
  const cadenas = {
    get_all_costumers: "SELECT * FROM costumers",
    get_one_costumer: (id) => {
      return `select * from costumers where idCostumer=${id}`;
    },
    create_costumer: (doc, typeDoc, name, number, addres) => {
      return `INSERT INTO costumers 
            (document,
            typeDoc,
            nameCostumer,
            numberCostumer,
            addres)
            VALUES(${doc},${typeDoc},${name},${number},${addres});`;
    },
    update_costumer: (id, name, number, addres, state) => {
      return `update costumers set 
            nameCostumer = ${name},
            numberCostumer = ${number},
            addres = ${addres}, 
            state = ${state}
            where idCostumer = ${id};`;
    },
  };

  return cadenas;
};

export default costumers;
