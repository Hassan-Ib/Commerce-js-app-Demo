import React, { useState } from "react";
import {
  InputLabel,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";
import { commerce } from "../../lib/commerce";
const AddressForm = ({ checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();
  // const options = shippingOptions.map((oS)=> ({ id : oS.id, label : `${oS.description} - (${oS.price.formatted_with_symbol})`}))
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(
      Object.entries(countries).map(([code, name]) => ({
        id: code,
        label: name,
      }))
    );
    setShippingCountry(Object.keys(countries)[0]);
  };

  React.useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
    // fetchSubdivisions()
  }, []);

  // subdivision
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    console.log({ subdivisions });
    setShippingSubdivisions(
      Object.entries(subdivisions).map(([code, name]) => ({
        id: code,
        label: name,
      }))
    );
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  React.useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  // options
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    console.log({ checkoutTokenId, country, region });

    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    console.log({ options });

    setShippingOptions(
      options.map((oS) => ({
        id: oS.id,
        label: `${oS.description} - (${oS.price.formatted_with_symbol})`,
      }))
    );
    setShippingOption(options[0].id);
  };

  React.useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);
  // console.log(shippingOptions);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address1" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="ZIP / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => {
                  setShippingCountry(e.target.value);
                }}
              >
                {shippingCountries.map(({ id, label }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdiv</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => {
                  setShippingSubdivision(e.target.value);
                }}
              >
                {shippingSubdivisions.map(({ id, label }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => {
                  setShippingOption(e.target.value);
                }}
              >
                {shippingOptions.map(({ id, label }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
