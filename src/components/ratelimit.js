import React from "react";
import {
  Edit,
  TextInput,
  Show,
  Create,
  TextField,
  SimpleForm,
  SimpleShowLayout,
} from "react-admin";

export const RateLimitEdit = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput
          label="messages_per_second"
          source="messages_per_second"
          resettable
        />
        <TextInput label="burst_count" source="burst_count" resettable />
      </SimpleForm>
    </Edit>
  );
};

export const RateLimitCreate = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput
          label="messages_per_second"
          source="messages_per_second"
          resettable
        />
        <TextInput label="burst_count" source="burst_count" resettable />
      </SimpleForm>
    </Create>
  );
};

export const RateLimitShow = props => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="messages_per_second" source="messages_per_second" />
        <TextField label="burst_count" source="burst_count" />
      </SimpleShowLayout>
    </Show>
  );
};
