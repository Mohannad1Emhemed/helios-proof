import { click, dblClick, tripleClick, hover, unhover, tab } from '../convenience';
import { keyboard } from '../keyboard';
import { copy, cut, paste } from '../clipboard';
import { pointer } from '../pointer';
import { clear, deselectOptions, selectOptions, type, upload } from '../utility';
export declare const userEventApi: {
    click: typeof click;
    dblClick: typeof dblClick;
    tripleClick: typeof tripleClick;
    hover: typeof hover;
    unhover: typeof unhover;
    tab: typeof tab;
    keyboard: typeof keyboard;
    copy: typeof copy;
    cut: typeof cut;
    paste: typeof paste;
    pointer: typeof pointer;
    clear: typeof clear;
    deselectOptions: typeof deselectOptions;
    selectOptions: typeof selectOptions;
    type: typeof type;
    upload: typeof upload;
};
