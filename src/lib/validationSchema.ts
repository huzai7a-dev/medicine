import * as Yup from "yup";

// login

export const loginSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const loginInitialValues = {
  username: "",
  password: "",
};

//     ***

// SignUP

export const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  mobile_no: Yup.string().required("Mobile No is required"),
});

export const SignupInitialValues = {
  name: "",
  username: "",
  password: "",
  mobile_no: "",
  address: "",
  details: "",
};
