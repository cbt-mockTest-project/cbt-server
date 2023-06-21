export declare const AfterDate: (date: Date) => import("typeorm").FindOperator<Date>;
export declare const BeforeDate: (date: Date) => import("typeorm").FindOperator<Date>;
export declare const findUniqElem: <T>(arr1: T[], arr2: T[]) => T[];
export declare const getCookie: (cookie: string, key: string) => any;
export declare const shuffleArray: <T = string | number>(array: T[]) => T[];
export declare const deduplication: (array: any[]) => any[];
export declare const isIntrospectionQuery: (operationName: string | undefined, query: string | undefined) => boolean;
export declare const ellipsisText: (string: string, count: number) => string;
