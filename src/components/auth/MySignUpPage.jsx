import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CircularProgress,
  Stack,
  useMediaQuery
} from "@mui/material";
import Box from "@mui/material/Box";
import {
  Form,
  PasswordInput,
  TextInput,
  required,
  useLogin,
  useNotify,
  useRedirect,
  useStore,
  useTranslate
} from "react-admin";
import client from "../../client";
import bg from "../../dashboard/images/bg.jpg";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const translate = useTranslate();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [user, setUser] = useStore("user");
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const redirect = useRedirect();
  const notify = useNotify();
  const login = useLogin();
  const location = useLocation();

  const handleSubmit = (auth) => {
    setLoading(true);
    client
      .service("users")
      .create({
        ...auth,
        role: "admin",
        // package: "admin",
        // currency: "NGN",
        name: `${auth.fullname.split(' ')[0]}`,
        emailVerified: false,
        userVerified: false,
        wallet_id: null,
      })
      .then((usr) => {
        setUser(usr);
        notify("User Account Created", { type: "success" });
        redirect("/login");
      })
      .catch((error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
            ? "Sign Up Error"
            : error.message,
          {
            type: "warning",
            messageArgs: {
              _:
                typeof error === "string"
                  ? error
                  : error && error.message
                  ? error.message
                  : undefined,
            },
          }
        );
      });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Stack direction="row" alignItems="center" justifyContent={"center"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "flex-start",
            background: `${
              isSmall || isMedium
                ? `url(${bg})`
                : "#fff"
            }`,
            // background: 'linear-gradient(-45deg, #610212, #E0455F)',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Card
            sx={{
              minWidth: 350,
              // maxWidth: 500,
              marginTop: "7em",
              padding: "20px 10px",
            }}
          >
            <Box
              sx={{
                margin: "1em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ margin: "1em", textAlign: "center" }}>
                <h2 style={{ color: "#325197" }}>Create a profile</h2>
                <h5> Create your admin profile</h5>
              </div>
            </Box>
            <Box
              sx={{
                padding: "0 1em 1em 1em",
                marginY: "3em",
              }}
            >
              <Box  sx={{marginTop: "1em"}}>
                <TextInput
                  autoFocus
                  source="fullname"
                  type="text"
                  label={"Full Name"}
                  helperText={'Enter your fullname'}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                              />
                              <TextInput
                  autoFocus
                  source="email"
                  type="text"
                  label={"Email"}
                  helperText={'Enter your Email'}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                />
              </Box>
              {/* <Box sx={{marginTop: "1em"}}>
                <TextInput
                  autoFocus
                  source="address"
                  label={"Address"}
                  helperText={'Enter Your Address'}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                />
              </Box> */}
              <Box sx={{marginTop: "1em"}}>
                {/* <TextInput
                  source="phone"
                  label={"Phone"}
                  helperText={'Enter your phone number'}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                  //   helperText="Note: Passwords are case sensitive."
                /> */}
                          </Box>
                          <Box sx={{marginTop: "1em"}}>
                <PasswordInput
                  source="password"
                  label={"password"}
                  helperText={'Your Password'}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                  //   helperText="Note: Passwords are case sensitive."
                />
              </Box>
            </Box>
            {/* <Stack
              direction="row"
              alignItems="center"
              paddingY={0}
              marginTop={0}
              justifyContent="flex-end"
            >
              <Button
                onClick={() => {
                  redirect("/forgot-password");
                }}
                variant="text"
                color="primary"
                style={{
                  minWidth: "max-content",
                  padding: "0px",
                  marginInline: "5px",
                  textTransform: "none",
                  fontSize: "12px",
                }}
              >
                Forgot Password?
              </Button>
            </Stack> */}
            <CardActions
              sx={{
                padding: "0 1em 1em 1em",
                maxWidth: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={loading}
                sx={{ color: "white", paddingInline: "40px" }}
                // fullWidth
              >
                {loading && <CircularProgress size={25} thickness={2} />}
                {"Create Profile"}
              </Button>
            </CardActions>
            <Stack
              paddingX={1}
              justifyContent="center"
              alignItems="center"
              fontSize={14}
            >
              <span>Already have an Account?</span>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  onClick={() => {
                    redirect("/login");
                  }}
                  variant="text"
                  color="primary"
                  style={{
                    minWidth: "max-content",
                    padding: "0px",
                    marginInline: "5px",
                    textTransform: "none",
                  }}
                >
                  Login
                </Button>
                <span>instead.</span>
              </Stack>
            </Stack>
          </Card>
        </Box>
        {!isLarge ? (
          <Box
            sx={{
              //   display: "flex",
              // minWidth: 550,
              // maxWidth: 550,
              flexDirection: "column",
              minHeight: "100vh",
              alignItems: "center",
              justifyContent: "flex-start",
              background: `${
                !isLarge
                  ? `url(${bg})`
                  : "#fff"
              }`,
              // background: 'linear-gradient(-45deg, #610212, #E0455F)',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></Box>
        ) : null}
      </Stack>
    </Form>
  );
};

SignUp.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default SignUp;
