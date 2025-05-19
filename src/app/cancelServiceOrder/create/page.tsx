"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Create, Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useList } from "@refinedev/core";

export default function CancelServiceOrderCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    getFieldState,
    watch,
    formState: { errors },
  } = useForm({});

  const {
    data: serviceOrderData,
    isLoading: serviceOrderIsLoading,
    isError: serviceOrderIsError,
  } = useList({
    resource: "serviceOrder",
  });
  const serviceOrders = serviceOrderData?.data ?? [];

  const stateField = getFieldState("state");

  const {
    fields: noteFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control: control,
    name: "note",
  });
  const noteFieldsWatch = watch("note");
  const addNote = () => {
    appendNote({});
  };

  const {
    fields: cancellationItemFields,
    append: appendCancellationItem,
    remove: removeCancellationItem,
  } = useFieldArray({
    control: control,
    name: "cancellationItem",
  });
  const cancellationItemFieldsWatch = watch("cancellationItem");
  const addCancellationItem = () => {
    appendCancellationItem({});
  };

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          fullWidth
          label="Cancellation Reason"
          {...register("cancellationReason")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
          multiline
        />
        <Controller
          name="state"
          control={control}
          defaultValue={stateField}
          render={({ field }) => {
            return (
              <FormControl sx={{ mt: 1 }}>
                <InputLabel shrink={true} id="state-select-label">
                  State
                </InputLabel>
                <Select
                  {...field}
                  value={field?.value}
                  labelId="state-select-label"
                  label="State"
                >
                  {[
                    "in study",
                    "in design",
                    "in test",
                    "active",
                    "rejected",
                    "launched",
                    "retired",
                    "obsolete",
                    "acknowledged",
                  ].map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }}
        />
        <Controller
          name="requestedCancellationDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Requested Cancellation Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="cancellationDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Cancellation Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Cancellation Items
        </Typography>
        {cancellationItemFieldsWatch?.map((item: any, index: number) => (
          <Box
            key={`cancellationItem_${index}`}
            sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}
          >
            <TextField
              label="ID"
              fullWidth
              {...register(`cancellationItem.${index}.id`)}
              margin="dense"
            />
            <TextField
              label="Author"
              fullWidth
              {...register(`cancellationItem.${index}.reason`)}
              margin="dense"
              multiline
            />
            <TextField
              label="Text"
              fullWidth
              {...register(`cancellationItem.${index}.state`)}
              margin="dense"
            />
            <Typography variant="subtitle1" sx={{ mt: 3 }}>
              Service Order Item
            </Typography>
            <TextField
              label="ID"
              fullWidth
              {...register(`cancellationItem.${index}.serviceOrderItem.id`)}
              margin="dense"
            />
            <Controller
              name={`cancellationItem.${index}.serviceOrderItem.serviceOrderId`}
              control={control}
              defaultValue={getFieldState(
                `cancellationItem.${index}.serviceOrderItem.serviceOrderId`
              )}
              render={({ field }) => {
                return (
                  <FormControl sx={{ mt: 1, mb: 1 }}>
                    <InputLabel shrink={true} id="serviceOrderId-select-label">
                      Service Order Id
                    </InputLabel>
                    <Select
                      {...field}
                      value={field?.value}
                      labelId="serviceOrderId-select-label"
                      label="Service Order Id"
                    >
                      {serviceOrders.map((order) => (
                        <MenuItem value={order.id}>{order.id}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }}
            />
            <TextField
              label="Href"
              fullWidth
              {...register(`cancellationItem.${index}.serviceOrderItem.href`)}
              margin="dense"
            />
            <Button onClick={() => removeCancellationItem(index)} color="error">
              Remove Cancellation Item
            </Button>
          </Box>
        ))}
        <Button onClick={addCancellationItem} color="info">
          Add Cancellation Item
        </Button>
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Notes
        </Typography>
        {noteFieldsWatch?.map((item: any, index: number) => (
          <Box
            key={`note_${index}`}
            sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}
          >
            <TextField
              label="ID"
              fullWidth
              {...register(`note.${index}.id`)}
              margin="dense"
            />
            <TextField
              label="Author"
              fullWidth
              {...register(`note.${index}.author`)}
              margin="dense"
            />
            <TextField
              label="Text"
              fullWidth
              {...register(`note.${index}.text`)}
              margin="dense"
              multiline
            />
            <Controller
              name={`$note.${index}.date`}
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Date"
                    value={dayjs(field.value)}
                    onChange={(date) => field.onChange(date?.toISOString())}
                    slotProps={{
                      textField: { fullWidth: true, margin: "normal" },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
            <Button onClick={() => removeNote(index)} color="error">
              Remove Note
            </Button>
          </Box>
        ))}
        <Button onClick={addNote} color="info">
          Add Note
        </Button>
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Related Parties
        </Typography>
        <Box
          key={`relatedParty`}
          sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}
        >
          <TextField
            disabled
            label="ID"
            fullWidth
            {...register(`relatedParty[0].id`)}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            disabled
            label="Name"
            fullWidth
            {...register(`relatedParty[0].name`)}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            disabled
            label="Role"
            fullWidth
            {...register(`relatedParty[0].role`)}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            disabled
            label="Href"
            fullWidth
            {...register(`relatedParty[0].href`)}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>
      </Box>
    </Create>
  );
}
