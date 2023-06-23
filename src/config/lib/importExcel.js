import ExcelJS from 'exceljs';

export const importExcel = async (file) => {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file.originFileObj);
        const worksheet = workbook.worksheets[0];
        const data = [];

        worksheet.eachRow((row, rowNumber) => {
            const rowData = [];
            row.eachCell((cell) => {
                rowData.push(cell.value);
            });
            data.push(rowData);
        });

        data.pop() // remove last object in array
        data.splice(0,4) // remove object index 0,1,2 and 3 in array

        return data
    } catch (error) {
        return error
    }
}