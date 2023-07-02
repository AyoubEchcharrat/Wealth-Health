import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import ReactSelect from "react-select";
import {states} from './StatesArray'
import ModalPlugin from "tiny-modal-plugin"

const defaultValues = {
    ReactDatepickerBirth: new Date(),
    ReactDatepickerStart:'',
    FirstName:'',
    LastName:'',
    Street:'',
    City:'',
    Zip:'',
  };

function FormComponent() {
    const { control, handleSubmit } = useForm({defaultValues});
    const [toggleModal, setToggleModal] = useState(false)

    const reformateDate = (date) => {
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let format =  (month+1)+ "/" + day + "/" + year;
        return format
    }

    const onSubmit = data => {
      const employees = JSON.parse(localStorage.getItem('WealthHealthEmployees')) || [];
      const employee = {
         BirthDate : reformateDate(data.ReactDatepickerBirth),
         StartDate : reformateDate(data.ReactDatepickerStart),
         FirstName : data.FirstName,
         LastName : data.LastName,
         Street : data.Street,
         City : data.City,
         State : data.State,
         Zip : data.Zip,
        Department : data.Department
      }
      employees.push(employee);
      localStorage.setItem('WealthHealthEmployees', JSON.stringify(employees));
      setToggleModal(true)
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label>First Name</label>
          <Controller
            control={control}
            name="FirstName"
            render={({ field }) => (
              <input {...field}
                className="input"
              />
            )}
          />
        </section>
        <section>
          <label>Last Name</label>
          <Controller
            control={control}
            name="LastName"
            render={({ field }) => (
              <input {...field}
                className="input"
              />
            )}
          />
        </section>
        <section>
          <label>Birth Date</label>
          <Controller
            control={control}
            name="ReactDatepickerBirth"
            render={({ field }) => (
              <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                className="input"
                onChange={(e) => field.onChange(e)}
                selected={field.value}
                required
              />
            )}
          />
        </section>
        <section>
          <label>Start Date</label>
          <Controller
            control={control}
            name="ReactDatepickerStart"
            render={({ field }) => (
              <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                className="input"
                onChange={(e) => field.onChange(e)}
                selected={field.value}
                required
              />
            )}
          />
        </section>
        <section>
          <label>Street</label>
          <Controller
            control={control}
            name="Street"
            render={({ field }) => (
                <input {...field}
                className="input"
              />
            )}
          />
        </section> 
        <section>
          <label>City</label>
          <Controller
            control={control}
            name="City"
            render={({ field }) => (
                <input {...field}
                className="input"
              />
            )}
          />
        </section>     
        <section>
          <label>State</label>
          <Controller
            control={control}
            name="State"
            render={({ field }) => (
                <ReactSelect
                isClearable
                {...field}
                options={states}
              />
            )}
          />
        </section> 
        <section>
          <label>Zip Code</label>
          <Controller
            control={control}
            name="Zip"
            render={({ field }) => (
                <input
                className="input"
                type='number'
                {...field}
                />
            )}
          />
        </section> 
        <section>
          <label>Department</label>
          <Controller
            control={control}
            name="Department"
            render={({ field }) => (
            <ReactSelect
                isClearable
                {...field}
                options={[
                    { value: "Sales", label: "Sales" },
                    { value: "Marketing", label: "Marketing" },
                    { value: "Engineering", label: "Engineering" },
                    { value: "Human Resources", label: "Human Resources" },
                    { value: "Legal", label: "Legal" }
                ]}
              />    
            )}
          />
        </section>                          
        <input type="submit" />
        <ModalPlugin width='230px' height='100px' toggleModal={toggleModal} setToggleModal={setToggleModal}
                colorBG={'#eee'} >
                <p>New employee added !</p>
        </ModalPlugin>
      </form>
    );
}

export default FormComponent;