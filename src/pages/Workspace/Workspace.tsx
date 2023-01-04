import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import productFactory from "./utils";

// Generate 100 random products
const fakeFetchProducts = () => Array.from({ length: 100 }, productFactory);
const products = fakeFetchProducts();

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
      <Typography variant="h4" align="center" color="secondary" gutterBottom>
        Products Manager
      </Typography>
      <TextField
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        label="Search"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "5%" }}
      />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 500, height: "50%" }}
          aria-label="custom pagination table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "10%" }}>Product</TableCell>
              <TableCell align="right" sx={{ width: "15%" }}>
                Type
              </TableCell>
              <TableCell align="right" sx={{ width: "15%" }}>
                Score
              </TableCell>
              <TableCell align="right" sx={{ width: "20%" }}>
                Manufacturer
              </TableCell>
              <TableCell align="right" sx={{ width: "15%" }}>
                Status
              </TableCell>
              <TableCell align="right" sx={{ width: "15%" }}>
                Groups
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length ? (
              (rowsPerPage > 0
                ? filteredProducts.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredProducts
              ).map((product) => {
                const productString = JSON.stringify(product);
                return (
                  <TableRow key={productString}>
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">{product.productType}</TableCell>
                    <TableCell align="right">{product.score}</TableCell>
                    <TableCell align="right">{product.manufacturer}</TableCell>
                    <TableCell align="right">{product.status}</TableCell>
                    <TableCell align="right">
                      {Array.isArray(product.groups)
                        ? product.groups.join(", ")
                        : product.groups}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <Typography>No results</Typography>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter sx={{ backgroundColor: "#efefef" }}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={({ page }) => {
                  return `Page: ${page}`;
                }}
                backIconButtonProps={{
                  color: "secondary",
                }}
                nextIconButtonProps={{ color: "secondary" }}
                showFirstButton={true}
                showLastButton={true}
                labelRowsPerPage={<span>Rows:</span>}
                sx={{
                  ".MuiTablePagination-toolbar": {
                    backgroundColor: "#efefef",
                  },
                  ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                    {
                      fontWeight: "bold",
                      color: "black",
                    },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default Workspace;
