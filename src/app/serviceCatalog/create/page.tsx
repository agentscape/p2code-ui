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
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useList } from "@refinedev/core";

export default function ServiceCatalogCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({});
  const { data, isLoading, isError } = useList({
    resource: "serviceCategory",
  });
  const serviceCategories = data?.data ?? [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "category",
  });
  const addCategory = (event: SelectChangeEvent) => {
    const id = event.target.value as string;

    const category = serviceCategories.find((category) => category.id === id);

    append({
      id: category?.id ?? "",
      name: category?.name ?? "",
      href: category?.href ?? "",
      "@referredType": category?.["@referredType"] ?? "",
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
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          type="text"
          label="Name"
        />

        <TextField
          {...register("description", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.description}
          helperText={(errors as any)?.description?.message}
          margin="normal"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          type="text"
          label="Description"
          multiline
        />

        <TextField
          {...register("version", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.version}
          helperText={(errors as any)?.version?.message}
          margin="normal"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          type="text"
          label="Version"
        />

        <Controller
          name="lifecycleStatus"
          control={control}
          defaultValue={""}
          render={({ field }) => {
            return (
              <FormControl sx={{ mt: 1 }}>
                <InputLabel id="lifecycle-select-label">
                  Lifecycle Status
                </InputLabel>
                <Select
                  {...field}
                  value={field?.value}
                  labelId="lifecycle-select-label"
                  label="Lifecycle Status"
                >
                  {[
                    "In study",
                    "In design",
                    "In test",
                    "Active",
                    "Rejected",
                    "Launched",
                    "Retired",
                    "Obsolete",
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
          Service Categories
        </Typography>
        {fields?.map((item, index) => (
          <Box
            key={`category_${index}`}
            sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}
          >
            <TextField
              disabled
              label="ID"
              fullWidth
              {...register(`category.${index}.id`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Name"
              fullWidth
              {...register(`category.${index}.name`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Href"
              fullWidth
              {...register(`category.${index}.href`)}
              margin="dense"
            />
            <Button onClick={() => remove(index)} color="error">
              Remove
            </Button>
          </Box>
        ))}
        <FormControl sx={{ mt: 1 }}>
          <InputLabel id="category-simple-select-label">
            Add Category
          </InputLabel>
          <Select
            labelId="category-simple-select-label"
            id="category-simple-select"
            label="Add Category"
            onChange={addCategory}
          >
            {serviceCategories.map((category) => (
              <MenuItem value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Create>
  );
}
