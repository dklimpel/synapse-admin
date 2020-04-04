import React, { cloneElement } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import {
  Datagrid,
  Create,
  Edit,
  List,
  Filter,
  SimpleForm,
  BooleanField,
  BooleanInput,
  ImageField,
  PasswordInput,
  TextField,
  TextInput,
  ReferenceField,
  regex,
  SearchInput,
  CreateButton,
  ExportButton,
  TopToolbar,
  sanitizeListRestProps,
  TabbedForm,
  FormTab,
  ArrayField,
  DateField,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  Pagination,
} from "react-admin";

const UserPagination = props => (
  <Pagination {...props} rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]} />
);

const ListActions = ({
  currentSort,
  className,
  resource,
  filters,
  displayedFilters,
  exporter, // you can hide ExportButton if exporter = (null || false)
  filterValues,
  permanentFilter,
  hasCreate, // you can hide CreateButton if hasCreate = false
  basePath,
  selectedIds,
  onUnselectItems,
  showFilter,
  maxResults,
  total,
  ...rest
}) => (
  <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
    {filters &&
      cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: "button",
      })}
    <CreateButton basePath={basePath} />
    <ExportButton
      disabled={total === 0}
      resource={resource}
      sort={currentSort}
      filter={{ ...filterValues, ...permanentFilter }}
      exporter={exporter}
      maxResults={maxResults}
    />
  </TopToolbar>
);

const UserFilter = props => (
  <Filter {...props}>
    <SearchInput source="user_id" alwaysOn />
    <BooleanInput source="guests" alwaysOn />
    <BooleanInput
      label="resources.users.fields.show_deactivated"
      source="deactivated"
      alwaysOn
    />
  </Filter>
);

export const UserList = props => (
  <List
    {...props}
    filters={<UserFilter />}
    filterDefaultValues={{ guests: true, deactivated: false }}
    bulkActionButtons={false}
    pagination={<UserPagination />}
    actions={<ListActions maxResults={10000} />}
  >
    <Datagrid rowClick="edit">
      <ReferenceField
        source="Avatar"
        reference="users"
        link={false}
        sortable={false}
      >
        <ImageField source="avatar_url" title="displayname" />
      </ReferenceField>
      <TextField source="id" sortable={false} />
      {/* Hack since the users endpoint does not give displaynames in the list*/}
      <ReferenceField
        source="name"
        reference="users"
        link={false}
        sortable={false}
      >
        <TextField source="displayname" />
      </ReferenceField>
      <BooleanField source="is_guest" sortable={false} />
      <BooleanField source="admin" sortable={false} />
      <BooleanField source="deactivated" sortable={false} />
    </Datagrid>
  </List>
);

// https://matrix.org/docs/spec/appendices#user-identifiers
const validateUser = regex(
  /^@[a-z0-9._=\-/]+:.*/,
  "synapseadmin.users.invalid_user_id"
);

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" autoComplete="off" validate={validateUser} />
      <TextInput source="displayname" />
      <ArrayInput source="threepids">
        <SimpleFormIterator>
          <SelectInput
            source="medium"
            choices={[
              { id: "email", name: "resources.users.email" },
              { id: "msisdn", name: "resources.users.msisdn" },
            ]}
          />
          <TextInput source="address" />
        </SimpleFormIterator>
      </ArrayInput>
      <PasswordInput source="password" autoComplete="new-password" />
      <BooleanInput source="admin" />
    </SimpleForm>
  </Create>
);

export const UserEdit = props => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="resources.users.name" icon={<PersonPinIcon />}>
      <TextInput source="id" disabled />
      <TextInput source="avatar_url" disabled />
      <TextInput source="displayname" />
      <ArrayInput source="threepids">
        <SimpleFormIterator>
          <SelectInput
            source="medium"
            choices={[
              { id: "email", name: "resources.users.email" },
              { id: "msisdn", name: "resources.users.msisdn" },
            ]}
          />
          <TextInput source="address" />
        </SimpleFormIterator>
      </ArrayInput>
      <PasswordInput source="password" autoComplete="new-password" />
      <BooleanInput source="admin" />
      <BooleanInput
        source="deactivated"
        helperText="resources.users.helper.deactivated"
      />
      </FormTab>
      <FormTab label="resources.connections.name" icon={<PhoneIcon />}>
        <ReferenceField reference="connections" source="id" addLabel={false}>
          <ArrayField
            source="devices[].sessions[0].connections"
            label="resources.connections.name"
          >
            <Datagrid style={{ width: "100%" }}>
              <TextField source="ip" sortable={false} />
              <DateField
                source="last_seen"
                showTime
                options={{
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }}
                sortable={false}
              />
              <TextField
                source="user_agent"
                sortable={false}
                style={{ width: "100%" }}
              />
            </Datagrid>
          </ArrayField>
        </ReferenceField>
      </FormTab>
    </TabbedForm>
  </Edit>
);
