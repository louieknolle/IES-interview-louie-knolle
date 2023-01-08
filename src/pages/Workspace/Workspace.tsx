import React, { Dispatch, SetStateAction, useState } from "react";
import productFactory from "./utils";
import Title from "./Title";
import ProductsTable from "./ProductsTable";
import SearchBar from "./SearchBar";

// Generate 100 random products
const fakeFetchProducts = () => Array.from({ length: 100 }, productFactory);
const products = fakeFetchProducts();

export interface ProductsTableProps {
  data: any[];
  page: number;
  rowsPerPage: number;
  filteredProducts: any[];
  emptyRows: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchBarProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const Workspace = (): JSX.Element => {
  // TODO: Create a UI to display and search the data above.
  // You are encouraged to use MUI components to help you (https://mui.com/material-ui/getting-started/overview/)
  const [data, setData] = useState(products);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const filteredProducts = data.filter((product) => {
    const productString = JSON.stringify(product).toLowerCase();
    return productString.includes(searchValue.toLowerCase());
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Title />
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <ProductsTable
        data={data}
        page={page}
        rowsPerPage={rowsPerPage}
        filteredProducts={filteredProducts}
        emptyRows={emptyRows}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Workspace;
