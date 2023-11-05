import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress,
    Stack,
    useMediaQuery,
} from '@mui/material';
import Box from '@mui/material/Box';
import {
    Form,
    PasswordInput,
    TextInput,
    email,
    maxLength,
    minLength,
    required,
    useLogin,
    useNotify,
    useRedirect,
    useStore,
    useTranslate
} from 'react-admin';
import client from "../../client";
import bg from "../../dashboard/images/bg.jpg";


const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const [user, setUser] = useStore('user');

    const redirect = useRedirect();
    const notify = useNotify();
    const login = useLogin();
    const location = useLocation();

    const handleSubmit = (auth) => {
        setLoading(true);
        client.service('webhooks').create({
            ...auth,
            verifiedsource: true
        })
        .then((usr)=>{
            // setUser(usr);
            notify('Password Changed', {type: 'success'});
            redirect('/login');
        })
        .catch((error) => {
            setLoading(false);
            notify(
                typeof error === 'string'
                    ? error
                    : typeof error === 'undefined' || !error.message
                    ? 'Account Recovery Error'
                    : error.message,
                {
                    type: 'warning',
                    messageArgs: {
                        _:
                            typeof error === 'string'
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    // background: 'url(https://source.unsplash.com/random/1600x900)',
                    background: 'linear-gradient(-45deg, #610212, #E0455F)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Card sx={{ minWidth: 300, marginY: '3em', padding: '20px 10px' }}>
                    <Box
                        sx={{
                            margin: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ bgcolor: 'info.main' }}>
                            K
                        </Avatar>
                        <p style={{marginLeft:'5px'}} className='card-title'>KUGATEL</p>

                    </Box>
                    <Box
                        sx={{
                            marginTop: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: theme => theme.palette.grey[500],
                        }}
                    >
                        Oops, Locked out again?,<br/>
                        Verify your account here to recover it.
                    </Box>
                    <Stack spacing={0} sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextInput
                                autoFocus
                                source="email"
                                label={translate('Your Email')}
                                disabled={loading}
                                validate={[required(), email()]}
                                fullWidth
                            />
                        </Box>

                        <Stack spacing={1} direction='row' flexWrap='wrap' sx={{ marginTop: '1em' }}>
                            <TextInput
                                autoFocus
                                source="firstname"
                                type='text'
                                label={translate('FirstName')}
                                disabled={loading}
                                validate={required()}
                                fullWidth = {isSmall ? true : false }
                            />
                            <TextInput
                                source="phone"
                                label={translate('Your Phone')}
                                type="text"
                                disabled={loading}
                                validate={[required(), maxLength(11)]}
                                fullWidth = {isSmall ? true : false }
                            />
                        </Stack>
                        <Stack spacing={1} direction='row' flexWrap='wrap' sx={{ marginTop: '1em' }}>
                            <PasswordInput
                                source="password"
                                label={translate('ra.auth.password')}
                                disabled={loading}
                                validate={[required(), minLength(6)]}
                                fullWidth = {isSmall ? true : false }
                            />
                            <PasswordInput
                                source="verify-password"
                                label={translate('ra.auth.password')}
                                disabled={loading}
                                validate={[required(), minLength(6)]}
                                fullWidth = {isSmall ? true : false }
                            />
                        </Stack>
                    </Stack>
                    <CardActions sx={{ padding: '0 1em 1em 1em', marginY: '1em' }}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                            fullWidth
                        >
                            {loading && (
                                <CircularProgress size={25} thickness={2} />
                            )}
                            {translate('Change Password')}
                        </Button>
                    </CardActions>
                    <Stack paddingX={1} justifyContent='center' alignItems='center' fontSize={14}>
                        <span>Still Remember it?</span>
                        <Stack direction='row' 
                            justifyContent='center' 
                            alignItems='center'

                        >
                            <Button onClick={()=>{redirect('/login')}} variant="text" color="primary" style={{minWidth: 'max-content', padding: '0px', marginInline: '5px', textTransform: 'none' }}>Login</Button>
                            <span>instead.</span>
                        </Stack>
                    </Stack>
                </Card>
            </Box>
        </Form>
    );
};

ForgotPassword.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

export default ForgotPassword;










