import {
  Admin,
  useStore,
  CustomRoutes,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import client from './client';
import { restClient, authClient } from 'ra-data-feathers';
import { MyLayout } from "./components/layout/MyLayout";
import MyLoginPage from "./components/auth/MyLoginPage";
import Dashboard from "./dashboard";
import SignUp from "./components/auth/MySignUpPage";
import ForgotPassword from "./components/auth/ForgotPassword";
import { Route } from "react-router";
import theme from "./theme/Theme";
import { TransactionList, SalesList, WalletList, DemoCreateTrans, DemoCreateSales, DemoCreate, BlockChainCreate , BlockchainList, UserList} from "./pages/transactions";
// import * as React from "react";
// import { useState, useEffect } from "react";


const restClientOptions = {
  id: '_id', // In this example, the database uses '_id' rather than 'id'
  usePatch: true // Use PATCH instead of PUT for updates
};

const authClientOptions = {
  usernameField: "email", // Our example database might use 'username' rather than 'email'
  permissionsField: 'role', // Use the 'userroles' field on the JWT as the users role
  redirectTo: '/login', // Our example login form might be at '/signin', redirect here if AUTH_CHECK fails
}

export const App = () => {
  const [user, setUser] = useStore("user");
  client.service("users").on("patched", (message) => {
    if (user && user.email === message.email) {
      console.log(message);
      setUser(message);
    }
  });
  return(
  <Admin
    theme={theme}
    title="Arteslux"
    dashboard={Dashboard}
    layout={MyLayout}
    loginPage={MyLoginPage}
    dataProvider={restClient(client, restClientOptions)}
    authProvider={authClient(client, authClientOptions)}
  >
    <Resource
      name="nft"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
      create={DemoCreate}

    />
    <Resource
      name="sales"
      list={SalesList}
      edit={EditGuesser}
      show={ShowGuesser}
      create={DemoCreateSales}
    />
    <Resource
      name="transaction"
      list={TransactionList}
      edit={EditGuesser}
      show={ShowGuesser}
      create={DemoCreateTrans}
    />
    <Resource
      name="wallet"
      list={WalletList}
      edit={EditGuesser}
      show={ShowGuesser}
      create={DemoCreate}
    />
    <Resource
      name="users"
      list={UserList}
      edit={EditGuesser}
      show={ShowGuesser}
      create={DemoCreate}
    />
     <Resource
      name="blockchains"
      list={BlockchainList}
      edit={EditGuesser}
      show={ShowGuesser}
      create={BlockChainCreate}
    />
    <CustomRoutes noLayout={true}>
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/splash" element={<Splash />} /> */}
      </CustomRoutes>
  </Admin>
)
};
