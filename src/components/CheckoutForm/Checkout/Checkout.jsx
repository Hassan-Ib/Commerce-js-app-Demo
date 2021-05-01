import React, { useState } from "react";
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
import { commerce } from "../../../lib/commerce";
const steps = ["Shipping address", "Payment details"];

const Form = ({ activeStep, checkoutToken }) =>
  activeStep === 0 ? (
    <AddressForm checkoutToken={checkoutToken} />
  ) : (
    <PaymentForm />
  );

const Confirmation = () => <div>confirmation</div>;

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);

  React.useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        // console.log(token);
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    generateToken();
  }, [cart]);

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
              checkoutToken && (
                <Form activeStep={activeStep} checkoutToken={checkoutToken} />
              )
            )}
          </Paper>
        </main>
      </div>
    </>
  );
};

export default Checkout;
