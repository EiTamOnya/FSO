import { Field, Form, Formik } from "formik";
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import {  TextField  } from "../AddPatientModal/FormField"; 
import { Entry } from "../types";
import { v1 as uuid } from 'uuid';

interface Props {
  onSubmit: (values: Entry) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuid();

  return (
    <Formik
    initialValues={{
        id: id,
        date: new Date().toLocaleDateString(),
        specialist: "",
        type: "OccupationalHealthcare",
        description: "",
        employerName: "",
      }}
    onSubmit={onSubmit}
    validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.dateOfBirth = requiredError;
        }
        return errors;
      }}
  >
    {({ isValid, dirty, resetForm}) => {

      return (
        <Form className="form ui">

            <Field
              label="date"
              placeholder={new Date().toLocaleDateString()}
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="description"
              placeholder={"description"}
              name="description"
              component={TextField}
            />
            <Field
              label="employerName"
              placeholder="employer name"
              name="employerName"
              component={TextField}
            />
          <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={() => resetForm()} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Submit
                </Button>   
              </Grid.Column>
          </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;
