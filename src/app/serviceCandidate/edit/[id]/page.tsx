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

export default function ServiceCandidateEdit() {
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
    resource: "serviceCategory",
  });

  const serviceCategories = data?.data ?? [];

  const {
    data: specificationsData,
    isLoading: specificationsIsLoading,
    isError: specificationsIsError,
  } = useList({
    resource: "serviceSpecification",
  });

  const serviceSpecifications = specificationsData?.data ?? [];

  const lifecycleStatusState = getFieldState("lifecycleStatus");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "category",
  });

  const categoryFields = watch("category");
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

  const changeSpecification = (event: SelectChangeEvent) => {
    const id = event.target.value as string;

    const specification = serviceSpecifications.find(
      (specification) => specification.id === id
    );

    setValue("serviceSpecification.id", specification?.id ?? "");
    setValue("serviceSpecification.href", specification?.href ?? "");
    setValue("serviceSpecification.name", specification?.name ?? "");
    setValue("serviceSpecification.version", specification?.version ?? "");
  };
  const removeSpecification = () => {
    setValue("serviceSpecification.id", "");
    setValue("serviceSpecification.href", "");
    setValue("serviceSpecification.name", "");
    setValue("serviceSpecification.version", "");
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
          Service Specification
        </Typography>
        <Box sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}>
          <TextField
            disabled
            label="ID"
            fullWidth
            {...register("serviceSpecification.id")}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            disabled
            label="Name"
            fullWidth
            {...register("serviceSpecification.name")}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            disabled
            label="Version"
            fullWidth
            {...register("serviceSpecification.version")}
            margin="dense"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            disabled
            label="Href"
            fullWidth
            {...register("serviceSpecification.href")}
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
            {serviceSpecifications.map((spec) => (
              <MenuItem value={spec.id}>{spec.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Service Categories
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
