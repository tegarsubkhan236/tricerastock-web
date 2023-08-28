import {currencyFormatter} from "./currency";

export const PaginationConfig = (current, pageSize, total, onShowSizeChange, onChange) => {
    return {
        current,
        pageSize,
        total,
        showSizeChanger: true,
        hideOnSinglePage: true,
        showQuickJumper: true,
        showLessItems: true,
        showTotal: (total, range) => `Showing ${currencyFormatter(range[0])} to ${currencyFormatter(range[1])} of ${currencyFormatter(total)} entries`,
        onShowSizeChange,
        onChange,
    }
}