import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { ProductsTableProps } from "./Workspace";
import React from "react";

const ProductsTable = ({
  data,
  page,
  rowsPerPage,
  filteredProducts,
  emptyRows,
  handleChangePage,
  handleChangeRowsPerPage,
}: ProductsTableProps) => {
  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ width: "90%", margin: "auto" }}>
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
    </React.Fragment>
  );
};

export default ProductsTable;
