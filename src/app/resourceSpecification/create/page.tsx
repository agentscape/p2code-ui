"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
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

export default function ResourceSpecificationCreate() {
  const {
    saveButtonProps,
    register,
    control,
    getFieldState,
    watch,
    formState: { errors },
    refineCore: { formLoading },
  } = useForm({});

  const lifecycleStatusState = getFieldState("lifecycleStatus");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specCharacteristic",
  });
  const specCharacteristics = watch("specCharacteristic");

  const addCharacteristic = () => {
    append({
      id: "",
      name: "",
      description: "",
      valueType: "",
      configurable: true,
      isUnique: false,
      minCardinality: 1,
      maxCardinality: 1,
    });
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
          label="Name"
          {...register("name")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          label="Description"
          {...register("description")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
          multiline
        />
        <TextField
          fullWidth
          label="Version"
          {...register("version")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <Controller
          name="lifecycleStatus"
          control={control}
          defaultValue={lifecycleStatusState}
          render={({ field }) => {
            return (
              <FormControl sx={{ mt: 1 }}>
                <InputLabel shrink={true} id="lifecycle-select-label">
                  Lifecycle Status
                </InputLabel>
                <Select
                  {...field}
                  value={field?.value}
                  labelId="lifecycle-select-label"
                  label="Lifecycle Status"
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
          name="validFor.startDateTime"
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
          name="validFor.endDateTime"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Specification Characteristics
        </Typography>
        {specCharacteristics?.map((item: any, index: number) => (
          <Box
            key={`specCharacteristic_${index}`}
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
              {...register(`specCharacteristic.${index}.id`)}
              margin="dense"
            />
            <TextField
              label="Name"
              fullWidth
              {...register(`specCharacteristic.${index}.name`)}
              margin="dense"
            />
            <TextField
              label="Description"
              fullWidth
              {...register(`specCharacteristic.${index}.description`)}
              margin="dense"
            />
            <TextField
              label="Value Type"
              fullWidth
              {...register(`specCharacteristic.${index}.valueType`)}
              margin="dense"
            />

            <Controller
              name={`specCharacteristic.${index}.configurable`}
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel sx={{ mt: 1 }} shrink={true}>
                    Configurable
                  </InputLabel>
                  <Switch
                    checked={field.value}
                    onChange={() => field.onChange(!field.value)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </>
              )}
            />
            <Controller
              name={`specCharacteristic.${index}.isUnique`}
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel sx={{ mt: 1 }} shrink={true}>
                    Is Unique
                  </InputLabel>
                  <Switch
                    sx={{ mb: 1 }}
                    checked={field.value}
                    onChange={() => field.onChange(!field.value)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </>
              )}
            />
            <TextField
              label="Min Cardinality"
              fullWidth
              {...register(`specCharacteristic.${index}.minCardinality`)}
              margin="dense"
            />
            <TextField
              label="Max Cardinality"
              fullWidth
              {...register(`specCharacteristic.${index}.maxCardinality`)}
              margin="dense"
            />
            <Button onClick={() => remove(index)} color="error">
              Remove
            </Button>
          </Box>
        ))}
        <Button onClick={addCharacteristic} color="info">
          Add Characteristic
        </Button>
      </Box>
    </Create>
  );
}
