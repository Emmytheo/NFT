// in src/MyMenu.js
import { Menu, useStore, useSidebarState } from "react-admin";
import * as React from "react";
import { useState, useEffect } from "react";

import BookIcon from "@mui/icons-material/Book";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PeopleIcon from "@mui/icons-material/People";
import LabelIcon from "@mui/icons-material/Label";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import PasswordIcon from "@mui/icons-material/Password";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RouterIcon from "@mui/icons-material/Router";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ScoreIcon from "@mui/icons-material/Score";
import PaymentIcon from "@mui/icons-material/Payment";
import AddCardIcon from "@mui/icons-material/AddCard";
import SchoolIcon from "@mui/icons-material/School";
import BoltIcon from "@mui/icons-material/Bolt";
import {
  ChevronLeft,
  ChevronRight,
  TaskAlt,
  PendingActions,
  EventRepeat,
  Payments,
  AirplaneTicket,
  Event,
  Api,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Stack,
  useMediaQuery,
} from "@mui/material";
import SubMenu from "./SubMenu";

export const MyMenu = () => {
  const [user, setUser] = useStore("user");
  const [open, setOpen] = useSidebarState();
  return (
    <Menu>
      <Stack direction={"column"} width={"100%"} height={"150px"} padding={3} justifyContent={'center'} alignItems={'center'}>
        {open ? (
          user ? (
            <>
              <h2 style={{ color: "#325197" }}>Hi {user.name}</h2>
              <h5 style={{ marginTop: "7px", color: "#fff" }}>Welcome Back</h5>
            </>
          ) : (null)
        ) : null}
      </Stack>
      <Menu.DashboardItem />
      <Menu.Item to="/users" primaryText="All Users" leftIcon={<Api />} />
      {/* <Menu.Item to="/nft" primaryText="Collections" leftIcon={<Api />} /> */}
      <Menu.Item to="/sales" primaryText="Sales History" leftIcon={<Api />} />
      <Menu.Item to="/transaction" primaryText="Transactions History" leftIcon={<Api />} />
      <Menu.Item to="/blockchains" primaryText="Blockchains" leftIcon={<Api />} />
      <Menu.Item to="/wallet" primaryText="Wallets" leftIcon={<Api />} />
      {user && user.role === "admin" ? (
        <>
          
        </>
      ) : null}
    </Menu>
  );
};
