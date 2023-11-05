/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import * as React from "react";
import {
  useMediaQuery,
  Box,
  // LongTextInput,
  Chip,
  Button,
  Typography,
  CardActions,
  Stack,
  Card,
  Avatar,
} from "@mui/material";
import {
  WrapperField,
  FunctionField,
  TopToolbar,
  Toolbar,
  FilterButton,
  CreateButton,
  ExportButton,
  // Button,
  ListButton,
  ShowButton,
  Datagrid,
  EmailField,
  List,
  ReferenceField,
  TextField,
  TextInput,
  SimpleList,
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  Create,
  Show,
  SimpleShowLayout,
  EditButton,
  NumberInput,
  NumberField,
  DateField,
  DeleteButton,
  useListContext,
  SaveButton,
  useNotify,
  useRedirect,
  FormDataConsumer,
  useStore,
  FilterForm,
  TabbedShowLayout,
  // TabbedEditLayout,
  Tab,
  useResourceContext,
  useRecordContext,
  useRefresh,
  FormTab,
  TabbedForm,
  useDataProvider,
  SavedQueriesList,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
  DateTimeInput,
  ArrayInput,
  ImageInput,
  ImageField,
  BooleanInput,
  SimpleFormIterator,
  AutocompleteArrayInput,
  AutocompleteInput,
  ReferenceArrayInput,
  TabbedFormTabs,
  useEditContext,
  useGetRecordId,
  useShowContext,
  SelectArrayInput,
  useCreatePath,
  Confirm,
  useNotifyIsFormInvalid,
  useGetOne,
  SearchInput,
  WithListContext,
} from "react-admin";
import { TypeAnimation } from "react-type-animation";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback, createRef } from "react";
import {
  Person,
  AccountBalanceWalletOutlined,
  LinkOutlined,
  ChevronLeft,
  TaskAlt,
  PendingActions,
  EventRepeat,
  Payments,
  Payment,
  AddCard,
  VerifiedUser,
  WifiCalling3,
  PhoneInTalk,
  ReceiptLong,
  Router,
  School,
  Bolt,
  Notifications,
  FileUploadOutlined,
  FileDownloadOutlined,
  CheckCircleRounded,
  Category,
  CalendarMonth,
  AccessTime,
  LocationOn,
  CheckCircleOutlineRounded,
  EventSeat,
  Visibility,
  QrCodeScanner,
  ChevronRight,
} from "@mui/icons-material";
import { BreadCrumbs, toTitleCase } from "../components/misc/breadCrumbs";
import client from "../client";

const ListActions = () => {
  const { data, resource } = useListContext();
  // const notify = useNotify();
  // const redirect = useRedirect();
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // const [user, setUser] = useStore("user");
  // const createPath = useCreatePath();

  return (
    <>
      <Stack width={"100%"}>
        <BreadCrumbs resource={[resource]} showpage={false} />

        <TopToolbar
          sx={{ justifyContent: "space-between", marginInline: "15px" }}
        >
          <FilterForm
            filters={(() => {
              switch (resource.toLowerCase()) {
                case "users":
                  return postFilters;
                case "sales":
                  return salesFilters;
                case "transaction":
                  return transFilters;
                case "blockchains":
                  return bchainFilters;
                case "wallet":
                  return walletFilters;
                default:
                  return postFilters;
              }
            })()}
          />
          {/* Add your custom actions */}
          <>
            {isSmall ? (
              <Stack
                direction="row"
                spacing={2}
                style={{ marginBottom: "10px" }}
              >
                <FilterButton filters={postFilters} />
                <CreateButton variant="contained" label="Add" />
              </Stack>
            ) : isMedium ? (
              <Stack
                direction="row"
                spacing={2}
                style={{ marginBottom: "10px" }}
              >
                <FilterButton variant="contained" filters={postFilters} />
                <CreateButton variant="contained" label="Add" />
              </Stack>
            ) : (
              <Stack
                direction="row"
                spacing={2}
                style={{ marginBottom: "10px" }}
              >
                <FilterButton filters={postFilters} />
                <CreateButton
                  variant="contained"
                  sx={{ padding: "4px 40px", fontSize: "15px" }}
                  label="Add"
                />
              </Stack>
            )}
          </>
        </TopToolbar>
        <br />
        {/* <div
          className="divider card-divider"
          style={{ marginInline: "10px", margin: "15px" }}
        /> */}
      </Stack>
    </>
  );
};

const TransactionSaveButton = (props) => {
  const {
    paym,
    evnt,
    evntTcktData,
    val,
    countDown,
    tim,
    setTim,
    setCd,
    vl,
    setVl,
    setVal,
    btnRef,
    amt,
    setAmt,
    refs,
    setRefs,
    chrg,
    frmDt,
    charge,
  } = props;

  const [user, setUser] = useStore("user");
  const rldBtnRef = useRef(null);
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();
  useEffect(() => {
    // console.log(chrg);
  }, [chrg]);
  const transformTransaction = (data) => ({
    ...data,
    ticket_data: evntTcktData,
    event_id: data.event,
    event: evnt.name,
    event_data: evnt,
    payment: { ...refs, charges_info: { ...charge } },
    active: true,
    seat_capacity: parseInt(evnt.seat_capacity),
  });

  useEffect(() => {
    let btn = document.getElementsByClassName("sav")[0];
    let rldBtn = document.getElementsByClassName("skip-nav-button")[0];
    rldBtnRef.current = rldBtn;
    if (countDown === true) {
      let intv;
      if (tim >= 1) {
        intv = setInterval(() => {
          setTim(tim - 1);
        }, 1000);
        return () => {
          clearInterval(intv);
        };
      } else {
        clearInterval(intv);
        setCd(!countDown);
        setTim(null);
        btnRef.current.disabled = true;
        btnRef.current.invalid = true;
        btn.click();
      }
    } else {
    }
  }, [
    countDown,
    setTim,
    tim,
    btnRef,
    setVal,
    val,
    vl,
    setVl,
    setCd,
    dataProvider,
    refs,
    frmDt,
    notify,
    redirect,
  ]);
  return (
    <SaveButton
      icon={<Payment />}
      type="button"
      className="sav"
      disabled={val}
      label={tim ? `Please Wait (${tim})` : "Complete Transaction"}
      onClick={() => {
        notify(`Processing Transaction...`);
        redirect("/tickets");
      }}
      transform={transformTransaction}
      {...props}
      mutationOptions={{
        onError: (error) => {
          notify(error.message, { type: "error" });
          redirect("/tickets");
        },
        onSuccess: (response) => {
          refresh();
          notify(`Transaction successfully delivered!`, { type: "success" });
          redirect("/tickets");
          // if(user && amt){
          //     let nw_bal = (parseInt(user.personalWalletBalance) + parseInt(amt)).toString();
          //     dataProvider.update('users', {id: user._id, data: {
          //         personalWalletBalance: nw_bal
          //     }})
          //     .then((resp) => setUser(resp.data))
          // }
          setRefs(null);
          setAmt(null);
          rldBtnRef.current.click();
        },
      }}
    />
  );
};

