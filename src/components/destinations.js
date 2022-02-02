import React from "react";
import {
  Button,
  Datagrid,
  DateField,
  DeleteButton,
  ExportButton,
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
  TopToolbar,
  useDelete,
  useTranslate,
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

export const DestinationDeleteButton = ({ record }) => {
  const translate = useTranslate();
  const [handleReconnect, { isLoading }] = useDelete("destinations", record.id);
  const visible = record.failure_ts;

  return (
    <Button
      label="resources.destinations.action.reconnect"
      onClick={handleReconnect}
      disabled={isLoading}
    >
      <AutorenewIcon />
    </Button>
  );
};

const DestinationShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <DestinationDeleteButton record={data} />
    <ExportButton />
  </TopToolbar>
);

const DestinationTitle = ({ record }) => {
  const translate = useTranslate();
  return (
    <span>
      {translate("resources.destinations.name", 1)} {record.destination}
    </span>
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
      <Datagrid
        rowStyle={destinationRowStyle}
        rowClick={(id, basePath, record) =>
          "/destinations/" + id + "/show/rooms"
        }
      >
        <TextField source="destination" />
        <DateField source="failure_ts" showTime options={date_format} />
        <DateField source="retry_last_ts" showTime options={date_format} />
        <TextField source="retry_interval" />
        <TextField source="last_successful_stream_ordering" />
        <DestinationDeleteButton />
      </Datagrid>
    </List>
  );
};

export const DestinationShow = props => {
  const translate = useTranslate();
  return (
    <Show
      actions={<DestinationShowActions />}
      title={<DestinationTitle />}
      {...props}
    >
      <TabbedShowLayout>
        <Tab label="status" icon={<ViewListIcon />}>
          <TextField source="destination" />
          <DateField source="failure_ts" showTime options={date_format} />
          <DateField source="retry_last_ts" showTime options={date_format} />
          <TextField source="retry_interval" />
          <TextField source="last_successful_stream_ordering" />
        </Tab>

        <Tab
          label={translate("resources.rooms.name", { smart_count: 2 })}
          icon={<FolderSharedIcon />}
          path="rooms"
        >
          <ReferenceManyField
            reference="destination_rooms"
            target="destination"
            addLabel={false}
            pagination={<DestinationPagination />}
            perPage={50}
          >
            <Datagrid
              style={{ width: "100%" }}
              rowClick={(id, basePath, record) => "/rooms/" + id + "/show"}
            >
              <TextField
                source="room_id"
                label="resources.rooms.fields.room_id"
              />
              <TextField source="stream_ordering" sortable={false} />
              <ReferenceField
                label="resources.rooms.fields.name"
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
