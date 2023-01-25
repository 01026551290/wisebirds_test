import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styled from "styled-components";
interface Props {
    totalPages: number;
    page: number;
    isFirst: boolean;
    isLast: boolean;
    onPageChange: (page: number) => void; // 페이지 선택시 함수
}

const Pagination = ({totalPages, page, isFirst, isLast, onPageChange}: Props) => {
    return (
        <$paginationWrap>
            {
                !isFirst && <ArrowBackIosIcon />
            }
            {
                Array.from({length: totalPages}).map(((_, index) => (
                    <$paginationNum onClick={() => onPageChange(index + 1)} style={{textDecoration: index + 1 === page ? 'underLine' : ''}}>
                        {index + 1}
                    </$paginationNum>
                    )))
            }
            {
                !isLast && <ArrowForwardIosIcon/>
            }
        </$paginationWrap>
    )
}

const $paginationWrap = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 30px;
  align-items: center;
`
const $paginationNum = styled.div`
  padding: 5px;
  cursor: pointer;
`
export default Pagination;