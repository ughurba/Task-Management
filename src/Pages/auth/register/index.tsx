import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Field, useFormik } from "formik";
import { Checkbox, FormControlLabel } from "@mui/material";
import { postRegister } from "../../../Services/account";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      surname: "",
      name: "",
      companyName: "",
      isCreateCompany: false,
      companySecretCode: "",
    },
    onSubmit: async (values) => {
      const data = await postRegister(values);
    },
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>

      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Grid container spacing={3}>
          <Grid item md={6}>
            <TextField
              fullWidth
              name="email"
              label="email"
              id="email"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              name="name"
              label="name"
              id="name"
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              name="surname"
              label="surname"
              id="surname"
              onChange={formik.handleChange}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              id="password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="password"
            />
          </Grid>
          <Grid item md={10}>
            <FormControlLabel
              control={<Checkbox checked={formik.values.isCreateCompany} />}
              label="men leader kimi qeydiyatdan kecib wirket sahibi olacam"
              name="isCreateCompany"
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              disabled={!formik.values.isCreateCompany}
              name="companyName"
              label="companyName"
              id="companyName"
              onChange={formik.handleChange}
              error={
                formik.touched.companyName && Boolean(formik.errors.companyName)
              }
              helperText={
                formik.touched.companyName && formik.errors.companyName
              }
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              disabled={!formik.values.isCreateCompany}
              fullWidth
              name="companySecretCode"
              label="companySecretCode"
              id="companySecretCode"
              onChange={formik.handleChange}
              error={
                formik.touched.companySecretCode &&
                Boolean(formik.errors.companySecretCode)
              }
              helperText={
                formik.touched.companySecretCode &&
                formik.errors.companySecretCode
              }
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </form>
    </Box>
  );
};
export default Register;
