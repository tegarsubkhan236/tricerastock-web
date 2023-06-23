import {saveAs} from "file-saver"
import ExcelJS from 'exceljs';
import {getStore} from "../helper/storeInjector";

export const exportExcel = async (column, data, fileName, reportTitle) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const style = {
        titleFont: {
            name: 'Microsoft Sans Serif', family: 2, size: 16, bold: true
        }, subTitleFont: {
            name: 'Microsoft Sans Serif', family: 2, size: 9, bold: true
        }, subTitleValueFont: {
            name: 'Microsoft Sans Serif', family: 2, size: 9
        },bottomBorder: {
            bottom: {style: 'double'},
        }, topBottomBorder: {
            top: {style: 'double'}, bottom: {style: 'dashDotDot'},
        }, topBottomDoubleBorder: {
            top: {style: 'double'}, bottom: {style: 'double'},
        }, alignCenter: {
            horizontal: 'center', vertical: 'middle',
        }, alignLeft: {
            horizontal: 'left', wrapText: true,
        }, alignRight: {
            horizontal: 'right', vertical: 'middle',
        },
    }
    const workbookOption = {
        properties: {
            tabColor: {argb: 'FFC0000'}
        }, views: [
            {state: 'frozen', ySplit: 5, xSplit: 1}
        ], pageSetup: {
            paperSize: 9, orientation: 'landscape'
        }, dateFormats: [
            'DD/MM/YYYY'
        ]
    }

    try {
        const workbook = new ExcelJS.Workbook(); //WorkbookWriter for massive data
        const worksheet = workbook.addWorksheet("New Sheet", workbookOption);

        // open https://www.base64-image.de/ to convert image to base64
        const myBase64 = "data:image/png;base64,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"
        const logo = workbook.addImage({
            base64: myBase64, extension: 'png',
        });
        worksheet.addImage(logo, 'A1:A3');
        worksheet.mergeCells("A1:A3")
        // =====================================
        const title = worksheet.getCell("B1")
        worksheet.mergeCells("B1:J1")
        title.value = reportTitle;
        title.font = style.titleFont;
        title.border = style.topBottomBorder;
        title.alignment = style.alignCenter;
        // =====================================
        const createdBy = worksheet.getCell("B2")
        createdBy.value = "Created By :";
        createdBy.font = style.subTitleFont;
        createdBy.alignment = style.alignRight;
        const createdByValue = worksheet.getCell("C2")
        worksheet.mergeCells("C2:D2")
        createdByValue.value = getStore().getState().auth.user.username;
        createdByValue.font = style.subTitleValueFont;
        createdByValue.alignment = style.alignLeft;
        // =====================================
        const createdAt = worksheet.getCell("B3")
        createdAt.value = "Created At :";
        createdAt.font = style.subTitleFont;
        createdAt.border = style.bottomBorder;
        createdAt.alignment = style.alignRight;
        const createdAtValue = worksheet.getCell("C3")
        worksheet.mergeCells("C3:D3")
        createdAtValue.value = new Date();
        createdAtValue.font = style.subTitleValueFont;
        createdAtValue.border = style.bottomBorder;
        createdAtValue.alignment = style.alignLeft;
        // =====================================
        const startAt = worksheet.getCell("E2")
        startAt.value = "Start At :";
        startAt.font = style.subTitleFont;
        startAt.alignment = style.alignRight;
        const startAtValue = worksheet.getCell("F2")
        worksheet.mergeCells("F2:G2")
        startAtValue.value = "";
        startAtValue.font = style.subTitleValueFont;
        startAtValue.alignment = style.alignLeft;
        // =====================================
        const endAt = worksheet.getCell("E3")
        endAt.value = "End At :";
        endAt.font = style.subTitleFont;
        endAt.border = style.bottomBorder;
        endAt.alignment = style.alignRight;
        const endAtValue = worksheet.getCell("F3")
        worksheet.mergeCells("F3:G3")
        endAtValue.value = "";
        endAtValue.font = style.subTitleValueFont;
        endAtValue.border = style.bottomBorder;
        endAtValue.alignment = style.alignLeft;
        // =====================================
        const notes = worksheet.getCell("H2")
        notes.value = "Notes :";
        notes.font = style.subTitleFont;
        notes.alignment = style.alignRight;
        const notesValue = worksheet.getCell("I2")
        worksheet.mergeCells("I2:J3")
        notesValue.value = "";
        notesValue.font = style.subTitleValueFont;
        notesValue.border = style.bottomBorder;
        notesValue.alignment = style.alignLeft;
        // =====================================
        worksheet.getCell("A1").border = style.topBottomDoubleBorder;
        worksheet.getCell("H3").border = style.bottomBorder;
        // =====================================

        worksheet.addTable({
            name: "my_table",
            ref: "A5",
            headerRow: true,
            totalsRow: true,
            style: {
                theme: 'TableStyleLight8',
                showRowStripes: true,
                showColumnStripes: true,
                showFirstColumn: true,
            },
            columns: column.map(value => ({name: value})),
            rows: data,
        })

        await workbook.xlsx.writeBuffer().then((bufferData) => {
            const blob = new Blob([bufferData], {type: fileType});
            saveAs(blob, fileName + fileExtension);
        }).catch(e => console.log(e))
    } catch (e) {
        console.log(e)
    }
}