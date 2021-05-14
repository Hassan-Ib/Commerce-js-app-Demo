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
import { Link } from "react-router-dom";

const steps = ["Shipping address", "Payment details"];

const Form = ({
  activeStep,
  onCaptureCheckout,
  checkoutToken,
  shippingData,
  next,
  backStep,
  nextStep,
}) =>
  activeStep === 0 ? (
    <AddressForm next={next} checkoutToken={checkoutToken} />
  ) : (
    <PaymentForm
      onCaptureCheckout={onCaptureCheckout}
      shippingData={shippingData}
      checkoutToken={checkoutToken}
      backStep={backStep}
      nextStep={nextStep}
    />
  );

const Confirmation = ({ order, classes }) => {
  if (!order.customer) {
    return <CircularProgress />;
  }
  return (
    <>
      <div>
        <Typography variant="h5">
          Thank you for your purchase, firstName LastName
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref : ref</Typography>
      </div>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>
  );
};

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
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
                  backStep={backStep}
                  nextStep={nextStep}
                  onCaptureCheckout={onCaptureCheckout}
                  order={order}
                  error={error}
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
