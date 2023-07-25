interface IReportResource {
    data: any;
}

interface IReportCollection {
    data: any;
    total?: number;
    page?: number;
}

export { IReportResource, IReportCollection };