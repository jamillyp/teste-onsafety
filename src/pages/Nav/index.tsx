import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerMenu from '@/components/DrawerMenu';

import logo from '../../../public/logo-principal.png';

import { Container } from './styles';
import Image from 'next/image';

export default function Nav() {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
    };

    return (
        <Container>
            <Box sx={{ flexGrow: 1, background: '#92BF21' }}>
                <DrawerMenu open={openDrawer} toggleDrawer={toggleDrawer} />
                <AppBar position="static" sx={{ backgroundColor: '#666666' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                           <Image src={logo} alt='logo-onsafety' />
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Container>
    );
}