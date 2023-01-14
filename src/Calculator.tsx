// react
import { useState, useEffect, } from 'react';
// mui
import { Typography, Chip, Button, Box, ButtonGroup, Divider, Grid, IconButton, Stack, useTheme } from '@mui/material';
import { styled } from '@mui/system';
// mathjs
import { evaluate, } from "mathjs";
// asset
import Iconify from '../Iconify';
import historyIcon from '@iconify/icons-tabler/history';
// utils
import { formatToThousands } from './utils';
// components
import History from './History';
import TextMaxLine from '../TextMaxLine';

// ---------------------------------------------------------------

const CalculatorButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.default
}))

// ---------------------------------------------------------------

export const buttonOptions = [
    [
        { 
            label: "",
            value: "",
        }, 
        {
            label: "",
            value: "",
        }, 
        {
            label: "Del",
            value: "Backspace",
        }, 
        {
            label: "AC",
            value: "AC",
        }
    ],
    [
        { 
            label: " ( ",
            value: "(",
        }, 
        {
            label: " ) ",
            value: ")",
        }, 
        {
            label: " % ",
            value: "%",
        }, 
        {
            label: " ÷ ",
            value: "/"
        },
    ],
    [
        {
            label: "7",
            value: "7",
        }, 
        { 
            label: "8",
            value: "8",
        }, 
        {
            label: "9",
            value: "9",
        }, 
        {
            label: " × ",
            value: "*",
        },
    ],
    [
        {
            label: "4",
            value: "4",
        }, 
        {
            label: "5",
            value: "5",
        }, 
        {
            label: "6",
            value: "6",
        }, 
        {
            label: " - ",
            value: "-",
        },
    ],
    [
        {
            label: "1",
            value: "1",
        }, 
        {
            label: "2",
            value: "2",
        }, 
        {
            label: "3",
            value: "3",
        }, 
        {
            label: " + ",
            value: "+",
        },
    ],
    [
        {
            label: "0",
            value: "0",
        }, 
        {
            label: ".",
            value: ".",
        }, 
        {
            label: "=",
            value: "Enter",
        }, 
        {
            label: "",
            value: "",
        }, 
    ]
]

// ---------------------------------------------------------------

export type HistoryProps = {
    display: string;
    input: string;
    result: string;
}

type InputProps = {
    label: string;
    value: string;
}

// ---------------------------------------------------------------

export default function Calculator() {
    const theme = useTheme();
    const [history, setHistory] = useState<HistoryProps[]>([]);
    const [display, setDisplay] = useState<string>('');
    const [input, setInput] = useState<string>('');

    const resetCurrent = () => {
        setDisplay('');
        setInput('');
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleClick = (val:InputProps) => {
        try {
            if(val.value === 'Enter') {
                console.log('input', input)
                console.log('entered')
                const result = evaluate(input).toString();
                setHistory([...history, { display, input, result }]);
                resetCurrent();
    
                // set the answer to next value
                setDisplay(result)
                setInput(result)
                return
            }
            if(val.value === 'AC') {
                resetCurrent();
                return
            }
            if(val.value === 'Backspace') {
                // for display value, if it is not a number, there is whitespace before and after the 
                // mathematical function. 
                // This whitespace is used to format the numbers with thousand separators
                // see `utils` file.
                // offset by `3` times because there is whitespace front and back.
                const offset = display[display.length-1] === ' ' ? 3 : 1; 
                const newDisplay = display.slice(0, display.length - offset);
                setDisplay(newDisplay);
                
                // convert to mathjs friendly string
                const newInput = input.slice(0,display.length-1);
                setInput(newInput);
                return
            }
            
            // show user what they have entered
            const newDisplay = display+val.label;
            setDisplay(newDisplay);
    
            // convert to mathjs friendly string
            const newInput = input+val.value;
            setInput(newInput);

        } catch(err) {
            console.error(err)
        }
        return
    }


    // Keyboard
    useEffect(() => {
        const actions = (e: globalThis.KeyboardEvent) => {
            const keyPressed = e.key;
            const keyMapped = buttonOptions.flat(1).find((item:InputProps) => item.value === keyPressed)
            if(keyMapped === undefined) {
                return
            }
            handleClick(keyMapped)
        }
        window.addEventListener('keydown', actions, false);
        return () => window.removeEventListener('keydown', actions, false);
    }, [handleClick]);

    // History Modal
    const [openHistory, setOpenHistory] = useState<boolean>(false);
    const handleOpenHistory = () => {
        setOpenHistory(true)
    }
    const handleCloseHistory = () => {
        setOpenHistory(false);
    }
    const handleSelectHistory = (data:HistoryProps) => {
        setDisplay(data.result)
        setInput(data.result)
    }

    console.log('test')

    return (
        <Box 
            style={{ 
                backgroundColor: theme.palette.grey[200], 
            }}
            sx={{ 
                border: 1,
                borderColor: 'grey.300',
                borderRadius: 1,
                p: 2,
            }}
        >
            <Grid container >
                {/** Title */}
                <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography variant='h5'>Calculator</Typography>
                </Grid>
                {/** Display */}
                <Grid item xs={12} 
                    style={{ backgroundColor: theme.palette.background.paper }}
                    sx={{ p: 1, border: 1, borderRadius: 1, borderColor: 'primary.light', mb: 1, height: 100  }}
                >
                    <Stack direction="row" sx={{ justifyContent: 'space-between', }}>
                        {history.length !== 0 && (
                            <Stack direction="row" alignItems="center">
                                <Chip label={history.length} size="small" />
                                <IconButton size="small" onClick={handleOpenHistory}>
                                    <Iconify icon={historyIcon}/>
                                </IconButton>
                            </Stack>
                        )}
                        <TextMaxLine align='right' variant='body1' sx={{ height: 35, color: 'grey.500', pr: 3 }} line={1}>
                            {history.length === 0 
                                ? ' ' 
                                : formatToThousands(history[history.length-1].display + " = " + history[history.length-1].result)
                            }
                        </TextMaxLine>
                    </Stack>
                    <Divider />
                    <Typography align='right' variant='h3' sx={{ height: 50, }}>{formatToThousands(display)}</Typography>
                </Grid>

                {/** Content */}
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        {buttonOptions.map((group, index) => (
                            <Grid key={index+"-group"} item xs={12}>
                                <ButtonGroup variant="outlined" fullWidth>
                                    {group.map((btn, index) => (
                                        <CalculatorButton 
                                            key={index+"-btn"}
                                            onClick={() => handleClick(btn)}
                                        >
                                            {btn.label}
                                        </CalculatorButton>
                                    ))}
                                </ButtonGroup>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <History 
                data={history}
                open={openHistory}
                handleClose={handleCloseHistory}
                handleSelect={handleSelectHistory}
            />
        </Box>
    )
}