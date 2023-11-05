import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { AppBar } from 'react-admin';
import Logo from '../../dashboard/images/logo.webp';
// import Icon from '../../dashboard/images/icon.png';

export const MyAppBar = (props) => {
    const { title } = props;
    const [tog, setTog ] = React.useState(false);
    const titleRef = React.useRef()
    // console.log(title)

    useEffect(()=>{
        // setTog(false);
        // if(titleRef.current.children.length > 0){
        //     setTog(true)
        // }
        // else{
        //     setTog(false)
        // }
    })

    return <AppBar        sx={{
            "& .RaAppBar-title": {
                flex: 1,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
            },
            // position: 'fixed'
        }}
        {...props}
    >
        <Stack direction='row' width='100%' spacing={2} alignItems='center' justifyContent='center'>
            {
                !tog ? 
                (
                    <>
                    {/* <img src={Logo} alt="Logo" height={40} /> */}
                    </>
                ) : (
                    <>
                    {/* <img src={Icon} alt="Icon" height={40} /> */}
                    </>
                )
                
            }
            <img src={Logo} alt="Logo" height={25} width={200} />
            {/* <Typography
                        variant="h6"
                        color="inherit"
                        // className={classes.title
                        id="react-admin-title"
                        ref={titleRef}
                        sx={{
                            // flex: 1,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                        }}
                    /> */}
        </Stack>
        {/* <span className={classes.spacer} /> */}
    </AppBar>
};