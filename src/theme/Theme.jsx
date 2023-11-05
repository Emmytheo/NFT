import { defaultTheme } from 'react-admin';

const theme = {
    ...defaultTheme,
    typography: {
        fontFamily: 'Rubik'
    },
    palette: {
        // primary: {
        //     main: "#51BB5C",
        //     hover: "#000000"
        // },
        primary: {
            main: "hsl(220, 100%, 50%)",
            hover: "#000000"
        },
        info: {
            main: "hsl(214, 10%, 13%)"
        },
        whiteOoutlined: {
            main: '#fff',
            contrastText: '#fff',
        }
    },
    components: {
        ...defaultTheme.components,
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
        },
        MuiFormControl: {
            defaultProps: {
                variant: 'outlined',
            },
        },
        MuiTab:{
            styleOverrides: {
                root: {
                    '& .Mui-selected': {
                        background: '#000000'
                    },
                }
            }
        },
        RaList:{
            styleOverrides: {
                root: {
                    '& .MuiToolbar-root' : {
                        background: 'transparent',
                        // boxShadow: '6px 6px 12px #c9c9c9, -6px -6px 12px #ffffff',
                        // borderRadius: '6px'
                    },
                }
            }
        },
        RaDatagrid: {
            styleOverrides: {
              root: {
                boxShadow: '6px 6px 12px #b6b7b9, -6px -6px 12px #ffffff',
                borderColor: 'primary.light',
                '& .MuiDataGrid-cell:hover': {
                    // color: 'primary.main',
                },
                "& .RaDatagrid-row": {
                    padding: '7px'
                },
                "& .RaDatagrid-rowEven": {
                    background: 'hsl(225, 20%, 96%)'
                }
                
                
              }
           }
        },
        RaCreateButton:{
            styleOverrides: {
                root: {
                    "&.RaCreateButton-floating": {
                        background: 'hsl(220, 100%, 50%)',
                        color: "var(--white)",
                        boxShadow: '6px 6px 12px #b6b7b9, -6px -6px 12px #ffffff',

                    }

                }
            }
        },
        RaSaveButton:{
            styleOverrides: {
                root: {
                    background: '#51BB5C',
                    // background: 'linear-gradient(to bottom right, #610212, #E0455F)',
                    color: "var(--white)",
                    '&:hover': {
                        background: '#51BB5C',
                        // background: 'linear-gradient(to bottom right, #610212, #E0455F)',
                        color: "var(--white)",

                    }
                }
            }
        },
        RaTabbedForm: {
            styleOverrides: {
                root: {
                    paddingBottom: '0px !important',
                    "& .Mui-selected":{
                        background: '#242526 !important',

                        color: "var(--white) !important",
                    },
                }
            }
        },
        MuiAppBar:{
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 20px hsla(0, 0%, 0%, 0.06)',
                    // background: 'hsl(357, 86%, 57%)',
                    background: "hsl(0, 0%, 100%);",
                    color: 'var(--onyx)',
                    position: 'fixed'
                }
            }
        },
        MuiCard:{
            styleOverrides:{
                root:{
                    boxShadow: '0 2px 20px hsla(0, 0%, 0%, 0.06)',
                    borderRadius: '6px',
                    margin: '10px'
                }
            }
        },
        RaLayout: {
            styleOverrides: {
              root: {
                  "& .RaLayout-content": {
                    // background: "hsl(225, 20%, 96%);",
                  },
                  "& .RaLayout-contentWithSidebar":{
                    background: '#242526',
                  }
              },
              
           }
        },
        MuiDrawer: {
            styleOverrides:{
                root: {
                    "& .MuiDrawer-paper":{
                        background: '#242526 !important',
                    },
                    "& .RaSidebar-fixed":{
                        background: '#242526',
                    },
                    
                }
            }
        },
        RaMenuItemLink: {
            styleOverrides:{
                root: {
                    color: '#8d9498',
                    margin: '7px 10px',
                    fontSize: '15px',
                    padding: '8px 1px',
                    borderLeft: '3px solid transparent',
                    borderRadius: '6px',

                    "&.RaMenuItemLink:hover, RaMenuItemLink-root:hover":{
                        background: 'var(--onyx)',
                    },
                    '&.RaMenuItemLink-active': {
                        borderLeft: '4px solid hsl(220, 100%, 50%)',
                        // background: 'hsl(220, 100%, 50%)',
                        background: 'var(--onyx)',
                        color: '#fff',
                        '& .RaMenuItemLink-icon': {
                            color: '#fff',
                        }
                    },
                    '& .RaMenuItemLink-icon': {
                        color: '#8d9498',
                    },
                }
            }
        },
        RaTabbedShowLayout: {
            styleOverrides:{
                root: {
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    minWidth: '350px'
                },
            }
          },
    }
};

export default theme;