import React from "react";
import {
  Datagrid,
  DateField,
  DeleteButton,
  Filter,
  List,
  Pagination,
  ReferenceField,
  ReferenceManyField,
  SearchInput,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
} from "react-admin";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import ViewListIcon from "@material-ui/icons/ViewList";

const DestinationPagination = props => (
  <Pagination {...props} rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]} />
);

const date_format = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const destinationRowStyle = (record, index) => ({
  backgroundColor: record.retry_last_ts > 0 ? "#ffcccc" : "white",
});

const DestinationFilter = ({ ...props }) => {
  return (
    <Filter {...props}>
      <SearchInput source="destination" alwaysOn />
    </Filter>
  );
};

export const DestinationList = props => {
  return (
    <List
      {...props}
      filters={<DestinationFilter />}
      pagination={<DestinationPagination />}
      sort={{ field: "destination", order: "ASC" }}
      bulkActionButtons={false}
    >
      <Datagrid rowClick="show" rowStyle={destinationRowStyle}>
        <TextField source="destination" />
        <DateField source="failure_ts" showTime options={date_format} />
        <DateField source="retry_last_ts" showTime options={date_format} />
        <TextField source="retry_interval" />
        <TextField source="last_successful_stream_ordering" />
        <DeleteButton icon={<AutorenewIcon />} label="Reconnect" />
      </Datagrid>
    </List>
  );
};

export const DestinationShow = props => {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="basic" icon={<ViewListIcon />}>
          <TextField source="destination" />
          <DateField source="failure_ts" showTime options={date_format} />
          <DateField source="retry_last_ts" showTime options={date_format} />
          <TextField source="retry_interval" />
          <TextField source="last_successful_stream_ordering" />
        </Tab>
        <Tab label="rooms" icon={<FolderSharedIcon />}>
          <ReferenceManyField
            reference="destination_rooms"
            target="destination"
            addLabel={false}
          >
            <Datagrid
              style={{ width: "100%" }}
              rowClick={(id, basePath, record) => "/rooms/" + id}
            >
              <TextField
                source="room_id"
                sortable={false}
                label="resources.users.fields.id"
              />
              <TextField
                source="stream_ordering"
                sortable={false}
                label="resources.users.fields.id"
              />
              <ReferenceField
                label="resources.users.fields.displayname"
                source="id"
                reference="rooms"
                sortable={false}
                link=""
              >
                <TextField source="name" sortable={false} />
              </ReferenceField>
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
