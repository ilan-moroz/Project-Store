import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";
import { RegisterFormValues } from "../types/RegisterFormValues";
import {
  stepOneResolver,
  stepTwoResolver,
} from "../validators/registerValidator";
import { checkEmailId, registerUser } from "../api/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoginAction } from "../redux/userReducer";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { getCitiesData } from "../api/citiesApi";

export const Register = () => {
  const steps = ["User settings", "User information"];

  const [formData, setFormData] = React.useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    idNumber: 0,
    password: "",
    city: "",
    street: "",
  });

  const [cities, setCities] = React.useState([]);

  // get all cities names from gov api
  React.useEffect(() => {
    const fetchCitiesData = async () => {
      const data = await getCitiesData();
      setCities(data);
    };
    fetchCitiesData();
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: activeStep === 0 ? stepOneResolver : stepTwoResolver,
  });

  const firstStepSubmit = handleSubmit(async data => {
    try {
      const response = await checkEmailId(data.email, data.idNumber);
      if (response) handleNext();
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.error(err);
    }
  });

  const secondStepSubmit = handleSubmit(data => {
    setFormData(data);
    handleNext();
  });

  const onSubmit = async () => {
    try {
      const response = await registerUser(formData);
      if (response) {
        dispatch(setLoginAction(response.user, response.token));
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
                  register={register("confirmPassword")}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit">Next</Button>
                </Box>
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
                  type="select"
                  selectOptions={cities}
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
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button color="inherit" onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="submit">Finish</Button>
                </Box>
              </form>
            </div>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};
