import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";
import { registerFormValues } from "../types/registerFormValues";
import { resolver } from "../validators/registerValidator";

export const Register = () => {
  const steps = ["User settings", "User information"];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const onSubmit = () => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormValues>({ resolver });

  const firstStepSubmit = handleSubmit(data => {
    console.log(data);
  });
  const secondStepSubmit = handleSubmit(data => {
    console.log(data);
  });

  return (
    <Box sx={{ width: "30%", margin: "2rem auto" }}>
      <Typography variant="h3" gutterBottom className="purpleText">
        Register
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map(label => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={onSubmit}>Create Account</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 0 && (
            <div className="firstStepInputs">
              <form onSubmit={firstStepSubmit}>
                <FormInput
                  register={register("idNumber")}
                  name="idNumber"
                  label="Id Number"
                  type="number"
                  error={!!errors.idNumber}
                  helperText={errors.idNumber?.message}
                />
                <FormInput
                  register={register("email")}
                  name="email"
                  label="Email"
                  type="text"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <FormInput
                  register={register("password")}
                  name="password"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.password?.message}
                />
              </form>
            </div>
          )}
          {activeStep === 1 && (
            <div className="secondStepInputs">
              <form onSubmit={secondStepSubmit}>
                <FormInput
                  register={register("city")}
                  name="city"
                  label="City"
                  type="string"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
                <FormInput
                  register={register("street")}
                  name="street"
                  label="Street"
                  type="text"
                  error={!!errors.street}
                  helperText={errors.street?.message}
                />
                <FormInput
                  register={register("firstName")}
                  name="firstName"
                  label="First Name"
                  type="string"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
                <FormInput
                  register={register("lastName")}
                  name="lastName"
                  label="Last Name"
                  type="string"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </form>
            </div>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
