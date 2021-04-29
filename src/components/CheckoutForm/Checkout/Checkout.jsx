import React from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  CircularProgress,
  Button,
  Typography,
} from "@material-ui/core";
import useStyles from "./Styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
const steps = ["Shipping address", "Payment details"];

const Form = ({ activeStep }) =>
  activeStep === 0 ? <AddressForm /> : <PaymentForm />;
const Confirmation = () => <div>confirmation</div>;
const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography varient="h4" align="center">
              checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              <Form activeStep={activeStep} />
            )}
          </Paper>
        </main>
      </div>
    </>
  );
};

export default Checkout;
