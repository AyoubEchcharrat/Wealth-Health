import React, { useMemo } from 'react';
import TableComponent from './TableComponent';
import { Link } from 'react-router-dom';

function EmployeeList() {

    const columns = useMemo(
        () => [

            {
                Header: "First Name",
                accessor: "FirstName",
                },
                {
                Header: "Last Name",
                accessor: "LastName",
                },
                {
                Header: "Start Date",
                accessor: "StartDate",
                },
                {
                Header: "Department",
                accessor: "Department.value",
                },
                {
                Header: "Birth Date",
                accessor: "BirthDate",
                },
                {
                Header: "Street",
                accessor: "Street",
                },
                {
                Header: "City",
                accessor: "City",
                },
                {
                Header: "State",
                accessor: "State.abbreviation",
                },
                {
                Header: "Code Zip",
                accessor: "Zip",
                },

            ],[])
        const data = JSON.parse(localStorage.getItem('WealthHealthEmployees'));

    return (
        <div className='body-page'>
            <div className='navigate-link'>
                <Link to='/'> + Add employee</Link>
            </div>
            <TableComponent columns={columns} data={data} />
        </div>
    )
}

export default EmployeeList;