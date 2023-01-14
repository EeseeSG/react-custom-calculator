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
import * as React from 'react';
// mui
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, Slide, Chip, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, } from '@mui/material';
// assets
import Iconify from '../Iconify';
import arrowBarRight from '@iconify/icons-tabler/arrow-bar-right';
import { formatToThousands } from './utils';
// --------------------------------------------------------------
var Transition = React.forwardRef(function Transition(props, ref) {
    return _jsx(Slide, __assign({ direction: "up", ref: ref }, props));
});
export default function History(_a) {
    var data = _a.data, open = _a.open, _b = _a.handleClose, handleClose = _b === void 0 ? function () { } : _b, _c = _a.handleSelect, handleSelect = _c === void 0 ? function () { } : _c;
    var onSelect = function (item) {
        handleClose();
        handleSelect(item);
    };
    return (_jsx("div", { children: _jsxs(Dialog, __assign({ open: open, TransitionComponent: Transition, keepMounted: true, onClose: handleClose, "aria-describedby": "calculator-history", fullWidth: true, maxWidth: "xs" }, { children: [_jsx(DialogTitle, { children: "History" }), _jsx(DialogContent, { children: _jsx(List, __assign({ sx: { width: '100%', bgcolor: 'background.paper' } }, { children: __spreadArray([], data, true).reverse().map(function (item, index) { return (_jsxs("div", { children: [_jsxs(ListItem, __assign({ secondaryAction: _jsx(IconButton, __assign({ "aria-label": "select", onClick: function () { return onSelect(item); } }, { children: _jsx(Iconify, { icon: arrowBarRight }) })) }, { children: [_jsx(ListItemIcon, __assign({ sx: { borderRadius: 1 } }, { children: _jsx(Chip, { label: data.length - index, color: "primary" }) })), _jsx(ListItemText, { primary: formatToThousands(item.display + " = " + item.result) })] })), _jsx(Divider, {})] }, index)); }) })) }), _jsx(DialogActions, { children: _jsx(Button, __assign({ onClick: handleClose }, { children: "Close" })) })] })) }));
}
