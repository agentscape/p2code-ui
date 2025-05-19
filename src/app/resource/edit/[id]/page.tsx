"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
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

export default function ResourceEdit() {
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

  const {
    data: serviceData,
    isLoading: serviceIsLoading,
    isError: serviceIsError,
  } = useList({
    resource: "service",
  });
  const services = serviceData?.data ?? [];

  const {
    data: specificationsData,
    isLoading: specificationsIsLoading,
    isError: specificationsIsError,
  } = useList({
    resource: "resourceSpecification",
  });
  const resourceSpecifications = specificationsData?.data ?? [];

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

  const {
    fields: resourceCharacteristicFields,
    append: appendResourceCharacteristic,
    remove: removeResourceCharacteristicField,
  } = useFieldArray({
    control,
    name: "resourceCharacteristic",
  });
  const resourceCharacteristicFieldsWatch = watch("resourceCharacteristic");
  const addCharacteristic = () => {
    appendResourceCharacteristic({
      name: "",
      value: "",
      valueType: "",
    });
  };

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
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
          label="Category"
          {...register("category")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          label="Resource Version"
          {...register("resourceVersion")}
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
          name="startOperatingDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Operating Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="endOperatingDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Operating Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        <TextField
          fullWidth
          label="Administrative State"
          {...register("administrativeState")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          label="Operational State"
          {...register("operationalState")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          label="Resource Status"
          {...register("resourceStatus")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          label="Usage State"
          {...register("usageState")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
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
            Remove Resource Specification
          </Button>
        </Box>
        <FormControl sx={{ mt: 1 }}>
          <InputLabel id="specification-simple-select-label">
            Select Resource Specification
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
          Resource Characteristics
        </Typography>
        {resourceCharacteristicFieldsWatch?.map((item: any, index: number) => (
          <Box
            key={`resourceCharacteristic_${index}`}
            sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}
          >
            <TextField
              disabled
              label="Name"
              fullWidth
              {...register(`resourceCharacteristic.${index}.name`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Value"
              fullWidth
              {...register(`resourceCharacteristic.${index}.value`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Value Type"
              fullWidth
              {...register(`resourceCharacteristic.${index}.valueType`)}
              margin="dense"
            />
            <Button
              onClick={() => removeResourceCharacteristicField(index)}
              color="error"
            >
              Remove Resource Characteristic
            </Button>
          </Box>
        ))}
        <Button onClick={addCharacteristic} color="info">
          Add Resource Characteristic
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

        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Place
        </Typography>
        <Box
          key={`place`}
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
            {...register(`place.id`)}
            margin="dense"
          />
          <TextField
            label="Name"
            fullWidth
            {...register(`place.name`)}
            margin="dense"
          />
          <TextField
            label="Role"
            fullWidth
            {...register(`place.role`)}
            margin="dense"
          />
          <TextField
            label="Href"
            fullWidth
            {...register(`place.href`)}
            margin="dense"
          />
        </Box>
      </Box>
    </Edit>
  );
}
