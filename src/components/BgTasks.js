import React from "react";
import { Datagrid, List, TextField } from "react-admin";

export const BgTaskList = ({ ...props }) => {
  return (
    <List {...props} bulkActionButtons={false}>
      <Datagrid>
        <TextField source="id" sortable={false} />
        <TextField sortable={false} source="name" />
        <TextField sortable={false} source="total_item_count" />
        <TextField sortable={false} source="total_duration_ms" />
        <TextField sortable={false} source="average_items_per_ms" />
      </Datagrid>
    </List>
  );
};