const TransactionCreateToolbar = ({
  pay,
  evnt,
  evntTcktData,
  frmData,
  vl,
  valid,
  validate,
  setVl,
  amt,
  setAmt,
  chrg,
  frmDt,
  tabNames,
  resource,
  charge,
  setCharge,
}) => {
  const [cdown, setCdown] = useState(false);
  const [timer, setTimer] = useState(0);
  const [refs, setRefs] = useState(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  const [nextPg, setNextPg] = useState(null);

  useEffect(() => {
    if (tabNames) {
      let curr_t_name = {};
      tabNames.forEach((t_name, i) => {
        if (
          t_name.split("/")[t_name.split("/").length - 1] ===
          location.pathname.split("/")[location.pathname.split("/").length - 1]
        ) {
          curr_t_name = {
            nme: t_name,
            id: i,
          };
        } else if (
          location.pathname.split("/")[
            location.pathname.split("/").length - 1
          ] === "create"
        ) {
          curr_t_name = {
            nme: "/",
            id: 0,
          };
        }
      });
      if (curr_t_name.id < tabNames.length - 1) {
        let c_n = curr_t_name.id + 1;
        setNextPg(tabNames[c_n]);
      } else {
        setNextPg(null);
      }
    }
  }, [location, tabNames, resource]);

  return (
    <Toolbar style={{ justifyContent: "space-between" }}>
      <ChoosePaymentButton
        paym={pay}
        frmData={frmData}
        val={valid}
        countDown={cdown}
        setCd={setCdown}
        setVal={validate}
        vl={vl}
        setVl={setVl}
        tim={timer}
        setTim={setTimer}
        btnRef={buttonRef}
        amt={amt}
        setAmt={setAmt}
        refs={refs}
        setRefs={setRefs}
        nextPg={nextPg}
        resource={resource}
        charge={charge}
        setCharge={setCharge}
      />
      <TransactionSaveButton
        paym={pay}
        evnt={evnt}
        evntTcktData={evntTcktData}
        val={valid}
        setVal={validate}
        countDown={cdown}
        setCd={setCdown}
        tim={timer}
        setTim={setTimer}
        vl={vl}
        setVl={setVl}
        btnRef={buttonRef}
        amt={amt}
        setAmt={setAmt}
        refs={refs}
        setRefs={setRefs}
        chrg={chrg}
        frmDt={frmDt}
      />
    </Toolbar>
  );
};

const ChoosePaymentButton = ({
  paym,
  frmData,
  val,
  countDown,
  setCd,
  setVal,
  vl,
  setVl,
  tim,
  setTim,
  btnRef,
  amt,
  setAmt,
  refs,
  setRefs,
  nextPg,
  resource,
  charge,
  setCharge,
}) => {
  const redirect = useRedirect();
  const createPath = useCreatePath();
  const notify = useNotify();
  const notifyFormInvalid = useNotifyIsFormInvalid();
  const [open, setOpen] = useState(false); // Controls modal
  // const handleFlutterPayment = useFlutterwave(paym.current);
  const [formVal, setFormVal] = useState(false);

  useEffect(() => {
    if (charge) {
      console.log(charge);
    }
  }, [charge]);

  const handleConfirm = () => {
    //   handleFlutterPayment({
    //     callback: (response) => {
    //       if (response.status === "successful") {
    //         setVal(!val);
    //         setCd(!countDown);
    //         //UPDATE FROM DATA TO INCLUDE TRANSACTION ID AND STATUS
    //         setRefs(response);
    //         setOpen(false);
    //       } else {
    //         notify("Transaction " + response.status, { type: "error" });
    //         setVal(!val);
    //         setCd(!countDown);
    //         setRefs(response);
    //         setOpen(false);
    //       }
    //       closePaymentModal(); // this will close the modal programmatically
    //     },
    //     onClose: () => {},
    //   });
  };

  return (
    <>
      <Button
        variant="contained"
        ref={btnRef}
        color="primary"
        aria-label="create"
        disabled={formVal}
        onClick={() => {
          if (nextPg) {
            redirect(
              createPath({
                resource: resource,
                type: "create",
              }) + nextPg
            );
          } else {
            setOpen(true);
          }
        }}
      >
        {nextPg ? "Proceed" : "Pay"}
        <ChevronRight style={{ marginLeft: "4px" }} />
      </Button>

      <Confirm
        isOpen={open}
        title={"Confirm Transaction Purchase"}
        content={`You are about purchase ${
          frmData && frmData.ticket_list ? frmData.ticket_list.length : 0
        } ticket(s) worth ₦‎ ${
          amt ? amt : 0
        }, Kindly confirm this transaction.`}
        onConfirm={handleConfirm}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

const AsideShow = () => {
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const [evnt, setEvnt] = useState({});
  const [tck, setTck] = useState(null);
  const [event_data, setEventdata] = useState(null);

  useEffect(() => {
    if (event_data && record) {
      event_data.tickets.types
        .filter((t) => {
          return (
            t.ticket_type.toLowerCase() === record.ticket_type.toLowerCase()
          );
        })
        .forEach((tckt) => {
          let tckDt = evnt;
          tckDt[tckt.ticket_type.toLowerCase()] = {
            ...tckt,
            benefits: event_data.tickets.benefits.filter((benefit) => {
              return (
                benefit.ticket_type === tckt.ticket_type ||
                benefit.ticket_type === "All"
              );
            }),
          };
          setEvnt(tckDt);
        });
    }
  }, [event_data, record]);
  useEffect(() => {
    if (evnt && record && event_data && evnt[record.ticket_type]) {
      setTck(evnt[record.ticket_type]);
    }
  }, [evnt, record, event_data]);
  useEffect(() => {
    if (record && record.event_id) {
      dataProvider
        .getOne("events-list", { id: record.event_id })
        .then((res) => {
          setEventdata(res.data);
        });
      // console.log(record.event_id)
    }
  }, [record]);
  const redirect = useRedirect();
  const tickets = [
    {
      name: "OSCAFEST",
      price: "₦‎ 2000",
      state: "on sale",
      type: "Regular",
    },
    {
      name: "DATAFEST",
      price: "₦‎ 5000",
      state: "on sale",
      type: "VIP",
    },
  ];
  const ticketBenefits = [
    {
      name: "SMFEST",
      price: "7000",
      state: "on sale",
      type: "Single",
    },
    {
      name: "OSCAFEST",
      price: "5000",
      state: "on sale",
      type: "Single",
    },
    {
      name: "DATAFEST",
      price: "2000",
      state: "on sale",
      type: "Single",
    },
    {
      name: "SMFEST",
      price: "7000",
      state: "on sale",
      type: "Single",
    },
    {
      name: "OSCAFEST",
      price: "5000",
      state: "on sale",
      type: "Single",
    },
    {
      name: "DATAFEST",
      price: "2000",
      state: "on sale",
      type: "Single",
    },
    {
      name: "SMFEST",
      price: "7000",
      state: "on sale",
      type: "Single",
    },
  ];

  return (
    <>
      {isLarge ? null : (
        <Stack
          minWidth={"350px"}
          spacing={1}
          position={"sticky"}
          top={"5px"}
          sx={{ order: 1, mr: 2, mt: 6, width: "320px" }}
        >
          <Stack paddingX="3px" marginY={2}>
            <Stack
              className="card"
              height="450px"
              marginBottom={2}
              marginX={0}
              style={{
                background: "linear-gradient(-45deg, #610212, #E0455F)",
              }}
              sx={{
                "& h3, svg": {
                  color: "#fff",
                },
                "& button": {
                  background: "#fff",
                  color: "#000",
                },
              }}
            >
              <Stack>
                <Stack
                  marginBottom={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {/* <p style={{fontSize: '12px'}} className="card-subtitle">Canzona Transaction</p> */}
                  <h3 style={{ fontSize: "17px" }} className="card-title">
                    {tck && tck.ticket_type ? `${tck.ticket_type} ` : "Type"}
                  </h3>
                </Stack>
                <Stack
                  marginBottom={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <h3 style={{ fontSize: "40px" }} className="card-title">
                    {tck && tck.ticket_price
                      ? `₦‎ ${tck.ticket_price} `
                      : "₦‎ 0"}
                  </h3>
                </Stack>
                {
                  tck && tck.benefits && tck.benefits.length !== 0
                    ? tck.benefits.map((ticket) => {
                        return (
                          <Stack
                            alignItems={"center"}
                            direction={"row"}
                            spacing={2}
                            margin="8px 10px"
                          >
                            <CheckCircleRounded fontSize="medium" />
                            <h3
                              className="article-subtitle"
                              style={{ fontSize: "15px", marginBottom: "0px" }}
                            >
                              {ticket.benefit}
                            </h3>
                          </Stack>
                        );
                      })
                    : null
                  // [<p>No GiftCards Available</p>]
                }
                <Stack
                  direction="row"
                  width={"85%"}
                  position={"absolute"}
                  bottom="15px"
                  spacing={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {/* <Button 
                                                      color='primary'
                                                      variant='contained'
                                                      sx={{
                                                          background: 'linear-gradient(-45deg, #610212, #E0455F)',
                                                          // color: 'rgba(0, 0, 0, 0.6)'
                                                      }}
                                                      // onClick={}
                                                      fullWidth
                                                  >Buy Now</Button> */}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {/* {
                      quickLinks.map(item => {
                          return(
                              <Stack direction="row" 
                                  justifyContent={'space-between'} 
                                  color={'white'} 
                                  style={{background: 'linear-gradient(45deg, #610212, #E0455F)', cursor: 'pointer'}} 
                                  paddingY='10px' 
                                  marginX='30px !important' 
                                  className='card'
                                  onClick = {()=>{
                                      redirect(`/data/create/${item.to}`);
                                  }}
                              
                              >
                                  <p>{item.title}</p>
                                  {item.icon}
                              </Stack>
                          )
                      })
                  } */}
          {/* <CreateButton icon={<AddCard />} label='BUY'/> */}
        </Stack>
      )}
    </>
  );
};

const AsideCreate = (props) => {
  const { tickData, ticketTypes, formData, total, setTotal, discs } = props;
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const quickLinks = [
    { title: "Buy for Self", icon: <VerifiedUser />, to: "me" },
    { title: "Buy for Others", icon: <VerifiedUser />, to: "others" },
    // {title: "Schedule for Self", icon: <VerifiedUser />, to: 'me' },
    // {title: "Schedule for Others", icon: <VerifiedUser />, to: 'others' },
  ];
  // useEffect(() => {
  //   if (formData && formData.ticket_list) {
  //     console.log(formData.ticket_list.length);
  //   }
  // }, [formData]);

  useEffect(() => {
    if (formData && formData.ticket_list && ticketTypes.length > 0) {
      let _tot = 0;
      ticketTypes.map((element) => {
        let evnt = formData.ticket_list.filter((ele) => {
          return ele.ticket_type === element.id;
        });
        let init_amt = parseInt(tickData[element.id].ticket_price);
        let fin_amt = 0;
        let percnt = 0;
        if (discs) {
          discs
            .filter((t) => {
              return (
                t && t.ticket_type.toLowerCase() === element.id.toLowerCase()
              );
            })
            .forEach((u) => {
              if (u && u.percentage) {
                percnt = percnt + u.percentage;
              }
            });
        }
        fin_amt = init_amt - (percnt / 100) * init_amt;
        _tot += evnt.length * parseInt(fin_amt);
        setTotal(_tot);
        return {
          total: evnt.length * parseInt(fin_amt),
        };
      });
    }
  }, [discs, formData, setTotal, tickData, ticketTypes]);

  const redirect = useRedirect();

  return (
    <>
      {isLarge ? null : (
        <Stack
          minWidth={"350px"}
          spacing={1}
          position={"sticky"}
          top={"5px"}
          sx={{ order: 1, mr: 2, mt: 6, width: "320px" }}
        >
          {formData && formData.ticket_list && ticketTypes.length > 0 ? (
            <Stack paddingX="3px" position={"sticky"} top={"25px"} marginY={2}>
              <h3
                style={{ fontSize: "20px", marginBottom: "10px" }}
                className="card-title"
              >
                Summary
              </h3>
              {ticketTypes
                .map((element) => {
                  let evnt = formData.ticket_list.filter((ele) => {
                    return ele.ticket_type === element.id;
                  });
                  let init_amt = parseInt(tickData[element.id].ticket_price);
                  let fin_amt = 0;
                  let percnt = 0;
                  if (discs) {
                    discs
                      .filter((t) => {
                        return (
                          t &&
                          t.ticket_type.toLowerCase() ===
                            element.id.toLowerCase()
                        );
                      })
                      .forEach((u) => {
                        if (u && u.percentage) {
                          percnt = percnt + u.percentage;
                        }
                      });
                  }
                  fin_amt = init_amt - (percnt / 100) * init_amt;
                  return {
                    name: element.name,
                    id: element.id,
                    ticket_data: tickData[element.id],
                    init_amt: init_amt,
                    fin_amt: fin_amt,
                    tot_percnt: percnt,
                    units: evnt.length,
                    deduction: "",
                    total: evnt.length * parseInt(fin_amt),
                  };
                })
                .map((typ) => {
                  if (typ.units <= 0) {
                    return null;
                  } else {
                    return (
                      <Stack
                        className="card"
                        marginBottom={2}
                        marginX={0}
                        style={{
                          background:
                            "linear-gradient(-45deg, #610212, #E0455F)",
                        }}
                        sx={{
                          "& h3, svg": {
                            color: "#fff",
                          },
                          "& button": {
                            background: "#fff",
                            color: "#000",
                          },
                        }}
                      >
                        <Stack>
                          <Stack
                            marginBottom={1}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <h3
                              style={{ fontSize: "17px" }}
                              className="card-title"
                            >
                              {typ.ticket_data.ticket_type}
                            </h3>
                          </Stack>
                          <Stack
                            marginBottom={1}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <h3
                              style={{ fontSize: "40px" }}
                              className="card-title"
                            >
                              {`₦‎ `}
                              {parseInt(typ.fin_amt)}
                            </h3>
                          </Stack>
                          <Stack
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            direction={"row"}
                            spacing={2}
                            margin="8px 10px"
                          >
                            <h3
                              className="article-subtitle"
                              style={{
                                fontSize: "15px",
                                marginBottom: "0px",
                              }}
                            >
                              {typ.units}
                              {" Units"}
                            </h3>
                            <h3
                              className="article-subtitle"
                              style={{
                                fontSize: "15px",
                                marginBottom: "0px",
                              }}
                            >
                              {parseInt(typ.total)}
                            </h3>
                          </Stack>
                        </Stack>
                      </Stack>
                    );
                  }
                })}
              <Stack
                alignItems={"center"}
                justifyContent={"space-between"}
                direction={"row"}
                spacing={2}
                margin="8px 10px"
              >
                <h3
                  className="card-title"
                  style={{
                    fontSize: "20px",
                    marginBottom: "0px",
                  }}
                >
                  {"Total"}
                </h3>
                <h3
                  className="card-title"
                  style={{
                    fontSize: "25px",
                    marginBottom: "0px",
                  }}
                >
                  {`₦‎ `}
                  {parseInt(total)}
                </h3>
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      )}
    </>
  );
};

const postFilters = [
  <SelectInput
    alwaysOn
    source="role"
    choices={[
      { id: "admin", name: "Admin" },
      { id: "user", name: "User" },
    ]}
    sx={{
      background: "#ffffff",
      boxShadow: "3px 3px 6px #c9c9c9, -3px -3px 6px #ffffff",
      borderRadius: "18px",
      // color: '#ffffff',
      "& .MuiInputBase-root, .MuiOutlinedInput-notchedOutline, .notranslate": {
        border: "none",
        outline: "none",
        // color: '#ffffff',
        // maxWidth: '250px'
        // minWidth: "90px",
      },
    }}
  />,
  <TextInput source="phone" />,
];

const salesFilters = [
  <SelectInput
    alwaysOn
    label='Type'
    source="transaction_type"
    choices={[
      { id: "buy", name: "Buy" },
      { id: "sell", name: "Sell" },
    ]}
    sx={{
      background: "#ffffff",
      boxShadow: "3px 3px 6px #c9c9c9, -3px -3px 6px #ffffff",
      borderRadius: "18px",
      // color: '#ffffff',
      "& .MuiInputBase-root, .MuiOutlinedInput-notchedOutline, .notranslate": {
        border: "none",
        outline: "none",
        // color: '#ffffff',
        // maxWidth: '250px'
        // minWidth: "90px",
      },
    }}
  />,
  <TextInput source="phone" />,
];

const transFilters = [
  <SelectInput
    alwaysOn
    source="transaction_type"
    label='Type'
    choices={[
      { id: "deposit", name: "Deposit" },
      { id: "withdrawal", name: "Withdrawal" },
    ]}
    sx={{
      background: "#ffffff",
      boxShadow: "3px 3px 6px #c9c9c9, -3px -3px 6px #ffffff",
      borderRadius: "18px",
      // color: '#ffffff',
      "& .MuiInputBase-root, .MuiOutlinedInput-notchedOutline, .notranslate": {
        border: "none",
        outline: "none",
        // color: '#ffffff',
        // maxWidth: '250px'
        // minWidth: "90px",
      },
    }}
  />,
  <TextInput source="phone" />,
];

const bchainFilters = [
  <SelectInput
    alwaysOn
    label='Chains'
    source="blockchain"
    choices={[{ id: "ethereum", name: "ETH" }]}
    sx={{
      background: "#ffffff",
      boxShadow: "3px 3px 6px #c9c9c9, -3px -3px 6px #ffffff",
      borderRadius: "18px",
      // color: '#ffffff',
      "& .MuiInputBase-root, .MuiOutlinedInput-notchedOutline, .notranslate": {
        border: "none",
        outline: "none",
        // color: '#ffffff',
        // maxWidth: '250px'
        // minWidth: "90px",
      },
    }}
  />,
  <TextInput source="phone" />,
];

const walletFilters = [
  <SelectInput
    alwaysOn
    label='Active'
    source="virtAcc.active"
    choices={[
      { id: "admin", name: "Admin" },
      { id: "user", name: "User" },
    ]}
    sx={{
      background: "#ffffff",
      boxShadow: "3px 3px 6px #c9c9c9, -3px -3px 6px #ffffff",
      borderRadius: "18px",
      // color: '#ffffff',
      "& .MuiInputBase-root, .MuiOutlinedInput-notchedOutline, .notranslate": {
        border: "none",
        outline: "none",
        // color: '#ffffff',
        // maxWidth: '250px'
        // minWidth: "90px",
      },
    }}
  />,
  <TextInput source="phone" />,
];

const cardActionStyle = {
  // zIndex: 2,
  // display: 'inline-block',
  // float: 'right',
  // backgroundColor: 'red'
};

const PostCreateActions = ({ basePath, data, resource }) => (
  <CardActions style={cardActionStyle}>
    {/* <EditButton basePath={basePath} record={data} /> */}
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </CardActions>
);

export const TransactionCreate = (props) => {
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [showToggle, setShowToggle] = useState(false);
  const [vali, setVali] = useState(true);
  const [user, setUser] = useStore("user");
  const redirect = useRedirect();
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const [evntID, setEvntID] = useState(null);
  const [evnt, setEvnt] = useState(null);
  const [evntTckts, setEvntTcks] = useState(null);
  const [evntTcktsVar, setEvntTcksVar] = useState(null);
  const [tickData, setTickData] = useState(null);
  const [tick_data, setTick_data] = useState([]);
  const [frmData, setFrmData] = useState(null);
  const [evntTcktData, setEvntTckData] = useState({});
  const [discnt, setDiscnt] = useState(null);
  const [discountData, setDiscountData] = useState({});
  const [total, setTotal] = useState(0);
  const [amt, setAmt] = useState(null);
  const [discs, setDiscs] = useState(null);
  const [charge, setCharge] = useState(null);
  const [valid, validate] = useState(true);
  const resource = useResourceContext();
  const { state } = useLocation();
  const [tabNames, setTabNames] = useState([
    "/",
    "/tickets_discounts",
    "/payment_details",
  ]);
  const dummy_text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem fugit et magnam dignissimos, placeat eligendi fugiat iure veritatis doloremque dicta, dolores delectus officiis facilis rerum deleniti corporis consequuntur laborum ullam.";
  const [pst_txt, setPst_txt] = useState(dummy_text);

  const config = useRef({
    public_key: process.env.REACT_APP_FW_KEY,
    tx_ref: user._id + "-" + Date.now().toString(),
    currency: "NGN",
    payment_options: "banktransfer,card,mobilemoney,ussd",
  });

  let config2 = {
    reference: new Date().getTime().toString(),
    publicKey: process.env.REACT_APP_PS_KEY,
  };

  if (!user) {
    client.authenticate().then((value) => {
      setUser(value.user);
    });
  } else {
    config.current.customer = {
      email: user.email,
      phonenumber: user.phone,
      name: user.name,
    };
    config2.email = user.email;
  }

  const flwChrg = (amount) => {
    return parseInt((1.4 / 100) * amount);
  };

  const kgChrg = (amount) => {
    return parseInt((7 / 100) * amount) - flwChrg(amount);
  };

  useEffect(() => {
    if (evnt && evnt.name) {
      config.current.customizations = {
        title: `${evnt.name} TICKET PURCHASE`,
        description: `${evnt.name} TICKET PURCHASE powered KUGA TELECOMMUNICATIONS`,
        logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
      };
    }
  }, [evnt]);

  useEffect(() => {
    if (total) {
      setCharge({
        total: kgChrg(amt) + flwChrg(amt),
        flw: flwChrg(amt),
        kg: kgChrg(amt),
        currency: "NGN",
      });
      config.current.amount = total - flwChrg(total);
    }
  }, [total]);

  useEffect(() => {
    if (
      state &&
      state.defaults &&
      state.defaults.eventName &&
      state.defaults.ticket_type
    ) {
      setEvntID(state.defaults.evntID);
      setEvnt(state.defaults.evnt);
      setEvntTcks(state.defaults.evntTckts);
      setEvntTckData(state.defaults.evntTcktData);
      setFrmData(state.formData);
    }
  }, [evnt, evntID, evntTcktData, evntTckts, state]);

  useEffect(() => {
    if (evntTckts) {
      setEvntTcksVar(evntTckts);
      setTick_data(evntTckts);
    }
  }, [evntTckts]);

  useEffect(() => {
    if (frmData) {
      console.log(frmData);
    }
  }, [frmData]);

  useEffect(() => {
    if (evntID) {
      dataProvider
        .getOne("events-list", {
          id: evntID,
        })
        .then((response) => {
          if (user.role !== "admin") {
            notify("Event Data Loaded Successfully", { type: "success" });
          }
          // console.log(response.data.tickets.types);
          setEvnt(response.data);
          setEvntTcks(
            response.data.tickets.types.map((tckt) => {
              let tckDt = evntTcktData;
              tckDt[tckt.ticket_type.toLowerCase()] = {
                ...tckt,
                benefits: response.data.tickets.benefits.filter((benefit) => {
                  return (
                    benefit.ticket_type === tckt.ticket_type ||
                    benefit.ticket_type === "All"
                  );
                }),
              };
              setEvntTckData(tckDt);
              return {
                id: tckt.ticket_type.toLowerCase(),
                name: tckt.ticket_type,
              };
            })
          );
        })
        .catch((error) => {
          notify(error.message, { type: "error" });
        });
    }
  }, [dataProvider, evntID, evntTcktData, notify, user]);

  useEffect(() => {
    if (frmData && frmData.discounts && frmData.discounts.length > 0) {
      let s = new Set();
      let dscs = frmData.discounts.filter((d) => {
        if (!s.has(d.discount)) {
          s.add(d.discount);
          return d;
        }
      });
      client
        .service("batch")
        .create({
          calls: dscs.map((disc) => {
            return ["get", "discounts", disc.discount];
          }),
        })
        .then((res) => {
          setDiscs(
            res
              .filter((r) => {
                return r && r.status === "fulfilled";
              })
              .map((r) => {
                return r.value;
              })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [frmData]);

  const toggle_text = useCallback(
    (str) => {
      if (str.split(" ").length > 10) {
        setPst_txt(str.split(" ").slice(0, 7).concat("...").join(" "));
      } else {
        setPst_txt(str);
      }
    },
    [] // Tells React to memoize regardless of arguments.
  );

  if (!user) {
    client.authenticate().then((value) => {
      setUser(value.user);
    });
  }
  // useEffect(() => {
  //   if (user && user.role !== "admin") {
  //     redirect("/tickets");
  //     notify("Not Allowed", { type: "warning" });
  //   }
  // });
  return (
    <Create
      title="Buy Transaction"
      defaultValue={
        state && state.defaults && state.formData ? state.formData : null
      }
      actions={<PostCreateActions />}
      aside={
        <AsideCreate
          tickData={evntTcktData}
          ticketTypes={tick_data}
          formData={frmData}
          total={total}
          setTotal={setTotal}
          discs={discs}
        />
      }
      sx={{
        "& .RaCreate-card": {
          background: "none !important",
          boxShadow: "none !important",
          margin: "2px",
        },
        "& .MuiCardContent-root": {
          background: "none",
          boxShadow: "none",
          justifyContent: "flex-start",
          alignItems: "center",
          minHeight: "400px",
          marginTop: "30px",
          position: "relative",
          padding: "8px 10px !important",
          marginBottom: "50px !important",
        },
        "& .MuiTabs-root": {
          background: "none",
          boxShadow: "none",
        },
        "& .Mui-selected": {
          color: "white !important",
          //   background: "linear-gradient(-45deg, #4767a7, #325197) !important",
          background: "hsl(220, 100%, 50%) !important",
          borderRadius: "6px",
          boxShadow: "6px 6px 12px #c9c9c9, -6px -6px 12px #ffffff",
        },
        "& .MuiTabs-indicator": {
          background: "none",
          border: "none",
        },
        "& .MuiDivider-root": {
          border: "none",
        },
        "& .form-tab": {
          padding: "2px 20px",
          margin: "10px",
          background: "#fff",
          boxShadow: "6px 6px 12px #c9c9c9, -6px -6px 12px #ffffff",
          borderRadius: "6px",
        },
        "& .card-subtitle": {
          whiteSpace: "pre-wrap",
          width: "90%",
          fontSize: "15px",
        },
        "& .event-section": {
          marginTop: `${!isLarge ? "15px" : "10px"}`,
          marginInline: `${!isLarge ? "16px" : 0}`,
          marginBottom: `${"26px"}`,
          padding: "20px",
          justifyContent: "flex-start",
          alignItems: "start",
          textAlign: "center",
          flexWrap: "wrap",
          width: `${!isLarge ? "95%" : "100%"}`,
          background: "#fff",
          boxShadow: "6px 6px 12px #c9c9c9, -6px -6px 12px #ffffff",
          borderRadius: "6px",
        },
        "& .event-section-transparent": {
          marginTop: `${!isLarge ? "15px" : "10px"}`,
          marginInline: `${!isLarge ? "16px" : 0}`,
          marginBottom: `${"26px"}`,
          padding: "20px",
          justifyContent: "flex-start",
          alignItems: "start",
          textAlign: "center",
          flexWrap: "wrap",
          width: `${!isLarge ? "95%" : "100%"}`,
          background: "none",
          boxShadow: "none",
          borderRadius: "6px",
        },
        "& .event-section-title": {
          marginTop: `${!isLarge ? "5px" : "4px"}`,
          marginInline: `${!isLarge ? "5px" : "4px"}`,
          marginBottom: "10px",
        },
        "& .form-iter": {
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px 10px",
        },
      }}
      {...props}
    >
      <TabbedForm
        // toolbar={<EventCreateToolbar vl={vali} />}
        toolbar={
          <TransactionCreateToolbar
            pay={config}
            evnt={evnt}
            evntTcktData={evntTcktData}
            frmData={frmData}
            vl={vali}
            valid={valid}
            validate={validate}
            setVl={setVali}
            amt={total}
            setAmt={setTotal}
            frmDt={frmData}
            tabNames={tabNames}
            resource={resource}
            charge={charge}
            setCharge={setCharge}
          />
        }
        // tabs={<TabbedFormTabs variant='fullWidth' scrollButtons={true} />}
      >
        <FormTab label={"Details"}>
          <FormDataConsumer>
            {({ formData, ...rest }) => {
              if (formData.event && formData.event.length > 0) {
                setEvntID(formData.event);
              }
            }}
          </FormDataConsumer>
          <FormDataConsumer>
            {({ formData, ...rest }) => {
              if (formData.ticket_list && formData.ticket_list.length > 0) {
                setFrmData(formData);
              }
            }}
          </FormDataConsumer>
          {state && state.defaults ? (
            <Stack className="event-section">
              <Typography className={"event-section-title"}>
                Transaction Type
              </Typography>
              <SelectInput
                source="event"
                choices={[
                  { id: state.defaults.event, name: state.defaults.eventName },
                ]}
                defaultValue={state.defaults.event}
              />
            </Stack>
          ) : (
            <Stack className="event-section">
              <Typography className={"event-section-title"}>
                Transaction Type
              </Typography>
              <ReferenceInput source="event" reference="users">
                <SelectInput />
              </ReferenceInput>
            </Stack>
          )}

          {state && state.defaults ? (
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                ((formData.event && formData.event.length > 0) ||
                  (state && state.defaults)) && (
                  <Stack className="event-section">
                    <Typography className={"event-section-title"}>
                      Transactions
                      {/* {formData.event} */}
                    </Typography>
                    <ArrayInput
                      source="ticket_list"
                      defaultValue={state.formData.ticket_list}
                    >
                      <SimpleFormIterator className="form-iter">
                        <SelectInput
                          source="ticket_type"
                          emptyText={"Select Transaction Type"}
                          choices={evntTckts ? evntTckts : null}
                        />
                        <TextInput source="recipient_email" />
                        <TextInput source="recipient_name" />
                        <FormDataConsumer>
                          {({
                            formData,
                            scopedFormData,
                            getSource,
                            ...rest
                          }) => {
                            if (scopedFormData.ticket_type && isLarge) {
                              let {
                                evntTcktData,
                                evntID,
                                evnt,
                                evntTckts,
                                ticket_type,
                                ticket_name,
                              } = state.defaults;
                              // console.log(scopedFormData);
                              let init_amt = parseInt(
                                evntTcktData[
                                  scopedFormData && scopedFormData.ticket_type
                                    ? scopedFormData.ticket_type
                                    : ticket_type
                                ].ticket_price
                              );
                              let fin_amt = 0;
                              let percnt = 0;
                              if (discs) {
                                discs
                                  .filter((t) => {
                                    return (
                                      t &&
                                      t.ticket_type.toLowerCase() ===
                                        scopedFormData.ticket_type.toLowerCase()
                                    );
                                  })
                                  .forEach((u) => {
                                    if (u && u.percentage) {
                                      percnt = percnt + u.percentage;
                                    }
                                  });
                              }
                              fin_amt = init_amt - (percnt / 100) * init_amt;

                              return (
                                <Stack
                                  minWidth={"100%"}
                                  spacing={1}
                                  position={"sticky"}
                                  top={"5px"}
                                  sx={{ order: 1, mr: 2, mt: 1, width: "100%" }}
                                >
                                  <Stack paddingX="3px" marginY={2}>
                                    <Stack
                                      className="card"
                                      // height="450px"
                                      marginBottom={2}
                                      marginX={0}
                                      style={{
                                        background:
                                          "linear-gradient(-45deg, #610212, #E0455F)",
                                      }}
                                      sx={{
                                        "& h3, svg": {
                                          color: "#fff",
                                        },
                                        "& button": {
                                          background: "#fff",
                                          color: "#000",
                                        },
                                      }}
                                    >
                                      <Stack>
                                        <Stack
                                          marginBottom={1}
                                          justifyContent={"center"}
                                          alignItems={"center"}
                                        >
                                          {/* <p style={{fontSize: '12px'}} className="card-subtitle">Canzona Transaction</p> */}
                                          <h3
                                            style={{ fontSize: "17px" }}
                                            className="card-title"
                                          >
                                            {
                                              evntTcktData[
                                                scopedFormData.ticket_type
                                              ].ticket_type
                                            }
                                          </h3>
                                        </Stack>
                                        <Stack
                                          marginBottom={1}
                                          justifyContent={"center"}
                                          alignItems={"center"}
                                        >
                                          <h3
                                            style={{ fontSize: "40px" }}
                                            className="card-title"
                                          >
                                            {`₦‎ `}
                                            {fin_amt}
                                          </h3>
                                        </Stack>
                                        {evntTcktData[
                                          scopedFormData.ticket_type
                                        ].benefits &&
                                        evntTcktData[scopedFormData.ticket_type]
                                          .benefits.length !== 0
                                          ? evntTcktData[
                                              scopedFormData.ticket_type
                                            ].benefits.map((bnft) => {
                                              return (
                                                <Stack
                                                  alignItems={"center"}
                                                  direction={"row"}
                                                  spacing={2}
                                                  margin="8px 10px"
                                                >
                                                  <CheckCircleRounded fontSize="medium" />
                                                  <h3
                                                    className="article-subtitle"
                                                    style={{
                                                      fontSize: "15px",
                                                      marginBottom: "0px",
                                                    }}
                                                  >
                                                    {bnft.benefit}
                                                  </h3>
                                                </Stack>
                                              );
                                            })
                                          : null}
                                        <Stack
                                          direction="row"
                                          width={"85%"}
                                          position={"absolute"}
                                          bottom="15px"
                                          spacing={1}
                                          justifyContent={"center"}
                                          alignItems={"center"}
                                        >
                                          {/* <Button 
                                                                    color='primary'
                                                                    variant='contained'
                                                                    sx={{
                                                                        background: 'linear-gradient(-45deg, #610212, #E0455F)',
                                                                        // color: 'rgba(0, 0, 0, 0.6)'
                                                                    }}
                                                                    // onClick={}
                                                                    fullWidth
                                                                >Buy Now</Button> */}
                                        </Stack>
                                      </Stack>
                                    </Stack>
                                  </Stack>
                                </Stack>
                              );
                            }
                          }}
                        </FormDataConsumer>
                        {/* <ImageInput multiple={true} source="media" maxSize={5000000}>
                                      <ImageField source="src" title="title" />
                                    </ImageInput> */}
                      </SimpleFormIterator>
                    </ArrayInput>
                  </Stack>
                )
              }
            </FormDataConsumer>
          ) : (
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData.event &&
                formData.event.length > 0 && (
                  <Stack className="event-section">
                    <Typography className={"event-section-title"}>
                      Transactions
                      {/* {formData.event} */}
                    </Typography>
                    <ArrayInput source="ticket_list">
                      <SimpleFormIterator className="form-iter">
                        <SelectInput
                          source="ticket_type"
                          emptyText={"Select Transaction Type"}
                          choices={evntTckts ? evntTckts : null}
                        />
                        <TextInput source="recipient_email" />
                        <FormDataConsumer>
                          {({
                            formData,
                            scopedFormData,
                            getSource,
                            ...rest
                          }) => {
                            if (scopedFormData.ticket_type && isLarge) {
                              let init_amt = parseInt(
                                evntTcktData[scopedFormData.ticket_type]
                                  .ticket_price
                              );
                              let fin_amt = 0;
                              let percnt = 0;
                              if (discs) {
                                discs
                                  .filter((t) => {
                                    return (
                                      t &&
                                      t.ticket_type.toLowerCase() ===
                                        scopedFormData.ticket_type.toLowerCase()
                                    );
                                  })
                                  .forEach((u) => {
                                    if (u && u.percentage) {
                                      percnt = percnt + u.percentage;
                                    }
                                  });
                              }
                              fin_amt = init_amt - (percnt / 100) * init_amt;

                              return (
                                <Stack
                                  minWidth={"100%"}
                                  spacing={1}
                                  position={"sticky"}
                                  top={"5px"}
                                  sx={{ order: 1, mr: 2, mt: 1, width: "100%" }}
                                >
                                  <Stack paddingX="3px" marginY={2}>
                                    <Stack
                                      className="card"
                                      // height="450px"
                                      marginBottom={2}
                                      marginX={0}
                                      style={{
                                        background:
                                          "linear-gradient(-45deg, #610212, #E0455F)",
                                      }}
                                      sx={{
                                        "& h3, svg": {
                                          color: "#fff",
                                        },
                                        "& button": {
                                          background: "#fff",
                                          color: "#000",
                                        },
                                      }}
                                    >
                                      <Stack>
                                        <Stack
                                          marginBottom={1}
                                          justifyContent={"center"}
                                          alignItems={"center"}
                                        >
                                          {/* <p style={{fontSize: '12px'}} className="card-subtitle">Canzona Transaction</p> */}
                                          <h3
                                            style={{ fontSize: "17px" }}
                                            className="card-title"
                                          >
                                            {
                                              evntTcktData[
                                                scopedFormData.ticket_type
                                              ].ticket_type
                                            }
                                          </h3>
                                        </Stack>
                                        <Stack
                                          marginBottom={1}
                                          justifyContent={"center"}
                                          alignItems={"center"}
                                        >
                                          <h3
                                            style={{ fontSize: "40px" }}
                                            className="card-title"
                                          >
                                            {`₦‎ `}
                                            {fin_amt}
                                          </h3>
                                        </Stack>
                                        {evntTcktData[
                                          scopedFormData.ticket_type
                                        ].benefits &&
                                        evntTcktData[scopedFormData.ticket_type]
                                          .benefits.length !== 0
                                          ? evntTcktData[
                                              scopedFormData.ticket_type
                                            ].benefits.map((bnft) => {
                                              return (
                                                <Stack
                                                  alignItems={"center"}
                                                  direction={"row"}
                                                  spacing={2}
                                                  margin="8px 10px"
                                                >
                                                  <CheckCircleRounded fontSize="medium" />
                                                  <h3
                                                    className="article-subtitle"
                                                    style={{
                                                      fontSize: "15px",
                                                      marginBottom: "0px",
                                                    }}
                                                  >
                                                    {bnft.benefit}
                                                  </h3>
                                                </Stack>
                                              );
                                            })
                                          : null}
                                        <Stack
                                          direction="row"
                                          width={"85%"}
                                          position={"absolute"}
                                          bottom="15px"
                                          spacing={1}
                                          justifyContent={"center"}
                                          alignItems={"center"}
                                        >
                                          {/* <Button 
                                                                    color='primary'
                                                                    variant='contained'
                                                                    sx={{
                                                                        background: 'linear-gradient(-45deg, #610212, #E0455F)',
                                                                        // color: 'rgba(0, 0, 0, 0.6)'
                                                                    }}
                                                                    // onClick={}
                                                                    fullWidth
                                                                >Buy Now</Button> */}
                                        </Stack>
                                      </Stack>
                                    </Stack>
                                  </Stack>
                                </Stack>
                              );
                            }
                          }}
                        </FormDataConsumer>
                        {/* <ImageInput multiple={true} source="media" maxSize={5000000}>
                                      <ImageField source="src" title="title" />
                                    </ImageInput> */}
                      </SimpleFormIterator>
                    </ArrayInput>
                  </Stack>
                )
              }
            </FormDataConsumer>
          )}
        </FormTab>
        <FormTab label={"Discounts"} path={"tickets_discounts"}>
          <Stack className="event-section">
            <ArrayInput source="discounts">
              <SimpleFormIterator className="form-iter">
                <ReferenceInput source="discount" reference="discounts">
                  <AutocompleteInput />
                </ReferenceInput>
              </SimpleFormIterator>
            </ArrayInput>
          </Stack>
        </FormTab>
        <FormTab label={"Payment"} path={"payment_details"}>
          <Stack className="event-section">
            {isLarge ? (
              <Stack width={"100%"}>
                {frmData && frmData.ticket_list && tick_data.length > 0 ? (
                  <Stack
                    paddingX="3px"
                    position={"sticky"}
                    top={"25px"}
                    marginY={2}
                  >
                    <h3
                      style={{ fontSize: "20px", marginBottom: "10px" }}
                      className="card-title"
                    >
                      Summary
                    </h3>
                    {tick_data
                      .map((element) => {
                        let evnt = frmData.ticket_list.filter((ele) => {
                          return ele.ticket_type === element.id;
                        });

                        let init_amt = parseInt(
                          evntTcktData[element.id].ticket_price
                        );
                        let fin_amt = 0;
                        let percnt = 0;
                        if (discs) {
                          discs
                            .filter((t) => {
                              return (
                                t &&
                                t.ticket_type.toLowerCase() ===
                                  element.id.toLowerCase()
                              );
                            })
                            .forEach((u) => {
                              if (u && u.percentage) {
                                percnt = percnt + u.percentage;
                              }
                            });
                        }
                        fin_amt = init_amt - (percnt / 100) * init_amt;
                        return {
                          name: element.name,
                          id: element.id,
                          ticket_data: evntTcktData[element.id],
                          init_amt: init_amt,
                          fin_amt: fin_amt,
                          tot_percnt: percnt,
                          units: evnt.length,
                          deduction: "",
                          total: evnt.length * parseInt(fin_amt),
                        };
                      })
                      .map((typ) => {
                        if (typ.units <= 0) {
                          return null;
                        } else {
                          return (
                            <Stack
                              className="card"
                              marginBottom={2}
                              marginX={0}
                              style={{
                                background:
                                  "linear-gradient(-45deg, #610212, #E0455F)",
                              }}
                              sx={{
                                "& h3, svg": {
                                  color: "#fff",
                                },
                                "& button": {
                                  background: "#fff",
                                  color: "#000",
                                },
                              }}
                            >
                              <Stack>
                                <Stack
                                  marginBottom={1}
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                >
                                  <h3
                                    style={{ fontSize: "17px" }}
                                    className="card-title"
                                  >
                                    {typ.ticket_data.ticket_type}
                                  </h3>
                                </Stack>
                                <Stack
                                  marginBottom={1}
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                >
                                  <h3
                                    style={{ fontSize: "40px" }}
                                    className="card-title"
                                  >
                                    {`₦‎ `}
                                    {parseInt(typ.fin_amt)}
                                  </h3>
                                </Stack>
                                <Stack
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                  direction={"row"}
                                  spacing={2}
                                  margin="8px 10px"
                                >
                                  <h3
                                    className="article-subtitle"
                                    style={{
                                      fontSize: "15px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {typ.units}
                                    {" Units"}
                                  </h3>
                                  <h3
                                    className="article-subtitle"
                                    style={{
                                      fontSize: "15px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {parseInt(typ.total)}
                                  </h3>
                                </Stack>
                              </Stack>
                            </Stack>
                          );
                        }
                      })}
                    <Stack
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      direction={"row"}
                      spacing={2}
                      margin="8px 10px"
                    >
                      <h3
                        className="card-title"
                        style={{
                          fontSize: "20px",
                          marginBottom: "0px",
                        }}
                      >
                        {"Total"}
                      </h3>
                      <h3
                        className="card-title"
                        style={{
                          fontSize: "25px",
                          marginBottom: "0px",
                        }}
                      >
                        {`₦‎ `}
                        {parseInt(total)}
                      </h3>
                    </Stack>
                  </Stack>
                ) : null}
              </Stack>
            ) : null}

            <Stack width={"100%"}></Stack>
            <TextInput source="payment_email" defaultValue={user.email} />
            <TextInput source="payment_phone" defaultValue={user.phone} />
            <TextInput source="payment_name" defaultValue={user.name} />
          </Stack>
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export const TransactionList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List
      actions={<ListActions />}
      sx={{
        "& .RaList-content": {
          backgroundColor: "rgb(245 245 245/1);",
          boxShadow: "none",
        },
        "& .RaList-actions": {
          backgroundColor: "transparent",
        },
      }}
    >
      {isSmall ? <GridChildSMTrans /> : <GridChildLGTrans />}
    </List>
  );
};

export const WalletList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List
      actions={<ListActions />}
      sx={{
        "& .RaList-content": {
          backgroundColor: "rgb(245 245 245/1);",
          boxShadow: "none",
        },
        "& .RaList-actions": {
          backgroundColor: "transparent",
        },
      }}
    >
      {isSmall ? <GridChildSMWallets /> : <GridChildLGWallets />}
    </List>
  );
};

export const UserList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List
      actions={<ListActions />}
      sx={{
        "& .RaList-content": {
          backgroundColor: "rgb(245 245 245/1);",
          boxShadow: "none",
        },
        "& .RaList-actions": {
          backgroundColor: "transparent",
        },
      }}
    >
      {isSmall ? <GridChildSMUsers /> : <GridChildLGUsers />}
    </List>
  );
};

export const BlockchainList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List
      actions={<ListActions />}
      sx={{
        "& .RaList-content": {
          backgroundColor: "rgb(245 245 245/1);",
          boxShadow: "none",
        },
        "& .RaList-actions": {
          backgroundColor: "transparent",
        },
      }}
    >
      {isSmall ? <GridChildSMBlockchains /> : <GridChildLGBlockchains />}
    </List>
  );
};

export const SalesList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List
      actions={<ListActions />}
      sx={{
        "& .RaList-content": {
          backgroundColor: "rgb(245 245 245/1);",
          boxShadow: "none",
        },
        "& .RaList-actions": {
          backgroundColor: "transparent",
        },
      }}
    >
      {isSmall ? <GridChildSMSales /> : <GridChildLGSales />}
    </List>
  );
};

const GridChildSMTrans = (props) => {
  return (
    <SimpleList
      primaryText={(record) => (
        <WrapperField label="Transaction" sortBy="Transaction">
          <FunctionField
            label="Icon"
            render={(record) => {
              return (
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <Box
                      margin={"3px"}
                      backgroundColor={
                        record &&
                        record.transaction_type.toLowerCase() === "deposit"
                          ? "rgb(187 247 208/1)"
                          : "rgb(254 202 202/1)"
                      }
                      width={"max-content"}
                      padding={"3px 5px !important"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"3px"}
                      className="card-icon icon-box"
                      color={
                        record &&
                        record.transaction_type.toLowerCase() === "deposit"
                          ? "green"
                          : "red"
                      }
                    >
                      {(() => {
                        switch (record.transaction_type.toLowerCase()) {
                          case "withdrawal":
                            return <FileUploadOutlined />;
                          case "deposit":
                            return <FileDownloadOutlined />;
                          default:
                            return <FileDownloadOutlined />;
                        }
                      })()}
                    </Box>
                    <FunctionField
                      label="Name"
                      render={(record) => {
                        return (
                          <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"start"}
                            spacing={0}
                          >
                            <h3 className="card-subtitle">
                              {toTitleCase(record.transaction_type)}
                            </h3>
                            <p className="card-subtitle">{record.dateTime}</p>
                          </Stack>
                        );
                      }}
                    />
                  </Stack>
                  <Stack>
                    <FunctionField
                      label="Name"
                      render={(record) => {
                        return (
                          <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"end"}
                            spacing={0}
                          >
                            <h3
                              className="card-subtitle"
                              style={{
                                color: `${
                                  record &&
                                  record.transaction_type.toLowerCase() ===
                                    "deposit"
                                    ? "green"
                                    : "red"
                                }`,
                              }}
                            >
                              {record.amount}
                            </h3>
                            <FunctionField
                              label="Name"
                              render={(record) => {
                                return (
                                  <>
                                    <p className="card-subtitle">
                                      {record.status}
                                    </p>
                                  </>
                                );
                              }}
                            />
                          </Stack>
                        );
                      }}
                    />
                  </Stack>
                </Stack>
              );
            }}
          />

          {/* <TextField source="Transaction" /> */}
        </WrapperField>
      )}
      //   secondaryText={(record) => `${record.views} views`}
      //   tertiaryText={(record) =>
      //     new Date(record.published_at).toLocaleDateString()
      //   }
    />
  );
};
const GridChildLGTrans = (props) => {
  return (
    <Datagrid
      actions={<ListActions />}
      size="medium"
      rowClick="show"
      bulkActionButtons={false}
      sx={{
        // backgroundColor: "transparent",
        boxShadow: "none",
        "& .RaDatagrid-headerCell": {
          backgroundColor: "rgb(245 245 245/1);",
        },
      }}
    >
      <WrapperField label="Transaction" sortBy="Transaction">
        <FunctionField
          label="Icon"
          render={(record) => {
            return (
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                spacing={2}
              >
                <Box
                  margin={"3px"}
                  backgroundColor={
                    record &&
                    record.transaction_type.toLowerCase() === "deposit"
                      ? "rgb(187 247 208/1)"
                      : "rgb(254 202 202/1)"
                  }
                  width={"max-content"}
                  padding={"3px 5px !important"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={"3px"}
                  className="card-icon icon-box"
                  color={
                    record &&
                    record.transaction_type.toLowerCase() === "deposit"
                      ? "green"
                      : "red"
                  }
                >
                  {(() => {
                    switch (record.transaction_type.toLowerCase()) {
                      case "withdrawal":
                        return <FileUploadOutlined />;
                      case "deposit":
                        return <FileDownloadOutlined />;
                      default:
                        return <FileDownloadOutlined />;
                    }
                  })()}
                </Box>
                <FunctionField
                  label="Name"
                  render={(record) => {
                    return (
                      <h3 className="card-subtitle">
                        {toTitleCase(record.transaction_type)}
                      </h3>
                    );
                  }}
                />
              </Stack>
            );
          }}
        />

        {/* <TextField source="Transaction" /> */}
      </WrapperField>
      <TextField source="amount" />
      <TextField source="dateTime" />
      <TextField source="status" />
    </Datagrid>
  );
};
const GridChildSMSales = (props) => {
  return (
    <SimpleList
      primaryText={(record) => (
        <WrapperField label="Transaction" sortBy="Transaction">
          <FunctionField
            label="Icon"
            render={(record) => {
              return (
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <Box
                      margin={"3px"}
                      backgroundColor={
                        record &&
                        record.transaction_type.toLowerCase() === "buy"
                          ? "rgb(187 247 208/1)"
                          : "rgb(254 202 202/1)"
                      }
                      width={"max-content"}
                      padding={"3px 5px !important"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"3px"}
                      className="card-icon icon-box"
                      color={
                        record &&
                        record.transaction_type.toLowerCase() === "buy"
                          ? "green"
                          : "red"
                      }
                    >
                      {(() => {
                        switch (record.transaction_type.toLowerCase()) {
                          case "sell":
                            return <FileUploadOutlined />;
                          case "buy":
                            return <FileDownloadOutlined />;
                          default:
                            return <FileDownloadOutlined />;
                        }
                      })()}
                    </Box>
                    <FunctionField
                      label="Name"
                      render={(record) => {
                        return (
                          <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"start"}
                            spacing={0}
                          >
                            <h3 className="card-subtitle">
                              {toTitleCase(record.name)}
                            </h3>
                            <p className="card-subtitle">{record.dateTime}</p>
                          </Stack>
                        );
                      }}
                    />
                  </Stack>
                  <Stack>
                    <FunctionField
                      label="Name"
                      render={(record) => {
                        return (
                          <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"end"}
                            spacing={0}
                          >
                            <h3
                              className="card-subtitle"
                              style={{
                                color: `${
                                  record &&
                                  record.transaction_type.toLowerCase() ===
                                    "buy"
                                    ? "green"
                                    : "red"
                                }`,
                              }}
                            >
                              {record.amount}
                              {/* - 0.789 ETH */}
                            </h3>
                            <FunctionField
                              label="Name"
                              render={(record) => {
                                return (
                                  <>
                                    {/* <TextField className="card-subtitle" source="customer" /> */}
                                    <p className="card-subtitle">
                                      To {record.customer}
                                    </p>
                                  </>
                                );
                              }}
                            />
                          </Stack>
                        );
                      }}
                    />
                  </Stack>
                </Stack>
              );
            }}
          />

          {/* <TextField source="Transaction" /> */}
        </WrapperField>
      )}
      //   secondaryText={(record) => `${record.views} views`}
      //   tertiaryText={(record) =>
      //     new Date(record.published_at).toLocaleDateString()
      //   }
    />
  );
};
const GridChildLGSales = (props) => {
  return (
    <Datagrid
      actions={<ListActions />}
      size="medium"
      rowClick="show"
      bulkActionButtons={false}
      sx={{
        // backgroundColor: "transparent",
        boxShadow: "none",
        "& .RaDatagrid-headerCell": {
          backgroundColor: "rgb(245 245 245/1);",
        },
      }}
    >
      <WrapperField label="Transaction" sortBy="Transaction">
        <FunctionField
          label="Icon"
          render={(record) => {
            return (
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                spacing={2}
              >
                <Box
                  margin={"3px"}
                  backgroundColor={
                    record && record.transaction_type.toLowerCase() === "buy"
                      ? "rgb(187 247 208/1)"
                      : "rgb(254 202 202/1)"
                  }
                  width={"max-content"}
                  padding={"3px 5px !important"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={"3px"}
                  className="card-icon icon-box"
                  color={
                    record && record.transaction_type.toLowerCase() === "buy"
                      ? "green"
                      : "red"
                  }
                >
                  {(() => {
                    switch (record.transaction_type.toLowerCase()) {
                      case "sell":
                        return <FileUploadOutlined />;
                      case "buy":
                        return <FileDownloadOutlined />;
                      default:
                        return <FileDownloadOutlined />;
                    }
                  })()}
                </Box>
                <FunctionField
                  label="Name"
                  render={(record) => {
                    return (
                      <h3 className="card-subtitle">
                        {toTitleCase(record.transaction_type)}
                      </h3>
                    );
                  }}
                />
              </Stack>
            );
          }}
        />

        {/* <TextField source="Transaction" /> */}
      </WrapperField>
      <TextField source="name" label="NFT Name" />
      <TextField source="amount" />
      <TextField source="customer" />
      <TextField source="dateTime" />
    </Datagrid>
  );
};

const GridChildSMWallets = (props) => {
  return (
    <SimpleList
      primaryText={(record) => (
        <WrapperField label="Transaction" sortBy="Transaction">
          <FunctionField
            label="Icon"
            render={(record) => {
              return (
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <Box
                      margin={"3px"}
                      backgroundColor={
                        record && record.virtAcc.active === true
                          ? "rgb(187 247 208/1)"
                          : "rgb(254 202 202/1)"
                      }
                      width={"max-content"}
                      padding={"3px 5px !important"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"3px"}
                      className="card-icon icon-box"
                      color={
                        record && record.virtAcc.active === true
                          ? "green"
                          : "red"
                      }
                    >
                      {(() => {
                        return <AccountBalanceWalletOutlined />;
                      })()}
                    </Box>
                    <FunctionField
                      label="Name"
                      render={(record) => {
                        return (
                          <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"start"}
                            spacing={0}
                          >
                            <ReferenceField source="user_id" reference="users">
                              <TextField source="email" />
                            </ReferenceField>
                            {/* <h3 className="card-subtitle">{toTitleCase(record.name)}</h3> */}
                            <p className="card-subtitle">
                              {record.depAddrs.address.slice(0, 24)}
                              {" ..."}
                            </p>
                          </Stack>
                        );
                      }}
                    />
                  </Stack>
                  <Stack>
                    <FunctionField
                      label="Name"
                      render={(record) => {
                        return (
                          <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"end"}
                            spacing={0}
                          >
                            <h3
                              className="card-subtitle"
                              style={{
                                color: `${
                                  record &&
                                  record.virtAcc.balance.accountBalance > 0
                                    ? "green"
                                    : "red"
                                }`,
                              }}
                            >
                              {record.virtAcc.balance.accountBalance}
                              {" ETH"}
                            </h3>
                            <FunctionField
                              label="Name"
                              render={(record) => {
                                return (
                                  <>
                                    {/* <TextField className="card-subtitle" source="customer" /> */}
                                    <p className="card-subtitle">
                                      {record.virtAcc.balance.availableBalance}
                                      {" WETH"}
                                    </p>
                                  </>
                                );
                              }}
                            />
                          </Stack>
                        );
                      }}
                    />
                  </Stack>
                </Stack>
              );
            }}
          />

          {/* <TextField source="Transaction" /> */}
        </WrapperField>
      )}
      //   secondaryText={(record) => `${record.views} views`}
      //   tertiaryText={(record) =>
      //     new Date(record.published_at).toLocaleDateString()
      //   }
    />
  );
};
const GridChildLGWallets = (props) => {
  return (
    <Datagrid
      actions={<ListActions />}
      size="medium"
      rowClick="show"
      bulkActionButtons={false}
      sx={{
        // backgroundColor: "transparent",
        boxShadow: "none",
        "& .RaDatagrid-headerCell": {
          backgroundColor: "rgb(245 245 245/1);",
        },
      }}
    >
      <WrapperField label="Wallet" sortBy="Transaction">
        <FunctionField
          label="Icon"
          render={(record) => {
            return (
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                spacing={2}
              >
                <Box
                  margin={"3px"}
                  backgroundColor={
                    record && record.virtAcc.active === true
                      ? "rgb(187 247 208/1)"
                      : "rgb(254 202 202/1)"
                  }
                  width={"max-content"}
                  padding={"3px 5px !important"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={"3px"}
                  className="card-icon icon-box"
                  color={
                    record && record.virtAcc.active === true ? "green" : "red"
                  }
                >
                  {(() => {
                    return <AccountBalanceWalletOutlined />;
                  })()}
                </Box>
                {/* <FunctionField label="Name" render={(record) => {return <h3 className="card-subtitle">{toTitleCase(record.transaction_type)}</h3>}} /> */}
              </Stack>
            );
          }}
        />

        {/* <TextField source="Transaction" /> */}
      </WrapperField>
      <ReferenceField source="user_id" reference="users">
        <TextField source="email" />
      </ReferenceField>
      <TextField
        source="virtAcc.balance.accountBalance"
        label="Account Balance"
      />
      <TextField
        source="virtAcc.balance.availableBalance"
        label="Available Balance"
      />
      <TextField source="virtAcc.currency" label="Currency" />
      <TextField source="dateTime" />
    </Datagrid>
  );
};

const GridChildSMUsers = (props) => {
  return (
    <SimpleList
      primaryText={(record) => (
        <WrapperField label="Transaction" sortBy="Transaction">
          <FunctionField
            label="Icon"
            render={(record) => {
              return (
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <Box
                      margin={"3px"}
                      // backgroundColor={
                      //   record && record.virtAcc.active === true
                      //     ? "rgb(187 247 208/1)"
                      //     : "rgb(254 202 202/1)"
                      // }
                      width={"max-content"}
                      padding={"3px 5px !important"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"3px"}
                      className="card-icon icon-box"
                      // color={
                      //   record && record.virtAcc.active === true
                      //     ? "green"
                      //     : "red"
                      // }
                    >
                      {(() => {
                        return <Person />;
                      })()}
                    </Box>
                    <FunctionField
                      label="Name"
                      render={(record) => {
                        return (
                          <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"start"}
                            spacing={0}
                          >
                            <h3 className="card-subtitle">{record.name}</h3>
                            <p className="card-subtitle">{record.role}</p>
                          </Stack>
                        );
                      }}
                    />
                  </Stack>
                  <Stack>
                    <FunctionField
                      label="Name"
                      render={(record) => {
                        return (
                          <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"end"}
                            spacing={0}
                          >
                            <h3
                              className="card-subtitle"
                              style={
                                {
                                  // color: `${
                                  //   record &&
                                  //   record.virtAcc.balance.accountBalance > 0
                                  //     ? "green"
                                  //     : "red"
                                  // }`,
                                }
                              }
                            >
                              {/* {record.virtAcc.balance.accountBalance}
                              {" ETH"} */}
                              <ReferenceField
                                source="wallet_id"
                                reference="wallet"
                              >
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  justifyContent={"flex-start"}
                                  spacing={1}
                                >
                                  <TextField source="virtAcc.balance.accountBalance" />
                                  <p className="card-subtitle">{" ETH"}</p>
                                </Stack>
                              </ReferenceField>
                            </h3>
                            <FunctionField
                              label="Name"
                              render={(record) => {
                                return (
                                  <>
                                    {/* <TextField className="card-subtitle" source="customer" /> */}
                                    <p className="card-subtitle">
                                      <ReferenceField
                                        source="wallet_id"
                                        reference="wallet"
                                      >
                                        <Stack
                                          direction={"row"}
                                          alignItems={"center"}
                                          justifyContent={"flex-start"}
                                          spacing={1}
                                        >
                                          <TextField source="virtAcc.balance.availableBalance" />
                                          <p className="card-subtitle">
                                            {" ETH"}
                                          </p>
                                        </Stack>
                                      </ReferenceField>
                                    </p>
                                  </>
                                );
                              }}
                            />
                          </Stack>
                        );
                      }}
                    />
                  </Stack>
                </Stack>
              );
            }}
          />

          {/* <TextField source="Transaction" /> */}
        </WrapperField>
      )}
      //   secondaryText={(record) => `${record.views} views`}
      //   tertiaryText={(record) =>
      //     new Date(record.published_at).toLocaleDateString()
      //   }
    />
  );
};
const GridChildLGUsers = (props) => {
  return (
    <Datagrid
      actions={<ListActions />}
      size="medium"
      rowClick="show"
      bulkActionButtons={false}
      sx={{
        // backgroundColor: "transparent",
        boxShadow: "none",
        "& .RaDatagrid-headerCell": {
          backgroundColor: "rgb(245 245 245/1);",
        },
      }}
    >
      <WrapperField label="Users" sortBy="Transaction">
        <FunctionField
          label="Icon"
          render={(record) => {
            return (
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                spacing={2}
              >
                <Box
                  margin={"3px"}
                  // backgroundColor={
                  //   record && record.virtAcc.active === true
                  //     ? "rgb(187 247 208/1)"
                  //     : "rgb(254 202 202/1)"
                  // }
                  width={"max-content"}
                  padding={"3px 5px !important"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={"3px"}
                  className="card-icon icon-box"
                  // color={
                  //   record && record.virtAcc.active === true ? "green" : "red"
                  // }
                >
                  {(() => {
                    return <Person />;
                  })()}
                </Box>
                {/* <FunctionField label="Name" render={(record) => {return <h3 className="card-subtitle">{toTitleCase(record.transaction_type)}</h3>}} /> */}
              </Stack>
            );
          }}
        />

        {/* <TextField source="Transaction" /> */}
      </WrapperField>
      <TextField source="name" />
      <TextField source="role" />
      <ReferenceField
        source="wallet_id"
        reference="wallet"
        label="Acc. Balance"
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          spacing={1}
        >
          <TextField source="virtAcc.balance.accountBalance" />
          <p className="card-subtitle">{" ETH"}</p>
        </Stack>
      </ReferenceField>

      <ReferenceField
        source="wallet_id"
        reference="wallet"
        label="Avail. Balance"
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          spacing={1}
        >
          <TextField source="virtAcc.balance.availableBalance" />
          <p className="card-subtitle">{" ETH"}</p>
        </Stack>
      </ReferenceField>

      {/* <TextField source="virtAcc.currency" label="Currency" /> */}
      <TextField source="dateTime" />
    </Datagrid>
  );
};

const GridChildSMBlockchains = (props) => {
  return (
    <SimpleList
      primaryText={(record) => (
        <WrapperField label="Transaction" sortBy="Transaction">
          <FunctionField
            label="Icon"
            render={(record) => {
              return (
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    <Box
                      margin={"3px"}
                      // backgroundColor={
                      //   record && record.virtAcc.active === true
                      //     ? "rgb(187 247 208/1)"
                      //     : "rgb(254 202 202/1)"
                      // }
                      width={"max-content"}
                      padding={"3px 5px !important"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"3px"}
                      className="card-icon icon-box"
                      // color={
                      //   record && record.virtAcc.active === true
                      //     ? "green"
                      //     : "red"
                      // }
                    >
                      {(() => {
                        return <LinkOutlined />;
                      })()}
                    </Box>
                    <FunctionField
                      label="Name"
                      render={(record) => {
                        return (
                          <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"start"}
                            spacing={0}
                          >
                            {/* <ReferenceField source="user_id" reference="users">
                              <TextField source="email" />
                            </ReferenceField> */}
                            <h3 className="card-subtitle">
                              {toTitleCase(record.blockchain)}
                            </h3>
                            <p className="card-subtitle">
                              {record.xpub.slice(0, 15)}
                              {" ..."}
                            </p>
                          </Stack>
                        );
                      }}
                    />
                  </Stack>
                  <Stack>
                    <FunctionField
                      label="Name"
                      render={(record) => {
                        return (
                          <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"end"}
                            spacing={0}
                          >
                            <h3
                              className="card-subtitle"
                              style={
                                {
                                  // color: `${
                                  //   record &&
                                  //   record.virtAcc.balance.accountBalance > 0
                                  //     ? "green"
                                  //     : "red"
                                  // }`,
                                }
                              }
                            >
                              {record.mnemonic.split(" ").length}
                              {" words"}
                            </h3>
                            <FunctionField
                              label="Name"
                              render={(record) => {
                                return (
                                  <>
                                    {/* <TextField className="card-subtitle" source="customer" /> */}
                                    <p className="card-subtitle">
                                      {record.mnemonic.slice(0, 12)}
                                      {" ..."}
                                    </p>
                                  </>
                                );
                              }}
                            />
                          </Stack>
                        );
                      }}
                    />
                  </Stack>
                </Stack>
              );
            }}
          />

          {/* <TextField source="Transaction" /> */}
        </WrapperField>
      )}
      //   secondaryText={(record) => `${record.views} views`}
      //   tertiaryText={(record) =>
      //     new Date(record.published_at).toLocaleDateString()
      //   }
    />
  );
};
const GridChildLGBlockchains = (props) => {
  return (
    <Datagrid
      actions={<ListActions />}
      size="medium"
      rowClick="show"
      bulkActionButtons={false}
      sx={{
        // backgroundColor: "transparent",
        boxShadow: "none",
        "& .RaDatagrid-headerCell": {
          backgroundColor: "rgb(245 245 245/1);",
        },
      }}
    >
      <WrapperField label="BlockChains" sortBy="Transaction">
        <FunctionField
          label="Icon"
          render={(record) => {
            return (
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                spacing={2}
              >
                <Box
                  margin={"3px"}
                  // backgroundColor={
                  //   record && record.virtAcc.active === true
                  //     ? "rgb(187 247 208/1)"
                  //     : "rgb(254 202 202/1)"
                  // }
                  width={"max-content"}
                  padding={"3px 5px !important"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={"3px"}
                  className="card-icon icon-box"
                  // color={
                  //   record && record.virtAcc.active === true ? "green" : "red"
                  // }
                >
                  {(() => {
                    return <LinkOutlined />;
                  })()}
                </Box>
                {/* <FunctionField label="Name" render={(record) => {return <h3 className="card-subtitle">{toTitleCase(record.transaction_type)}</h3>}} /> */}
              </Stack>
            );
          }}
        />

        {/* <TextField source="Transaction" /> */}
      </WrapperField>
      {/* <ReferenceField source="user_id" reference="users">
        <TextField source="email" />
      </ReferenceField> */}
      {/* <TextField source="blockchain" /> */}
      <FunctionField
        label="Type"
        render={(record) => {
          return (
            <h3 className="card-subtitle">{toTitleCase(record.blockchain)}</h3>
          );
        }}
      />
      <FunctionField
        label="Xpub"
        render={(record) => {
          return (
            <h3 className="card-subtitle">
              {record.xpub.slice(0, 10)}
              {"..."}
            </h3>
          );
        }}
      />
      <FunctionField
        label="Mnemonic"
        render={(record) => {
          return (
            <h3 className="card-subtitle">
              {record.mnemonic.slice(0, 5)}
              {"..."}
            </h3>
          );
        }}
      />
      <FunctionField
        label="Mnemonic Length"
        render={(record) => {
          return (
            <h3 className="card-subtitle">
              {record.mnemonic.split(" ").length}
              {"..."}
            </h3>
          );
        }}
      />
      <TextField source="dateTime" />
    </Datagrid>
  );
};

export const DemoCreateSales = (props) => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="transaction_type" />
        <TextInput source="name" />
        <TextInput source="amount" />
        <TextInput source="customer" />
        <TextInput source="dateTime" />
        <TextInput source="text" />
      </SimpleForm>
    </Create>
  );
};

export const DemoCreateTrans = (props) => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="transaction_type" />
        <TextInput source="amount" />
        <TextInput source="dateTime" />
        <TextInput source="status" />
        <TextInput source="text" />
      </SimpleForm>
    </Create>
  );
};

export const DemoCreate = (props) => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="text" />
      </SimpleForm>
    </Create>
  );
};

export const BlockChainCreate = (props) => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="blockchain" />
      </SimpleForm>
    </Create>
  );
};
