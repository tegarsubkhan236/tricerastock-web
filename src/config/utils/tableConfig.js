import {useDispatch} from "react-redux";
import {currencyFormatter} from "./currency";

export const PaginationConfig = (current, pageSize, total, onShowSizeChange, onChange) => {
    const dispatch = useDispatch()
    return {
        current: current,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        hideOnSinglePage: true,
        showTotal: (total, range) => `Showing ${currencyFormatter(range[0])} to ${currencyFormatter(range[1])} of ${currencyFormatter(total)} entries`,
        onShowSizeChange: (current, size) => dispatch(onShowSizeChange(size)),
        onChange: (page) => dispatch(onChange(page)),
    }
}