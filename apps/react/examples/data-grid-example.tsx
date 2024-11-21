// when moved to codesandbox remove extra import 
import * as React from 'react';
import { useMemo } from 'react';

import DataGrid, { Column, Pager, Paging } from 'devextreme-react/data-grid';
import ODataStore from 'devextreme/data/odata/store'


const dataSource = {
  store: new ODataStore({
    version: 2,
    url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
    key: 'Id',
    beforeSend(request) {
      const year = new Date().getFullYear() - 1;
      request.params.startDate = `${year}-05-10`;
      request.params.endDate = `${year}-5-15`;
    },
  }),
};

function PagerSettings({ defaultPageSize }) {
  const allowedPageSizes = useMemo(() => [5, 10, 20, 40], []);
  const pageSize = allowedPageSizes.indexOf(defaultPageSize) !== -1
    ? defaultPageSize
    : allowedPageSizes[0];

  return (
    <>
      <Pager allowedPageSizes={allowedPageSizes} showPageSizeSelector={true} />
      <Paging defaultPageSize={pageSize} />
    </>
  ); 
}
 
function ProductOrders() { 
  return ( 
    <DataGrid dataSource={dataSource} > 
        <PagerSettings defaultPageSize={5} />
        <Column dataField="Id" caption='Order Id' />
        <Column dataField="Product" />
        <Column dataField="Amount" />
    </DataGrid> 
  );
}

function CustomerSales() { 
  return ( 
    <DataGrid dataSource={dataSource} > 
        <PagerSettings defaultPageSize={10} />
        <Column dataField="Id" caption='Order Id'/>
        <Column dataField="Customer" />
        <Column dataField="Region" />
        <Column dataField="Sector" />
        <Column dataField="Amount" />
    </DataGrid> 
  ); 
}

export default function App() {
  return <>
    <ProductOrders/>
    <CustomerSales/>
  </>
} 