interface ReportItemData {
    data: any;
}

interface ReportListData {
    data: any[];
    total: number;
    page?: number;
}

export { ReportItemData, ReportListData }