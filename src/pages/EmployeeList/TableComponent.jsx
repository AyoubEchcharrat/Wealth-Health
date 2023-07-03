import { useFilters, useSortBy, useTable, usePagination } from "react-table";
import './TableComponent.css'
import { useState } from "react";
export default function TableComponent({ columns, data, initialState }) {
    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        prepareRow,
        setFilter, 
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
      } = useTable({
        columns,
        data,
        initialState
      },
      useFilters,
      useSortBy,
      usePagination);

      const [filterInput, setFilterInput] = useState("");
      const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("LastName", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
      };

      return (
        <div className="table-container">
            <input
            className="search-employee-list-input"
                value={filterInput}
                onChange={handleFilterChange}
                placeholder={"Search name"}
            />
            <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "sort-desc"
                          : "sort-asc"
                        : ""
                    }
                  >
                    {column.render("Header")}
                  </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                    </tr>
                );
                })}
            </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
                </button>{" "}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {"<"}
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
                </button>{" "}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {">>"}
                </button>{" "}
                <span>
                Page{" "}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
                </span>
                <span>
                | Go to page:{" "}
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(page);
                    }}
                    style={{ width: "100px" }}
                />
                </span>{" "}
                <select
                value={pageSize}
                onChange={(e) => {
                    setPageSize(Number(e.target.value));
                }}
                >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
                </select>
            </div>
        </div>
      );
};