import Gnb from "@/components/Gnb";
import styled from "styled-components";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ExploreIcon from '@mui/icons-material/Explore';
import ExploreOffIcon from '@mui/icons-material/ExploreOff';

interface UsersInter {
    content: UserInter[];
    total_elements: number;
    total_pages: number;
    last: boolean;
    number: number;
    size: number;
    sort: object
    number_of_elements: number;
    first: boolean;
    empty: boolean;
}
interface UserInter {
    id: number;
    email: string;
    name: string;
    last_login_at: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const User = () => {
    const [users, setUsers] = useState<UsersInter | null>(null)
    const [page, setPage] = useState<number>(1)
    const [open, setOpen] = useState<boolean>(false)
    const [update, setUpdate] = useState<boolean>(false)
    const [idErrorContent, setIdErrorContent] = useState<string>('아이디(이메일)을 입력하세요.');
    const [pwErrorContent, setPwErrorContent] = useState<string>('비밀번호를 입력하세요.');
    const [checkPwErrorContent, setCheckPwErrorContent] = useState<string>('비밀번호를 입력하세요.');
    const [nameErrorContent, setNameErrorContent] = useState<string>('이름을 입력해주세요');
    const [passwordToggle, setPasswordToggle] = useState<boolean>(false);
    const [checkPasswordToggle, setCheckPasswordToggle] = useState<boolean>(false);
    const inputRef = useRef<Array<any>>([])
    const [updateUser, setUpdateUser] = useState<UserInter | null>(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleUpdate = () => setUpdate(true);
    const handleUpdateClose = () => setUpdate(false);
    const getUsers = async () => {
        const res = await axios({
            method: 'get',
            params: {
                page: page,
                size: 25
            },
            url: '/api/users'
        })
        if (res.status === 200) {
            setUsers(res.data)
        }
    }
    const handlePage = (currentPage: number): void => {
        setPage(currentPage)
    }
    const handleChangeId = () => {
        const check_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        const idValue = inputRef.current[0].children[0].children[0].value
        if (idValue.length >= 1) {
            if ((idValue.length >= 9 && idValue.length <= 50) && check_email.test(idValue))
                setIdErrorContent('')
            else
                setIdErrorContent('올바른 이메일 주소를 입력하세요.')
        } else
            setIdErrorContent('아이디(이메일)을 입력하세요.')
    }
    const checkDupleId = async () => {
        // const idValue = inputRef.current[0].children[0].children[0].value
        const idValue = 'abc@abc.com'
        const res = await axios({
            method: 'get',
            url: '/api/users/' + idValue + '/exists'
        })
        if (res.status === 200) {
            if (res.data.result)
                setIdErrorContent('이미 사용중인 이메일입니다. 다른 이메일을 입력하세요. .')
        }
    }
    const handleChangePw = () => {
        const check_num = /[0-9]/;
        const check_spc = /[~!@#$%^&*()_+|<>?:{}]/;
        const check_eng = /[a-zA-Z]/;
        const pwValue = inputRef.current[1].children[0].children[0].value
        if (pwValue.length >= 1) {
            if ((pwValue.length >= 8 && pwValue.length <= 15) && check_num.test(pwValue) && check_spc.test(pwValue) && check_eng.test(pwValue) )
                setPwErrorContent('')
            else
                setPwErrorContent('8~15자 영문, 숫자, 특수문자를 사용하세요')
        } else
            setPwErrorContent('비밀번호를 입력하세요.')
    }
    const handleChangeCheckPw = () => {
        const pwValue = inputRef.current[1].children[0].children[0].value
        const checkPwValue = inputRef.current[2].children[0].children[0].value
        if (checkPwValue.length >= 1) {
            if (pwValue === checkPwValue)
                setCheckPwErrorContent('')
            else
                setCheckPwErrorContent('비밀번호가 일치하지 않습니다.')
        } else
            setCheckPwErrorContent('비밀번호를 입력하세요.')
    }
    const handleChangeName = () => {
        const nameValue = inputRef.current[3].children[0].children[0].value
        const check_num = /[0-9]/;
        const check_spc = /[~!@#$%^&*()_+|<>?:{}]/;
        if (nameValue.length >= 1) {
            setNameErrorContent('')
            if(check_num.test(nameValue) || check_spc.test(nameValue))
                setNameErrorContent('이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)')
        }
        if (nameValue.length === 0)
            setNameErrorContent('이름을 입력해주세요')
    }
    const handlePwToggle = (isShow: boolean, isCheck: boolean) => {
        !isCheck ? setPasswordToggle(isShow) : setCheckPasswordToggle(isShow)
    }
    const sendUserData = async () => {
        const idValue = inputRef.current[0].children[0].children[0].value
        const pwValue = inputRef.current[1].children[0].children[0].value
        const checkPwValue = inputRef.current[2].children[0].children[0].value
        const nameValue = inputRef.current[3].children[0].children[0].value
        let formData = new FormData();
        formData.append('name', nameValue)
        formData.append('email', idValue)
        formData.append('password', pwValue)
        formData.append('repeat_password', checkPwValue)
        const res = await axios({
            method: 'post',
            url: '/api/users/',
            data: formData
        })
        if (res.status === 200) {
            console.log('res', res)
            const newUser: UserInter = {
                id: res.data.id,
                email: idValue,
                name: nameValue,
                last_login_at: new Date().toISOString()
            }
            users?.content.push(newUser)
            setUsers(users)
            setOpen(false)
        }
    }

    const handleUpdateUser = (user: UserInter) => {
        setUpdateUser(user)
        setUpdate(true)
    }
    const updateUserData = async () => {
        const nameValue = inputRef.current[3].children[0].children[0].value
        let formData = new FormData();
        formData.append('name', nameValue)
        const res = await axios({
            method: 'patch',
            url: '/api/users/1',
            data: formData
            // url: '/api/campaigns/' + updateUser?.id
        })
        if (res.status === 200) {
            console.log('res', res)
            users?.content.map(user => {
                if (user.id === updateUser?.id)
                    user.name = nameValue
            })
            setUsers(users)
            setUpdate(false)
        }
    }
    useEffect(() => {
        getUsers()
    }, [page])
    return (
        <>
            <Gnb/>
            <$userWrap>
                <$title>
                    <h2>사용자 관리</h2>
                </$title>
                <$creatBtn onClick={handleOpen}>생성</$creatBtn>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>아이디</TableCell>
                                    <TableCell align="right">이름</TableCell>
                                    <TableCell align="right">마지막 로그인 일시</TableCell>
                                    <TableCell align="right">수정</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users?.content.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell component="th" scope="row">
                                            {user.email}
                                        </TableCell>
                                        <TableCell align="right">{user.name}</TableCell>
                                        <TableCell align="right">{user.last_login_at}</TableCell>
                                        <TableCell align="right" onClick={() => handleUpdateUser(user)}>수정</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        isFirst={users?.first}
                        isLast={users?.last}
                        totalPages={users?.total_pages}
                        page={page}
                        onPageChange={handlePage}
                    />
                </div>
            </$userWrap>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        사용자 생성
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <$formBox>
                            <label>아이디</label>
                            <TextField
                                required
                                id="outlined-required"
                                helperText={idErrorContent}
                                onChange={handleChangeId}
                                ref={el => (inputRef.current[0] = el)}
                            />
                            <Button variant="outlined" onClick={checkDupleId}>중복체크</Button>
                        </$formBox>
                        <$formBox>
                            <label>비밀번호</label>
                            <TextField
                                required
                                id="outlined-password-input"
                                type={!passwordToggle ? 'password' : ''}
                                placeholder="“영문, 숫자, 특수문자 조합 8~15자"
                                helperText={pwErrorContent}
                                onChange={handleChangePw}
                                ref={el => (inputRef.current[1] = el)}
                            />
                            <div>
                                {
                                    passwordToggle ?
                                        <ExploreIcon onClick={() => handlePwToggle(false, false)}/>
                                        :
                                        <ExploreOffIcon onClick={() => handlePwToggle(true, false)}/>
                                }
                            </div>
                        </$formBox>
                        <$formBox>
                            <label>비밀번호 확인</label>
                            <TextField
                                required
                                id="outlined-password-input"
                                type={!checkPasswordToggle ? 'password' : ''}
                                helperText={checkPwErrorContent}
                                onChange={handleChangeCheckPw}
                                ref={el => (inputRef.current[2] = el)}
                            />
                            <div>
                                {
                                    checkPasswordToggle ?
                                        <ExploreIcon onClick={() => handlePwToggle(false, true)}/>
                                        :
                                        <ExploreOffIcon onClick={() => handlePwToggle(true, true)}/>
                                }
                            </div>
                        </$formBox>
                        <$formBox>
                            <label>이름</label>
                            <TextField
                                required
                                id="outlined-required"
                                helperText={nameErrorContent}
                                ref={el => (inputRef.current[3] = el)}
                                onChange={handleChangeName}
                            />
                        </$formBox>
                    </Typography>
                    <$formBtnWrap>
                        <Button variant="outlined" onClick={handleClose}>취소</Button>
                        <Button variant="contained" onClick={sendUserData}>생성</Button>
                    </$formBtnWrap>
                </Box>
            </Modal>
            <Modal open={update}
                   onClose={handleUpdateClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        사용자 수정
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <$formBox>
                            <label>아이디</label>
                            <TextField
                                defaultValue={updateUser?.email}
                                InputProps={{
                                    readOnly: true,
                                }}
                                id="outlined-required"
                            />
                        </$formBox>
                        <$formBox>
                            <label>이름</label>
                            <TextField
                                required
                                id="outlined-required"
                                defaultValue={updateUser?.name}
                                helperText={nameErrorContent}
                                ref={el => (inputRef.current[3] = el)}
                                onChange={handleChangeName}
                            />
                        </$formBox>
                    </Typography>
                    <$formBtnWrap>
                        <Button variant="outlined" onClick={handleUpdateClose}>취소</Button>
                        <Button variant="contained" onClick={updateUserData}>저장</Button>
                    </$formBtnWrap>
                </Box>
            </Modal>
        </>
    )
}

const $userWrap = styled.div`
  margin-top: 80px;
`
const $title = styled.div`;
  border-bottom: 1px solid skyblue;
`
const $creatBtn = styled.div`
  color: #fff;
  background-color: #535bf2;
  cursor: pointer;
  padding: 5px;
  width: fit-content;
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 10px;
`
const $formBox = styled.div`
  display: flex;
  flex-direction: column;
`
const $formBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid skyblue;
  margin-top: 20px;
`
export default User