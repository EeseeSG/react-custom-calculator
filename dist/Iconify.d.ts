/// <reference types="react" />
import { IconifyIcon } from '@iconify/react';
import { BoxProps, SxProps } from '@mui/material';
interface Props extends BoxProps {
    sx?: SxProps;
    icon: IconifyIcon;
}
export default function Iconify({ icon, sx, ...other }: Props): JSX.Element;
export {};
