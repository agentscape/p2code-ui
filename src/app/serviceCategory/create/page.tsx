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

export default function ServiceCategoryCreate() {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({});
  const { data, isLoading, isError } = useList({
    resource: "serviceCandidate",
  });
  const serviceCandidates = data?.data ?? [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "serviceCandidate",
  });
  const addCandidate = (event: SelectChangeEvent) => {
    const id = event.target.value as string;

    const candidate = serviceCandidates.find(
      (candidate) => candidate.id === id
    );

    append({
      id: candidate?.id ?? "",
      name: candidate?.name ?? "",
      href: candidate?.href ?? "",
      "@referredType": candidate?.["@referredType"] ?? "",
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
          Service Candidates
        </Typography>
        {fields?.map((item, index) => (
          <Box
            key={`serviceCandidate_${index}`}
            sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}
          >
            <TextField
              disabled
              label="ID"
              fullWidth
              {...register(`serviceCandidate.${index}.id`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Name"
              fullWidth
              {...register(`serviceCandidate.${index}.name`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Href"
              fullWidth
              {...register(`serviceCandidate.${index}.href`)}
              margin="dense"
            />
            <Button onClick={() => remove(index)} color="error">
              Remove
            </Button>
          </Box>
        ))}
        <FormControl sx={{ mt: 1 }}>
          <InputLabel id="candidate-simple-select-label">
            Add Candidate
          </InputLabel>
          <Select
            labelId="candidate-simple-select-label"
            id="candidate-simple-select"
            label="Add Candidate"
            onChange={addCandidate}
          >
            {serviceCandidates.map((candidate) => (
              <MenuItem value={candidate.id}>{candidate.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Create>
  );
}
