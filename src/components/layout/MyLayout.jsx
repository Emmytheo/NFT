// in src/MyLayout.js
import { Layout } from 'react-admin';
import { MyAppBar } from './MyAppBar';
import { MyMenu } from './MyMenu';
// import Dashboard from '../../dashboard';
// import ChildrenLayout from './ChildrenLayout';

export const MyLayout = (props) => {
    return <Layout {...props} menu={MyMenu} appBar={MyAppBar} />;
};