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
import { Controller, useFieldArray } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useList } from "@refinedev/core";

export default function CancelResourceOrderEdit() {
  const {
    saveButtonProps,
    register,
    control,
    getFieldState,
    watch,
    formState: { errors },
    refineCore: { formLoading },
    setValue,
  } = useForm({});

  const {
    data: resourceOrderData,
    isLoading: resourceOrderIsLoading,
    isError: resourceOrderIsError,
  } = useList({
    resource: "resourceOrder",
  });
  const resourceOrders = resourceOrderData?.data ?? [];

  const stateField = getFieldState("state");

  const changeResourceOrder = (event: SelectChangeEvent) => {
    const id = event.target.value as string;

    const resourceOrder = resourceOrders.find((res) => res.id === id);

    setValue(`resourceOrder.id`, resourceOrder?.id ?? "");
    setValue(`resourceOrder.name`, resourceOrder?.name ?? "");
    setValue(`resourceOrder.href`, resourceOrder?.href ?? "");
  };

  const removeResourceOrder = () => {
    setValue(`resourceOrder.id`, "");
    setValue(`resourceOrder.name`, "");
    setValue(`resourceOrder.href`, "");
  };

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        {/* Cancellation Reason */}
        <TextField
          fullWidth
          label="Cancellation Reason"
          {...register("cancellationReason")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
          multiline
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
        {/* Requested Cancellation Date */}
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
        {/* Effective Cancellation Date */}
        <Controller
          name="effectiveCancellationDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Effective Cancellation Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        {/* Resource Order */}
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Resource Order
        </Typography>
        <Box sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}>
          <TextField
            disabled
            label="ID"
            fullWidth
            {...register(`resourceOrder.id`)}
            margin="dense"
          />
          <TextField
            disabled
            label="Name"
            fullWidth
            {...register(`resourceOrder.name`)}
            margin="dense"
          />
          <TextField
            disabled
            label="Href"
            fullWidth
            {...register(`resourceOrder.href`)}
            margin="dense"
          />
          <Button onClick={removeResourceOrder} color="error">
            Remove Resource Order
          </Button>
        </Box>
        <FormControl sx={{ mt: 1 }}>
          <InputLabel id="resourceOder-simple-select-label">
            Select Resource Order
          </InputLabel>
          <Select
            labelId="resourceOder-simple-select-label"
            id="resourceOder-simple-select"
            label="Select Resource Order"
            onChange={changeResourceOrder}
          >
            {resourceOrders.map((resourceOrder) => (
              <MenuItem value={resourceOrder.id}>{resourceOrder.id}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Edit>
  );
}
