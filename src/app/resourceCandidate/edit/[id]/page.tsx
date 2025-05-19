"use client";

import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Controller, set, useFieldArray } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { useList } from "@refinedev/core";

export default function ResourceCandidateEdit() {
  const {
    saveButtonProps,
    register,
    control,
    refineCore: { formLoading },
    formState: { errors },
    getFieldState,
    setValue,
    resetField,
    watch,
  } = useForm({});
  const { data, isLoading, isError } = useList({
    resource: "resourceCategory",
  });

  const resourceCategories = data?.data ?? [];

  const {
    data: specificationsData,
    isLoading: specificationsIsLoading,
    isError: specificationsIsError,
  } = useList({
    resource: "resourceSpecification",
  });

  const resourceSpecifications = specificationsData?.data ?? [];

  const lifecycleStatusState = getFieldState("lifecycleStatus");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "category",
  });

  const categoryFields = watch("category");
  const addCategory = (event: SelectChangeEvent) => {
    const id = event.target.value as string;

    const category = resourceCategories.find((category) => category.id === id);

    append({
      id: category?.id ?? "",
      name: category?.name ?? "",
      href: category?.href ?? "",
      "@referredType": category?.["@referredType"] ?? "",
    });
  };

  const changeSpecification = (event: SelectChangeEvent) => {
    const id = event.target.value as string;

    const specification = resourceSpecifications.find(
      (specification) => specification.id === id
    );

    setValue("resourceSpecification.id", specification?.id ?? "");
    setValue("resourceSpecification.href", specification?.href ?? "");
    setValue("resourceSpecification.name", specification?.name ?? "");
    setValue("resourceSpecification.version", specification?.version ?? "");
  };
  const removeSpecification = () => {
    setValue("resourceSpecification.id", "");
    setValue("resourceSpecification.href", "");
    setValue("resourceSpecification.name", "");
    setValue("resourceSpecification.version", "");
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
          Resource Specification
        </Typography>
        <Box sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}>
          <TextField
            disabled
            label="ID"
            fullWidth
            {...register("resourceSpecification.id")}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            disabled
            label="Name"
            fullWidth
            {...register("resourceSpecification.name")}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            disabled
            label="Version"
            fullWidth
            {...register("resourceSpecification.version")}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            disabled
            label="Href"
            fullWidth
            {...register("resourceSpecification.href")}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <Button onClick={removeSpecification} color="error">
            Remove
          </Button>
        </Box>
        <FormControl sx={{ mt: 1 }}>
          <InputLabel id="specification-simple-select-label">
            Select Specification
          </InputLabel>
          <Select
            labelId="specification-simple-select-label"
            id="specification-simple-select"
            label="Select specification"
            onChange={changeSpecification}
          >
            {resourceSpecifications.map((spec) => (
              <MenuItem value={spec.id}>{spec.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Resource Categories
        </Typography>
        {categoryFields?.map((item: any, index: number) => (
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
          </Box>
        ))}
      </Box>
    </Edit>
  );
}
