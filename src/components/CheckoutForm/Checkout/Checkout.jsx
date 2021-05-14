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

const Form = ({ activeStep, checkoutToken, shippingData, next }) =>
  activeStep === 0 ? (
    <AddressForm next={next} checkoutToken={checkoutToken} />
  ) : (
    <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} />
  );

const Confirmation = () => <div>confirmation</div>;

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [checkoutToken, setCheckoutToken] = useState(null);
  const classes = useStyles();

  const nextStep = () => setActiveStep((previous) => previous + 1);
  const backStep = () => setActiveStep((previous) => previous - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

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
                <Form
                  next={next}
                  activeStep={activeStep}
                  checkoutToken={checkoutToken}
                  shippingData={shippingData}
                />
              )
            )}
          </Paper>
        </main>
      </div>
    </>
  );
};

export default Checkout;
