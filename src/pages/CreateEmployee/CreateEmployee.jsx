import React from 'react';
import FormComponent from './Form';
import { Link } from 'react-router-dom';

function CreateEmployee() {
    return (
        <div className='body-page'>
            <div className='navigate-link'>
                <Link to='/employee-list'> ← View Current Employees</Link>
            </div>
            <h2>Create Employee</h2>
            <FormComponent/>
        </div>
    );
}

export default CreateEmployee;