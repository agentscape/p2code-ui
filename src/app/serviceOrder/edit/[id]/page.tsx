"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useList } from "@refinedev/core";

const Service = ({
  orderItemIndex,
  register,
  setValueFn,
}: {
  orderItemIndex: number;
  register: any;
  setValueFn: any;
}) => {
  const {
    data: serviceData,
    isLoading: serviceIsLoading,
    isError: serviceIsError,
  } = useList({
    resource: "service",
  });
  const services = serviceData?.data ?? [];

  const changeService = (event: SelectChangeEvent) => {
    const id = event.target.value as string;

    const service = services.find((srv) => srv.id === id);

    setValueFn(
      `serviceOrderItem.${orderItemIndex}.service.id`,
      service?.id ?? ""
    );
    setValueFn(
      `serviceOrderItem.${orderItemIndex}.service.name`,
      service?.name ?? ""
    );
    setValueFn(
      `serviceOrderItem.${orderItemIndex}.service.category`,
      service?.category ?? ""
    );
    setValueFn(
      `serviceOrderItem.${orderItemIndex}.service.serviceType`,
      service?.serviceType ?? ""
    );
  };
  const removeService = () => {
    setValueFn(`serviceOrderItem.${orderItemIndex}.service.id`, "");
    setValueFn(`serviceOrderItem.${orderItemIndex}.service.name`, "");
    setValueFn(`serviceOrderItem.${orderItemIndex}.service.category`, "");
    setValueFn(`serviceOrderItem.${orderItemIndex}.service.serviceType`, "");
  };
  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Service
      </Typography>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          mb: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          disabled
          label="ID"
          fullWidth
          {...register(`serviceOrderItem.${orderItemIndex}.service.id`)}
          margin="dense"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          disabled
          label="Name"
          fullWidth
          {...register(`serviceOrderItem.${orderItemIndex}.service.name`)}
          margin="dense"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          disabled
          label="Category"
          fullWidth
          {...register(`serviceOrderItem.${orderItemIndex}.service.category`)}
          margin="dense"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          disabled
          label="Service Type"
          fullWidth
          {...register(
            `serviceOrderItem.${orderItemIndex}.service.serviceType`
          )}
          margin="dense"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Button onClick={removeService} color="error">
          Remove Service
        </Button>
      </Box>
      <FormControl sx={{ mt: 1 }}>
        <InputLabel id="service-simple-select-label">Select Service</InputLabel>
        <Select
          labelId="service-simple-select-label"
          id="service-simple-select"
          label="Select Service"
          aria-placeholder="Select Service"
          sx={{ width: "100%" }}
          onChange={changeService}
        >
          {services.map((srv) => (
            <MenuItem value={srv.id}>{srv.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

const Notes = ({
  parentElement,
  orderItemIndex,
  register,
  controlFn,
  watchFn,
  useFieldArrayFn,
}: {
  parentElement: string;
  orderItemIndex: number;
  controlFn: any;
  watchFn: any;
  register: any;
  useFieldArrayFn: any;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: controlFn,
    name: `${parentElement}.${orderItemIndex}.note`,
  });

  const noteFields = watchFn(`${parentElement}.${orderItemIndex}.note`);

  const addNote = () => {
    append({});
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Notes
      </Typography>
      {noteFields?.map((item: any, index: number) => (
        <Box
          key={`orderItemNote_${orderItemIndex}_${index}`}
          sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}
        >
          <TextField
            label="ID"
            fullWidth
            {...register(`${parentElement}.${orderItemIndex}.note.${index}.id`)}
            margin="dense"
          />
          <TextField
            label="Author"
            fullWidth
            {...register(
              `${parentElement}.${orderItemIndex}.note.${index}.author`
            )}
            margin="dense"
          />
          <TextField
            label="Text"
            fullWidth
            {...register(
              `${parentElement}.${orderItemIndex}.note.${index}.text`
            )}
            margin="dense"
            multiline
          />
          <Controller
            name={`${parentElement}.${orderItemIndex}.note.${index}.date`}
            control={controlFn}
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
          <Button onClick={() => remove(index)} color="error">
            Remove Note
          </Button>
        </Box>
      ))}
      <Button onClick={addNote} color="info">
        Add Note
      </Button>
    </>
  );
};

export default function ServiceOrderEdit() {
  const {
    saveButtonProps,
    register,
    control,
    getFieldState,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});

  const stateField = getFieldState("state");
  const {
    fields: serviceOrderItemsFields,
    append: appendServiceOrderItem,
    remove: removeServiceOrderItem,
  } = useFieldArray({
    control,
    name: "serviceOrderItem",
  });
  const serviceOrderItemsWatch = watch("serviceOrderItem");
  const addServiceOrderItem = () => {
    appendServiceOrderItem({});
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "note",
  });
  const noteFields = watch("note");
  const addNote = () => {
    append({});
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          fullWidth
          label="External ID"
          {...register("externalId")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          label="Priority"
          {...register("priority")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          label="Category"
          {...register("category")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          label="Description"
          {...register("description")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Controller
          name="requestedStartDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Requested Start Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="requestedCompletionDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Requested Completion Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="expectedCompletionDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Expected Completion Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="orderDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Order Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        {/* <Controller
          name="completionDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Completion Date"
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
        /> */}
        {/* <TextField
          fullWidth
          label="Cancellation Reason"
          {...register("cancellationReason")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        /> */}
        <TextField
          fullWidth
          label="Notification Contact"
          {...register("notificationContact")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
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
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Service Order Items
        </Typography>
        {serviceOrderItemsWatch?.map((item: any, index: number) => (
          <Box
            key={`serviceOrderItem_${index}`}
            sx={{
              p: 2,
              border: "1px solid #ccc",
              mb: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              label="ID"
              fullWidth
              {...register(`serviceOrderItem.${index}.id`)}
              margin="dense"
            />
            <TextField
              label="Action"
              fullWidth
              {...register(`serviceOrderItem.${index}.action`)}
              margin="dense"
            />
            <TextField
              label="State"
              fullWidth
              {...register(`serviceOrderItem.${index}.state`)}
              margin="dense"
            />

            <Service
              register={register}
              setValueFn={setValue}
              orderItemIndex={index}
            />

            <Notes
              parentElement="serviceOrderItem"
              controlFn={control}
              watchFn={watch}
              register={register}
              useFieldArrayFn={useFieldArray}
              orderItemIndex={index}
            />

            <Button onClick={() => removeServiceOrderItem(index)} color="error">
              Remove Service Order Item
            </Button>
          </Box>
        ))}
        <Button onClick={addServiceOrderItem} color="info">
          Add Service Order Item
        </Button>
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Notes
        </Typography>
        {noteFields?.map((item: any, index: number) => (
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
            <Button onClick={() => remove(index)} color="error">
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
    </Edit>
  );
}
