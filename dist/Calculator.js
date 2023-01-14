var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// react
import { useState, useEffect, } from 'react';
// mui
import { Typography, Chip, Button, Box, ButtonGroup, Divider, Grid, IconButton, Stack, useTheme } from '@mui/material';
import { styled } from '@mui/system';
// mathjs
import { evaluate, } from "mathjs";
// asset
import Iconify from './Iconify';
import historyIcon from '@iconify/icons-tabler/history';
// utils
import { formatToThousands } from './utils';
// components
import History from './History';
// ---------------------------------------------------------------
var CalculatorButton = styled(Button)(function (_a) {
    var theme = _a.theme;
    return ({
        backgroundColor: theme.palette.background.default
    });
});
// ---------------------------------------------------------------
export var buttonOptions = [
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
];
// ---------------------------------------------------------------
export default function Calculator() {
    var theme = useTheme();
    var _a = useState([]), history = _a[0], setHistory = _a[1];
    var _b = useState(''), display = _b[0], setDisplay = _b[1];
    var _c = useState(''), input = _c[0], setInput = _c[1];
    var resetCurrent = function () {
        setDisplay('');
        setInput('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var handleClick = function (val) {
        try {
            if (val.value === 'Enter') {
                console.log('input', input);
                console.log('entered');
                var result = evaluate(input).toString();
                setHistory(__spreadArray(__spreadArray([], history, true), [{ display: display, input: input, result: result }], false));
                resetCurrent();
                // set the answer to next value
                setDisplay(result);
                setInput(result);
                return;
            }
            if (val.value === 'AC') {
                resetCurrent();
                return;
            }
            if (val.value === 'Backspace') {
                // for display value, if it is not a number, there is whitespace before and after the 
                // mathematical function. 
                // This whitespace is used to format the numbers with thousand separators
                // see `utils` file.
                // offset by `3` times because there is whitespace front and back.
                var offset = display[display.length - 1] === ' ' ? 3 : 1;
                var newDisplay_1 = display.slice(0, display.length - offset);
                setDisplay(newDisplay_1);
                // convert to mathjs friendly string
                var newInput_1 = input.slice(0, display.length - 1);
                setInput(newInput_1);
                return;
            }
            // show user what they have entered
            var newDisplay = display + val.label;
            setDisplay(newDisplay);
            // convert to mathjs friendly string
            var newInput = input + val.value;
            setInput(newInput);
        }
        catch (err) {
            console.error(err);
        }
        return;
    };
    // Keyboard
    useEffect(function () {
        var actions = function (e) {
            var keyPressed = e.key;
            var keyMapped = buttonOptions.flat(1).find(function (item) { return item.value === keyPressed; });
            if (keyMapped === undefined) {
                return;
            }
            handleClick(keyMapped);
        };
        window.addEventListener('keydown', actions, false);
        return function () { return window.removeEventListener('keydown', actions, false); };
    }, [handleClick]);
    // History Modal
    var _d = useState(false), openHistory = _d[0], setOpenHistory = _d[1];
    var handleOpenHistory = function () {
        setOpenHistory(true);
    };
    var handleCloseHistory = function () {
        setOpenHistory(false);
    };
    var handleSelectHistory = function (data) {
        setDisplay(data.result);
        setInput(data.result);
    };
    console.log('test');
    return (_jsxs(Box, __assign({ style: {
            backgroundColor: theme.palette.grey[200],
        }, sx: {
            border: 1,
            borderColor: 'grey.300',
            borderRadius: 1,
            p: 2,
        } }, { children: [_jsxs(Grid, __assign({ container: true }, { children: [_jsx(Grid, __assign({ item: true, xs: 12, sx: { mb: 1 } }, { children: _jsx(Typography, __assign({ variant: 'h5' }, { children: "Calculator" })) })), _jsxs(Grid, __assign({ item: true, xs: 12, style: { backgroundColor: theme.palette.background.paper }, sx: { p: 1, border: 1, borderRadius: 1, borderColor: 'primary.light', mb: 1, height: 100 } }, { children: [_jsxs(Stack, __assign({ direction: "row", sx: { justifyContent: 'space-between', } }, { children: [history.length !== 0 && (_jsxs(Stack, __assign({ direction: "row", alignItems: "center" }, { children: [_jsx(Chip, { label: history.length, size: "small" }), _jsx(IconButton, __assign({ size: "small", onClick: handleOpenHistory }, { children: _jsx(Iconify, { icon: historyIcon }) }))] }))), _jsx(Typography, __assign({ align: 'right', variant: 'body1', sx: {
                                            height: 35,
                                            color: 'grey.500',
                                            pr: 3,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical'
                                        } }, { children: history.length === 0
                                            ? ' '
                                            : formatToThousands(history[history.length - 1].display + " = " + history[history.length - 1].result) }))] })), _jsx(Divider, {}), _jsx(Typography, __assign({ align: 'right', variant: 'h3', sx: { height: 50, } }, { children: formatToThousands(display) }))] })), _jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(Grid, __assign({ container: true, spacing: 1 }, { children: buttonOptions.map(function (group, index) { return (_jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsx(ButtonGroup, __assign({ variant: "outlined", fullWidth: true }, { children: group.map(function (btn, index) { return (_jsx(CalculatorButton, __assign({ onClick: function () { return handleClick(btn); } }, { children: btn.label }), index + "-btn")); }) })) }), index + "-group")); }) })) }))] })), _jsx(History, { data: history, open: openHistory, handleClose: handleCloseHistory, handleSelect: handleSelectHistory })] })));
}
