import {currencyFormatter} from "./currency";

export const PaginationConfig = (current, pageSize, total, onShowSizeChange, onChange) => {
    return {
        current: current,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        hideOnSinglePage: true,
        showTotal: (total, range) => `Showing ${currencyFormatter(range[0])} to ${currencyFormatter(range[1])} of ${currencyFormatter(total)} entries`,
        onShowSizeChange: onShowSizeChange,
        onChange: onChange,
    }
}