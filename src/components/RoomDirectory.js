import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Chip } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  BooleanField,
  Datagrid,
  Filter,
  List,
  NumberField,
  Pagination,
  TextField,
  useTranslate,
} from "react-admin";

const RoomDirectoryPagination = props => (
  <Pagination {...props} rowsPerPageOptions={[100, 500, 1000, 2000]} />
);

const useStyles = makeStyles({
  small: {
    height: "40px",
    width: "40px",
  },
});

const AvatarField = ({ source, className, record = {} }) => (
  <Avatar src={record[source]} className={className} />
);

const RoomDirectoryFilter = ({ ...props }) => {
  const translate = useTranslate();
  return (
    <Filter {...props}>
      <Chip
        label={translate("resources.rooms.fields.room_id")}
        source="room_id"
        defaultValue={false}
        style={{ marginBottom: 8 }}
      />
      <Chip
        label={translate("resources.rooms.fields.topic")}
        source="topic"
        defaultValue={false}
        style={{ marginBottom: 8 }}
      />
      <Chip
        label={translate("resources.rooms.fields.canonical_alias")}
        source="canonical_alias"
        defaultValue={false}
        style={{ marginBottom: 8 }}
      />
    </Filter>
  );
};

export const FilterableRoomDirectoryList = ({ ...props }) => {
  const classes = useStyles();
  const translate = useTranslate();
  const filter = props.roomDirectoryFilters;
  const roomIdFilter = filter && filter.room_id ? true : false;
  const topicFilter = filter && filter.topic ? true : false;
  const canonicalAliasFilter = filter && filter.canonical_alias ? true : false;

  return (
    <List
      {...props}
      pagination={<RoomDirectoryPagination />}
      bulkActionButtons={false}
      filters={<RoomDirectoryFilter />}
    >
      <Datagrid>
        <AvatarField
          source="avatar_src"
          sortable={false}
          className={classes.small}
          label={translate("resources.rooms.fields.avatar")}
        />
        <TextField
          source="name"
          sortable={false}
          label={translate("resources.rooms.fields.name")}
        />
        {roomIdFilter && (
          <TextField
            source="room_id"
            sortable={false}
            label={translate("resources.rooms.fields.room_id")}
          />
        )}
        {canonicalAliasFilter && (
          <TextField
            source="canonical_alias"
            sortable={false}
            label={translate("resources.rooms.fields.canonical_alias")}
          />
        )}
        {topicFilter && (
          <TextField
            source="topic"
            sortable={false}
            label={translate("resources.rooms.fields.topic")}
          />
        )}
        <NumberField
          source="num_joined_members"
          sortable={false}
          label={translate("resources.rooms.fields.joined_members")}
        />
        <BooleanField
          source="world_readable"
          sortable={false}
          label={translate("resources.rooms.fields.public")}
        />
        <BooleanField
          source="guest_can_join"
          sortable={false}
          label={translate("resources.rooms.fields.guest_access")}
        />
      </Datagrid>
    </List>
  );
};

function mapStateToProps(state) {
  return {
    roomDirectoryFilters:
      state.admin.resources.room_directory.list.params.displayedFilters,
  };
}

export const RoomDirectoryList = connect(mapStateToProps)(
  FilterableRoomDirectoryList
);
