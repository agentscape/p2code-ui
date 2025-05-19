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
import {
  Controller,
  FieldValues,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useList } from "@refinedev/core";

const Resource = ({
  orderItemIndex,
  register,
  setValue,
}: {
  orderItemIndex: number;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}) => {
  const {
    data: resourceData,
    isLoading: resourceIsLoading,
    isError: resourceIsError,
  } = useList({
    resource: "resource",
  });
  const resources = resourceData?.data ?? [];

  const changeResource = (event: SelectChangeEvent) => {
    const id = event.target.value as string;

    const resource = resources.find((res) => res.id === id);

    setValue(
      `resourceOrderItem.${orderItemIndex}.resource.name`,
      resource?.name ?? ""
    );
    setValue(
      `resourceOrderItem.${orderItemIndex}.resource.category`,
      resource?.category ?? ""
    );
    setValue(
      `resourceOrderItem.${orderItemIndex}.resource.description`,
      resource?.description ?? ""
    );
  };

  const removeResource = () => {
    setValue(`resourceOrderItem.${orderItemIndex}.resource.name`, "");
    setValue(`resourceOrderItem.${orderItemIndex}.resource.category`, "");
    setValue(`resourceOrderItem.${orderItemIndex}.resource.description`, "");
  };
  return (
    <>
      <>
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Resource
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
            label="Name"
            fullWidth
            {...register(`resourceOrderItem.${orderItemIndex}.resource.name`)}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            disabled
            label="Category"
            fullWidth
            {...register(
              `resourceOrderItem.${orderItemIndex}.resource.category`
            )}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            disabled
            label="Description"
            fullWidth
            {...register(
              `resourceOrderItem.${orderItemIndex}.resource.description`
            )}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <Button onClick={removeResource} color="error">
            Remove Resource
          </Button>
        </Box>
        <FormControl sx={{ mt: 1 }}>
          <InputLabel id="resource-simple-select-label">
            Select Resource
          </InputLabel>
          <Select
            labelId="resource-simple-select-label"
            id="resource-simple-select"
            label="Select resource"
            aria-placeholder="Select resource"
            sx={{ width: "100%" }}
            onChange={changeResource}
          >
            {resources.map((srv) => (
              <MenuItem value={srv.id}>{srv.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    </>
  );
};

export default function ResourceOrderEdit() {
  const {
    saveButtonProps,
    register,
    control,
    getFieldState,
    setValue,
    watch,
    formState: { errors },
    refineCore: { formLoading },
  } = useForm({});

  const stateField = getFieldState("state");
  const {
    fields: resourceOrderItemsFields,
    append: appendResourceOrderItem,
    remove: removeResourceOrderItem,
  } = useFieldArray({
    control,
    name: "resourceOrderItem",
  });
  const resourceOrderItemsWatch = watch("resourceOrderItem");
  const addResourceOrderItem = () => {
    appendResourceOrderItem({});
  };

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        {/* External ID */}
        <TextField
          fullWidth
          label="External ID"
          {...register("externalId")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        {/* Priority */}
        <TextField
          fullWidth
          label="Priority"
          {...register("priority")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        {/* Category */}
        <TextField
          fullWidth
          label="Category"
          {...register("category")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          {...register("description")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        {/* Requested Start Date */}
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
        {/* Requested Completion Date */}
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
        {/* Expected Completion Date */}
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
        {/* Start Date */}
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
        {/* Completion Date */}
        <Controller
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
        {/* Cancellation Date */}
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
        {/* Order Date */}
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
        {/* Notification Contact */}
        <TextField
          fullWidth
          label="Notification Contact"
          {...register("notificationContact")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        {/* Cancellation Reason */}
        <TextField
          fullWidth
          label="Cancellation Reason"
          {...register("cancellationReason")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        {/* State */}
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
          Resource Order Items
        </Typography>
        {resourceOrderItemsWatch?.map((item: any, index: number) => (
          <Box
            key={`resourceOrderItem_${index}`}
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
              {...register(`resourceOrderItem.${index}.id`)}
              margin="dense"
            />
            <TextField
              label="Action"
              fullWidth
              {...register(`resourceOrderItem.${index}.action`)}
              margin="dense"
            />
            <TextField
              label="State"
              fullWidth
              {...register(`resourceOrderItem.${index}.state`)}
              margin="dense"
            />
            <TextField
              label="Quantity"
              fullWidth
              {...register(`resourceOrderItem.${index}.quantity`)}
              margin="dense"
            />

            <Resource
              register={register}
              orderItemIndex={index}
              setValue={setValue}
            />

            <Button
              onClick={() => removeResourceOrderItem(index)}
              color="error"
            >
              Remove Resource Order Item
            </Button>
          </Box>
        ))}
        <Button onClick={addResourceOrderItem} color="info">
          Add Resource Order Item
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
