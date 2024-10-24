The TagBox component can arrange items into a two-level parent-child hierarchy. To group items, set the [grouped](/Documentation/ApiReference/UI_Components/dxTagBox/Configuration/#grouped) property to **true**. 
<!--split-->

Ensure the data source defines the hierarchy in one of the following ways:

- **Grouping Field**    
The data source can contain a plain array of objects with multiple fields. Assign a field to the DataSource's [group](/Documentation/ApiReference/Data_Layer/DataSource/Configuration/#group) property to create a hierarchical display. Parent items display unique values from the specified field, and Child items display grouped values. This demo shows how to use this data source type.

- **Hierarchical Data Source Structure**    
You can use a [dataSource](/Documentation/ApiReference/UI_Components/dxTagBox/Configuration/#dataSource) where each entry is an object that contains the **key** and **items** fields. The **key** field specifies the group header (parent), and the **items** field holds an array of child items. A data source can specify different field names if the data is structured in the same way. In this case, implement the [DataSource](/Documentation/ApiReference/Data_Layer/DataSource/)'s [map](/Documentation/ApiReference/Data_Layer/DataSource/Configuration/#map) function to create **key** and **items** field mappings. Refer to the following help topic for more information: [Item Mapping](/Documentation/Guide/Data_Binding/Data_Layer/#Reading_Data/Data_Transformation/Item_Mapping).

This demo also shows how to customize the appearance of group headers (the [groupTemplate](/Documentation/ApiReference/UI_Components/dxTagBox/Configuration/#groupTemplate) property) and enable search (the [searchEnabled](/Documentation/ApiReference/UI_Components/dxTagBox/Configuration/#searchEnabled) property).
