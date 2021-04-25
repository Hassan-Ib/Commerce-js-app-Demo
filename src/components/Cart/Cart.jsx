import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";

const EmptyCart = () => (
  <Typography variant="subtitle1">
    You have no items in your shopping cart, start adding some!
  </Typography>
);

const FiledCart = ({ cart, classes }) => {
  return (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal : {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Chekout
          </Button>
        </div>
      </div>
    </>
  );
};
const Cart = ({ cart }) => {
  const classes = useStyles();
  if (!cart.line_items) return <p>loading</p>;
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? (
        <EmptyCart />
      ) : (
        <FiledCart cart={cart} classes={classes} />
      )}
    </Container>
  );
};

export default Cart;
