import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import Page403 from "../../../../views/pages/Error/Page403";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const Step3 = () => {
    return (
        // <PDFViewer>
        //     <Document>
        //         <Page size="A4" style={styles.page}>
        //             <View style={styles.section}>
        //                 <Text>Section #1</Text>
        //             </View>
        //             <View style={styles.section}>
        //                 <Text>Section #2</Text>
        //             </View>
        //         </Page>
        //     </Document>
        // </PDFViewer>
        <Page403/>
    );
};

export default Step3;