import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import bg from "../../dashboard/images/bg.jpg";

import {
  Button,
  Card,
  CardActions,
  CircularProgress,
  Stack,
  useMediaQuery
} from "@mui/material";
import {
  Form,
  PasswordInput,
  TextInput,
  required,
  useLogin,
  useNotify,
  useRedirect,
  useStore,
  useTranslate,
} from "react-admin";

import Box from "@mui/material/Box";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const translate = useTranslate();
  const [user, setUser] = useStore("user", null);
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const notify = useNotify();
  const redirect = useRedirect();
  const login = useLogin();
  const location = useLocation();

  const handleSubmit = (auth) => {
    setLoading(true);
    login(auth, location.state ? location.state.nextPathname : "/")
      .then((res) => {
        setUser(res.user);
        redirect("/");
      })
      .catch((error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
            ? "ra.auth.sign_in_error"
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
              maxWidth: 500,
              marginTop: "6em",
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
                <h2 style={{ color: "#325197" }}>Arteslux Admin</h2>
                <h5> Login to Your Arteslux Admin Portal</h5>
              </div>
              {/* <Avatar sx={{ bgcolor: "info.main" }}>K</Avatar>
            <p style={{ marginLeft: "5px" }} className="card-title">
              KUGATEL
            </p> */}
            </Box>
            <Box
              sx={{
                fontSize: 12,
                marginTop: "1em",
                margin: "2em",
                padding: "1em",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                //   color: (theme) => theme.palette.grey[500],
                color: "#325197",
                background: "#F6F9FF",
                border: "1px solid BAC9EA",
              }}
            >
              Note : Only Administrative Accounts work here. If your not an admin and please use the normal Site URL.
            </Box>
            <Box sx={{ padding: "0 1em 1em 1em" }}>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  autoFocus
                  source="username"
                  label={"Enter Your Name or Email"}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginTop: "1em" }}>
                <PasswordInput
                  source="password"
                  label={"Your Password"}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                //   helperText="Note: Passwords are case sensitive."
                />
              </Box>
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              paddingY={1}
              marginTop={0}
              justifyContent="flex-end"
            >
              {/* <Button
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
              </Button> */}
            </Stack>
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
                              sx={{color: 'white', paddingInline: "30px"}}
                // fullWidth
              >
                {loading && <CircularProgress size={25} thickness={2} />}
                {"Proceed"}
              </Button>
            </CardActions>
            <Stack
              paddingX={1}
              justifyContent="center"
              alignItems="center"
              fontSize={14}
            >
              <span>Don't have an Account?</span>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <span>Click</span>
                <Button
                  onClick={() => {
                    redirect("/register");
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
                  here
                </Button>
                <span>to Sign Up.</span>
              </Stack>
            </Stack>
          </Card>
        </Box>
        {!isLarge? (
          <Box
            sx={{
              //   display: "flex",
              minWidth: 650,
              maxWidth: 550,
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

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default Login;
