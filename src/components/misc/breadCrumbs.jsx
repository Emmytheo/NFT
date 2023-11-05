import {
  NavigateNext
} from "@mui/icons-material";
import {
  Breadcrumbs,
  Stack,
  useMediaQuery
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Link
} from "react-admin";

export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

const BCTitle = ({ res }) => {
  if (!res) return null;
  return (
    <>
      <h2
        className="h2 article-title"
        style={{ marginBottom: "0px", marginInlineStart: "30px" }}
      >
        {toTitleCase(res)} /{" "}
      </h2>
    </>
  );
};
const BCSubTitle = ({ res, shw_pg, setMT }) => {
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [margin, setMargin] = useState("10px");
  const [fsize, setFsize] = useState("1rem");
  const [Bfsize, setBFsize] = useState("1.2rem");
  useEffect(() => {
    if (!isLarge) {
      setMargin("25px");
      setMT(5);
      setFsize("1rem");
      setBFsize("1.2rem");
    } else if (!isMedium) {
      setMargin("20px");
      setMT(2);
      setFsize("0.95rem");
      setBFsize("1.1rem");
    } else if (!isSmall) {
      setMargin("10px");
      setMT(1);
      setFsize("0.9rem");
      setBFsize("1rem");
    }
  }, []);

  if (!res) return null;
  const nw_res = [];
  res.forEach((element) => {
    nw_res.push(element);
    nw_res.push(">");
  });
  if (res.length <= 1 && !shw_pg) {
    nw_res.push("Transaction History");
  }
  return (
    <>
      {nw_res.map((pth, index) => {
        if (index === 0) {
          return (
            <p
              className="h2 article-subtitle"
              style={{
                marginBottom: "0px",
                marginInlineStart: margin,
                fontSize: Bfsize,
              }}
            >
              {toTitleCase(pth)}
            </p>
          );
        } else if (index === 1 && pth === ">") {
          return (
            <p
              className="h2 article-subtitle"
              style={{
                marginBottom: "0px",
                marginInlineStart: "10px",
                fontSize: Bfsize,
              }}
            >
              {toTitleCase(pth)}
            </p>
          );
        } else {
          return (
            <p
              className="h2 article-subtitle"
              style={{
                marginBottom: "0px",
                marginInlineStart: "10px",
                fontSize: fsize,
              }}
            >
              {toTitleCase(pth)}
            </p>
          );
        }
      })}
    </>
  );
};

const BC_main = ({ res, shw_pg, setMT }) => {
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [margin, setMargin] = useState("20px");
  const [fsize, setFsize] = useState("1rem");
  const [Bfsize, setBFsize] = useState("1.2rem");
  useEffect(() => {
    if (!isLarge) {
      setMargin("25px");
      setMT(5);
      setFsize("1rem");
      setBFsize("2.0rem");
    } else if (!isMedium) {
      setMargin("20px");
      setMT(3);
      setFsize("0.95rem");
      setBFsize("1.6rem");
    } else if (!isSmall) {
      setMargin("10px");
      setMT(2);
      setFsize("0.9rem");
      setBFsize("1.4rem");
    }
  }, [fsize, Bfsize]);

  if (!res) return null;
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link
        underline="hover"
        // color="#484F56 !important"
        href={`/${res}`}
        to={`/${res}`}
        className="h2 article-subtitle"
        sx={{
          marginBottom: "0px",
          marginInlineStart: margin,
          fontSize: Bfsize,
          color: "#484F56",
          fontWeight: "700"
        }}
      >
        {toTitleCase(res.toString())}
      </Link>
      {/* <p
        className="h2 article-subtitle"
        style={{
          marginBottom: "0px",
          fontSize: fsize,
        }}
      >
        {"Transaction History"}
      </p> */}
    </Breadcrumbs>
  );
};

export const BreadCrumbs = ({ resource, showpage }) => {
  const [margT, setMargT] = useState(3);
  return (
    <Stack
      marginTop={margT}
      marginBottom={0}
      direction="row"
      className="breadcrumbs"
      spacing={1}
      alignItems="center"
    >
      {/* <BCSubTitle res={resource} shw_pg={showpage} setMT={setMargT} /> */}
      <BC_main res={resource} shw_pg={showpage} setMT={setMargT} />
    </Stack>
  );
};
