import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Container } from './styles';
import Image from 'next/image';

import logo from '../../../public/logo-principal.png';

interface DrawerMenuProps {
    open: boolean;
    toggleDrawer: any;
}

export default function DrawerMenu({ open, toggleDrawer }: DrawerMenuProps) {
    const DrawerList = (
        <Container>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                <List sx={{ backgroundColor: '#666666' }}>
                    <Image src={logo} alt="logo-onsafety" />
                </List>
                <List>
                    {[
                        { text: 'Onsafety', link: 'https://onsafety.com.br/' },
                        { text: 'LinkedIn da Jamilly', link: 'https://www.linkedin.com/in/jamillypl/' }
                    ].map((item, index) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component="a" href={item.link} target="_blank">
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );

    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
