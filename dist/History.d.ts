/// <reference types="react" />
import { HistoryProps } from './Calculator';
interface History {
    data: HistoryProps[];
    open: boolean;
    handleClose?(state?: any): any;
    handleSelect?(state?: any): any;
}
export default function History({ data, open, handleClose, handleSelect, }: History): JSX.Element;
export {};
