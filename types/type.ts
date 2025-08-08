export interface FetchDataProps {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  dataObject?: unknown;
}

export const stockAllocation =
  'http://localhost:5020/StockAllocation/GetStockAllocationRequests?AllocationType=';

export const approvedAllocation =
  'http://172.145.1.102:7002/stockAllocation/approved';
