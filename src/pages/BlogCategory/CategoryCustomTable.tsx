import { ArrowRightAlt, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  useTheme
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { H5 } from "components/Typography";
import { ChangeEvent, FC, useMemo, useState } from "react";

import {
  useExpanded,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import ScrollBar from "simplebar-react";

// component props interface
interface CustomTableProps {
  columnShape: object[];
  data: object[];
  rowClick?: (rowData: object) => void;
  hidePagination?: boolean;
  showFooter?: boolean;
  modalOpen?: boolean;
  setModal?: Function;
  onEdit?: (categoryId: number) => void;
}

// styled component
const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    fontSize: 12,
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
  "& .MuiPaginationItem-page:hover": {
    borderRadius: 20,
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    borderRadius: 20,
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  "& .MuiPaginationItem-previousNext": {
    margin: 10,
    borderRadius: 20,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": { backgroundColor: "transparent" },
  },
}));

const CategoryCustomTable: FC<CustomTableProps> = (props) => {
  const {
    data,
    rowClick,
    showFooter,
    columnShape,
    hidePagination,
    modalOpen,
    setModal,
  } = props;
  const [category, setCategory] = useState("");
  // hooks
  const theme = useTheme();
  const tableData: any = useMemo(() => data, [data]);
  const columns: any = useMemo(() => columnShape, [columnShape]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
  }: any = useTable(
    {
      columns,
      data: tableData,
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );
  // handle pagination
  const handleChange = (_e: ChangeEvent<unknown>, currentPageNo: number) => {
    gotoPage(currentPageNo - 1);
  };
  // const handleClose = () => modalClose(false);
  const handleModalChange = (e: any) => {
    setCategory(e.target.value);
  };
  const handleAddCategory = () => {
    setCategory("");
  };

  // table border color
  const borderColor =
    theme.palette.mode === "light" ? "text.secondary" : "divider";
  const style = {
    modal: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    },
    addBtn: {
      backgroundColor: "blue",
      marginTop: "2rem",
    },
    closeBtn: {
      backgroundColor: "red",
      marginTop: "2rem",
      marginLeft: "1.2rem",
    },
  };
  return (
    <Box>
      <ScrollBar>
        <Table
          {...getTableProps()}
          sx={{
            borderSpacing: "0 1rem",
            borderCollapse: "separate",
          }}
        >
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={{
                      paddingY: 0,
                      fontSize: 13,
                      fontWeight: 600,
                      borderBottom: 0,
                      color: "text.disabled",
                      width: column.width,
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                      "&:last-child": { textAlign: "center" },
                    }}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page?.map((row: any) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  onClick={() => {
                    if (setModal) {
                      setCategory(row?.values?.name);
                      setModal(true);
                    }
                  }}
                  // onClick={rowClick && rowClick(row.original)}
                  sx={{
                    backgroundColor: "background.paper",
                    cursor: rowClick ? "pointer" : "unset",
                    "& td:first-of-type": {
                      borderLeft: "1px solid",
                      borderTopLeftRadius: "8px",
                      borderBottomLeftRadius: "8px",
                      borderColor,
                    },
                    "& MuiTableRow-root": {
                      textAlign: "center",
                      borderRight: "1px solid",
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                      borderColor,
                    },
                    "& td:last-of-type": {
                      borderRight: "1px solid",
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                      borderColor,
                    },
                    "&:last-of-type .MuiTableCell-root": {
                      borderBottom:
                        theme.palette.mode === "dark"
                          ? `1px solid ${theme.palette.divider} !important`
                          : `1px solid ${theme.palette.text.secondary} !important`,
                    },
                  }}
                // style={{
                //   borderRadius: "8px !important",
                // }}
                >
                  {row.cells.map((cell: any) => {
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        sx={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "text.disabled",
                          borderTop: "1px solid",
                          borderBottom: "1px solid",
                          borderColor,
                          // borderTopRightRadius: '8px !important',
                        }}
                      >
                        {Object.keys(row.values).includes(
                          "blog-categoty-actions"
                        ) && cell.column.Header == "Actions" ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              variant="contained"
                              startIcon={<Edit />}
                              style={{
                                alignSelf: "center",
                                // backgroundColor: "blue",
                              }}
                              onClick={() => {
                                if (props.onEdit) {
                                  props.onEdit(row.original.id); // Pass the category ID to the onEdit function
                                }
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                        ) : (
                          cell.render("Cell")
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollBar>

      {!hidePagination && (
        <Stack alignItems="flex-end" marginY={1}>
          <StyledPagination
            count={pageOptions.length}
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      )}

      {showFooter && (
        <FlexBox alignItems="center" justifyContent="space-between">
          <H5 color="text.disabled">Showing 1-12 of 24 result</H5>
          <ButtonBase
            disableRipple
            sx={{
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            See All
            <ArrowRightAlt sx={{ marginLeft: 0.5 }} />
          </ButtonBase>
        </FlexBox>
      )}
    </Box>
  );
};

export default CategoryCustomTable;
