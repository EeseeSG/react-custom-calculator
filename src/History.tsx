import * as React from 'react';
// mui
import { 
    Button, 
    Dialog, 
    DialogContent, 
    DialogActions, 
    DialogTitle, 
    Slide, 
    Chip, 
    Divider, 
    IconButton, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
// @types
import { HistoryProps } from './Calculator';
// assets
import Iconify from './Iconify';
import arrowBarRight from '@iconify/icons-tabler/arrow-bar-right';
import { formatToThousands } from './utils';

// --------------------------------------------------------------

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// --------------------------------------------------------------

interface History {
    data: HistoryProps[];
    open: boolean;
    handleClose?(state?:any): any;
    handleSelect?(state?:any): any;
}

export default function History({ data, open, handleClose=()=>{}, handleSelect=()=>{}, } : History) {

    const onSelect = (item:HistoryProps) => {
        handleClose();
        handleSelect(item);
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="calculator-history"
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>History</DialogTitle>
                <DialogContent>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {[...data].reverse().map((item, index) => (
                            <div key={index}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton aria-label="select" onClick={() => onSelect(item)}>
                                            <Iconify icon={arrowBarRight}/>
                                        </IconButton>
                                    }
                                >
                                    <ListItemIcon sx={{ borderRadius: 1 }}>
                                        <Chip label={data.length - index} color="primary"/>
                                    </ListItemIcon>
                                    <ListItemText primary={formatToThousands(item.display + " = " + item.result)} />
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}