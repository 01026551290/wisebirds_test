import Gnb from "@/components/Gnb";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Pagination from "@/components/Pagination";
import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";
import {numberComma, numberPercent} from "@/util/common";
import Switch from '@mui/material/Switch';

interface CampaignsInter {
    content: CampaignInter[];
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
interface CampaignInter {
    id: number;
    name: string;
    enabled: boolean;
    campaign_objective: string;
    impressions: number;
    clicks: number;
    ctr: number;
    video_views: number;
    vtr: number;
}
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Campaign = () => {
    const [campaigns, setCampaigns] = useState<CampaignsInter | null>(null)
    const [page, setPage] = useState<number>(1)
    const level = sessionStorage.getItem('level')
    const getCampaigns = async () => {
        const res = await axios({
            method: 'get',
            params: {
                page: page,
                size: 25
            },
            url: '/api/campaigns'
        })
        if (res.status === 200) {
            setCampaigns(res.data)
        }
    }
    const updateStatus = async (id: number) => {
        await axios({
            method: 'patch',
            url: '/api/campaigns/1'
            // url: '/api/campaigns/' + id
        })
    }
    const handlePage = (currentPage: number): void => setPage(currentPage)
    const handleEnabled = (id: number) => updateStatus(id)

    useEffect(() => {
        getCampaigns()
    }, [page])
    return (
        <>
            <Gnb/>
            <$userWrap>
                <$title>
                    <h2>캠페인 관리</h2>
                </$title>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">상태</TableCell>
                                    <TableCell align="left">캠페인명</TableCell>
                                    <TableCell align="left">캠페인 목적</TableCell>
                                    <TableCell align="right">노출수</TableCell>
                                    <TableCell align="right">클릭수</TableCell>
                                    <TableCell align="right">CTR</TableCell>
                                    <TableCell align="right">동영상조회수</TableCell>
                                    <TableCell align="right">VTR</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {campaigns?.content.map((campaign) => (
                                    <TableRow key={campaign.id}>
                                        <TableCell align={'center'}>
                                            {
                                                campaign.enabled ?
                                                    ( level === 'viewer' ?
                                                        <Switch {...label} defaultChecked disabled onChange={() => handleEnabled(campaign.id)}/> :
                                                            <Switch {...label} defaultChecked onChange={() => handleEnabled(campaign.id)}/>
                                                    )
                                                    :
                                                    ( level === 'viewer' ?
                                                            <Switch {...label}  disabled onChange={() => handleEnabled(campaign.id)}/> :
                                                            <Switch {...label}  onChange={() => handleEnabled(campaign.id)}/>
                                                    )
                                            }
                                        </TableCell>
                                        <TableCell align="left">{campaign.name}</TableCell>
                                        <TableCell align="left">{campaign.campaign_objective}</TableCell>
                                        <TableCell align="right">{numberComma(campaign.impressions)}</TableCell>
                                        <TableCell align="right">{numberComma(campaign.clicks)}</TableCell>
                                        <TableCell align="right">{numberPercent(campaign.ctr)}</TableCell>
                                        <TableCell align="right">{campaign.video_views}</TableCell>
                                        <TableCell align="right">{numberPercent(campaign.vtr)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        isFirst={campaigns?.first}
                        isLast={campaigns?.last}
                        totalPages={campaigns?.total_pages}
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

export default Campaign