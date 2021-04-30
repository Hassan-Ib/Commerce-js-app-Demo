import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ required, name, label }) => {
  const { control } = useFormContext();
  //   console.log({ label, name });
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        defaultValue=""
        control={control}
        name={name}
        render={({ field }) => (
          <TextField label={label} required={required} fullWidth />
        )}
      />
    </Grid>
  );
};

export default FormInput;
