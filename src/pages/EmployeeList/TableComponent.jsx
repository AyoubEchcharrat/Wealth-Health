import { useFilters, useSortBy, useTable } from "react-table";
import './TableComponent.css'
import { useState } from "react";
export default function TableComponent({ columns, data }) {
    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow,
        setFilter, 
      } = useTable({
        columns,
        data
      },
      useFilters,
      useSortBy);

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
                {rows.map((row, i) => {
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
        </div>
      );
};