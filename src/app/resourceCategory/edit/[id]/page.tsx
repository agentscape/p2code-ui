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
import { Controller, useFieldArray } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { HttpError, useList } from "@refinedev/core";

export default function ResourceCategoryEdit() {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
    refineCore: { formLoading },
    getFieldState,
    watch,
  } = useForm({});
  const { data, isLoading, isError } = useList({
    resource: "resourceCandidate",
  });

  const resourceCandidates = data?.data ?? [];

  const lifecycleStatusState = getFieldState("lifecycleStatus");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "resourceCandidate",
  });
  const candidateFields = watch("resourceCandidate");
  const addCandidate = (event: SelectChangeEvent) => {
    const id = event.target.value as string;

    const candidate = resourceCandidates.find(
      (candidate) => candidate.id === id
    );

    append({
      id: candidate?.id ?? "",
      name: candidate?.name ?? "",
      version: candidate?.version ?? "",
      href: candidate?.href ?? "",
      "@referredType": candidate?.["@referredType"] ?? "",
    });
  };

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
          Resource Candidates
        </Typography>
        {candidateFields?.map((item: any, index: number) => (
          <Box
            key={`resourceCandidate_${index}`}
            sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}
          >
            <TextField
              disabled
              label="ID"
              fullWidth
              {...register(`resourceCandidate.${index}.id`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Name"
              fullWidth
              {...register(`resourceCandidate.${index}.name`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Version"
              fullWidth
              {...register(`resourceCandidate.${index}.version`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Href"
              fullWidth
              {...register(`resourceCandidate.${index}.href`)}
              margin="dense"
            />
            <Button onClick={() => remove(index)} color="error">
              Remove Resource Candidate
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
            {resourceCandidates.map((candidate) => (
              <MenuItem value={candidate.id}>{candidate.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Edit>
  );
}
