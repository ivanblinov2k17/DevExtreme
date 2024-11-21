import * as React from 'react';

import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
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

const ReadonlyColumn = (props) => { 
    return (
      <Column
        allowEditing={false}
        {...props}
      />
    ); 
}
 
function ProductOrders() { 
     return ( 
      <DataGrid dataSource={dataSource} > 
        <Editing
          mode="cell"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true} />
        
        <ReadonlyColumn dataField="Id" caption="Order Id" />
        <Column dataField="Product" />
        <Column dataField="Customer" />
        <Column dataField="Region" />
        <ReadonlyColumn dataField="Amount" />
      </DataGrid> 
     );
}

export default function App() {
  return <>
    <ProductOrders/>
  </>
} 