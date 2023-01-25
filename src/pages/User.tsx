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
import {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "@/components/Pagination";

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
    last_login_at: Date;
}
const User = () => {
    const [users, setUsers] = useState<UsersInter | null>(null)
    const [page, setPage] = useState<number>(1)
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
                <$creatBtn>생성</$creatBtn>
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
                                        <TableCell align="right">수정</TableCell>
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

export default User