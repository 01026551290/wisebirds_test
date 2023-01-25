import * as React from 'react';
import styled from "styled-components";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useEffect, useState} from "react";
import { useLocation, Link } from 'react-router-dom';

const Gnb = () => {
    const location = useLocation();
    const [level, setLevel] = useState<string>('admin');
    const [open, setOpen] = useState<boolean>(false);
    const [tooltipContent, setTooltipContent] = useState<string>('')
    const [isHome, setIsHome] = useState<boolean>(true)
    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };
    const handleChange = (event: SelectChangeEvent) => {
        setLevel(event.target.value as string);
    };
    useEffect(() => {
        setTooltipContent('홍길동 abc@abc.com, 와이즈버드')
        if (location.pathname.includes('user')) setIsHome(false)
    }, [])
    return (
        <$headerWrap>
            <$headerInner>
                <$itemWrap>
                    Wisebirds
                </$itemWrap>
                <$itemWrap style={{backgroundColor: isHome ? '#6495ed' : ''}}>
                    <Link to={'/'}>캠페인</Link>
                </$itemWrap>
                {
                    level === 'admin' &&
                    <$itemWrap style={{backgroundColor: !isHome ? '#6495ed' : ''}}>
                        <Link to={'/user'}>사용자</Link>
                    </$itemWrap>
                }
            </$headerInner>
            <$headerInner>
                <div>
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                        <Tooltip
                            title={tooltipContent}
                            arrow
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={handleTooltipClose}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                        >
                            <$infoWrap onClick={handleTooltipOpen}>
                                <PermIdentityIcon/> abc@abc.com
                            </$infoWrap>
                        </Tooltip>
                    </ClickAwayListener>
                </div>
                <$selectWrap>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">level</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={level}
                            label="level"
                            onChange={handleChange}
                        >
                            <MenuItem value={'admin'}>어드민</MenuItem>
                            <MenuItem value={'manager'}>매니저</MenuItem>
                            <MenuItem value={'viewer'}>뷰어</MenuItem>
                        </Select>
                    </FormControl>
                </$selectWrap>
            </$headerInner>
        </$headerWrap>
    )
}

const $headerWrap = styled.div`
  border: 1px solid #000;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #87ceeb;
  color: #fff;
`;
const $headerInner = styled.div`
  display: flex;
`;
const $itemWrap = styled.div`
  padding: 20px;
  cursor: pointer;
`;
const $infoWrap = styled($itemWrap)`
  display: flex;
  gap: 5px;
`;
const $selectWrap = styled.div`
    padding: 5px;
`;
export default Gnb;