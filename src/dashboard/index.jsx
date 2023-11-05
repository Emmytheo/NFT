// in src/Dashboard.js
import { useEffect } from "react";
// import './index.css';
// import classes from './index.css';
import {
  Box,
  Button,
  Stack,
  useMediaQuery
} from "@mui/material";
import {
  useAuthenticated,
  useDataProvider,
  useStore
} from "react-admin";
import { toTitleCase } from "../components/misc/breadCrumbs";

const Dashboard = (props) => {
  // const login = useLogin();
  useAuthenticated();
  const dataProvider = useDataProvider();
  // const authProvider = useAuthProvider();
  // const { identity, loading: identityLoading } = useGetIdentity();
  // const [user, setUser] = useState();
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [user, setUser] = useStore("user", null);
  const card = {
    type: "VISA",
    name: user ? user.fullname : null,
    number: "1234*************3284",
    state: "inactive",
    exp: "9/24",
  };
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState();
  // const { data, loading, error } = useQuery('users', () => dataProvider.getList('users', { pagination: true }).then((data) => {return data.data}));

  useEffect(() => {
    // client.authenticate().then(value => {
    //   setUser(value.user);
    // }).catch((error)=>{
    //   console.log(error.message)
    // })
  });

  // useEffect(() => {
  //   console.log(data);
  // },[data])
  return (
    <Stack width={"100%"} className="container article">
      <Stack className="card" direction={"row"} justifyContent={'space-between'} flexWrap={"wrap"} padding={4}>
        <Box>
          <h1 style={{ color: "#325197" }}>{toTitleCase(user.name)}</h1>
          <Stack style={{ marginTop: "15px" }} spacing={1} direction={"row"}>
            <h5>Role:</h5>
            <h5 style={{ color: "#325197" }}>{toTitleCase(user.role)}</h5>
          </Stack>
          <Stack style={{ marginTop: "20px" }} spacing={1} direction={"row"}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              sx={{ color: "white", paddingInline: "30px" }}
              // fullWidth
            >
              {"Edit Profile"}
            </Button>
          </Stack>
        </Box>
        <Box>
        <Stack style={{ marginTop: "20px" }} spacing={1} direction={"row"}>
            <h5>Active Customers:</h5>
            <h5>{ user ? (`${user.sex}`)  : ("None")}</h5>
          </Stack>
          <Stack style={{ marginTop: "20px" }} spacing={1} direction={"row"}>
            <h5>Total Balance:</h5>
            <h5>{ user ? (`${user.age}`)  : ("None")}</h5>
          </Stack>
          <Stack style={{ marginTop: "20px" }} spacing={1} direction={"row"}>
            <h5>Pending Withdrawals:</h5>
            <h5>{ user ? (`${user.blood_pres}`)  : ("None")}</h5>
          </Stack>
        </Box>
        <Box>
        <Stack style={{ marginTop: "20px" }} spacing={1} direction={"row"}>
            <h5>Blockchains:</h5>
            <h5>{ user ? (`${user.blood_grp}`)  : ("None")}</h5>
          </Stack>
          <Stack style={{ marginTop: "20px" }} spacing={1} direction={"row"}>
            <h5>Supported Currencies</h5>
            <h5>{ user ? (`${user.weight}`)  : ("None")}</h5>
          </Stack>
          <Stack style={{ marginTop: "20px" }} spacing={1} direction={"row"}>
            <h5>Total Deposits</h5>
            <h5>{ user ? (`${user.med_hist}`)  : ("None")}</h5>
          </Stack>
        </Box>
      </Stack>
      {/* { user 
      ? <h2 className="h2 article-title">Hi {user.name}</h2>
      : <h2 className="h2 article-title">Hi User</h2>
    } */}

      {/* <p className="article-subtitle">Welcome Back!</p> */}

      {/* <PinInput/> */}
      {/* <TabPanel/> */}
      {/* <Recents/> */}
      {/* <GiftCards/> */}
      {/* <Tickets/> */}
      {/* <Notificatione/> */}
    </Stack>
  );
};

export default Dashboard;
