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

export default function ServiceEdit() {
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
    data: resourceData,
    isLoading: resourceIsLoading,
    isError: resourceIsError,
  } = useList({
    resource: "resource",
    dataProviderName: "resourceInventoryDataProvider",
  });
  const resources = resourceData?.data ?? [];

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
    resource: "serviceSpecification",
  });
  const serviceSpecifications = specificationsData?.data ?? [];

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

  const {
    fields: serviceCharacteristicFields,
    append: appendServiceCharacteristic,
    remove: removeServiceCharacteristicField,
  } = useFieldArray({
    control,
    name: "serviceCharacteristic",
  });
  const serviceCharacteristicFieldsWatch = watch("serviceCharacteristic");
  const addCharacteristic = () => {
    appendServiceCharacteristic({
      name: "",
      value: "",
      valueType: "",
    });
  };

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "feature",
  });
  const featureFieldsWatch = watch("feature");
  const addFeature = () => {
    appendFeature({
      id: "",
      name: "",
      isBundle: "",
      isEnabled: "",
      featureCharacteristic: [],
    });
  };

  const {
    fields: placeFields,
    append: appendPlace,
    remove: removePlace,
  } = useFieldArray({
    control,
    name: "place",
  });
  const placeFieldsWatch = watch("place");
  const addPlace = () => {
    appendPlace({
      id: "",
      name: "",
      href: "",
      role: "",
    });
  };

  const {
    fields: noteFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control,
    name: "note",
  });
  const noteFieldsWatch = watch("note");
  const addNote = () => {
    appendNote({
      author: "",
      date: "",
      text: "",
    });
  };

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({
    control,
    name: "supportingResource",
  });
  const supportingResourceFieldsWatch = watch("supportingResource");

  const addSupportingResource = (event: SelectChangeEvent) => {
    const id = event.target.value as string;

    const resource = resources.find((resource) => resource.id === id);

    appendResource({
      id: resource?.id ?? "",
      name: resource?.name ?? "",
      href: resource?.href ?? "",
      "@referredType": resource?.["@referredType"] ?? "",
    });
  };

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "supportingService",
  });
  const supportingServiceFieldsWatch = watch("supportingService");

  const addSupportingService = (event: SelectChangeEvent) => {
    const id = event.target.value as string;

    const service = services.find((service) => service.id === id);

    appendService({
      id: service?.id ?? "",
      name: service?.name ?? "",
      href: service?.href ?? "",
    });
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
          label="Category"
          {...register("category")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          label="Service Type"
          {...register("serviceType")}
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
          name="endDate"
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
        <Controller
          name="serviceDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Service Date"
                value={dayjs(field.value)}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            </LocalizationProvider>
          )}
        />
        <TextField
          fullWidth
          label="Start Mode"
          {...register("startMode")}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Controller
          name={"hasStarted"}
          control={control}
          render={({ field }) => (
            <>
              <InputLabel sx={{ mt: 1 }} shrink={true}>
                Has Started
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
          name={"isBundle"}
          control={control}
          render={({ field }) => (
            <>
              <InputLabel sx={{ mt: 1 }} shrink={true}>
                Is Bundle
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
          name={"isServiceEnabled"}
          control={control}
          render={({ field }) => (
            <>
              <InputLabel sx={{ mt: 1 }} shrink={true}>
                Is Service Enabled
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
          name={"isStateful"}
          control={control}
          render={({ field }) => (
            <>
              <InputLabel sx={{ mt: 1 }} shrink={true}>
                Is Stateful
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
          Service Characteristics
        </Typography>
        {serviceCharacteristicFieldsWatch?.map((item: any, index: number) => (
          <Box
            key={`serviceCharacteristic_${index}`}
            sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}
          >
            <TextField
              disabled
              label="Name"
              fullWidth
              {...register(`serviceCharacteristic.${index}.name`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Value"
              fullWidth
              {...register(`serviceCharacteristic.${index}.value`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Value Type"
              fullWidth
              {...register(`serviceCharacteristic.${index}.valueType`)}
              margin="dense"
            />
            <Button
              onClick={() => removeServiceCharacteristicField(index)}
              color="error"
            >
              Remove
            </Button>
          </Box>
        ))}
        <Button onClick={addCharacteristic} color="info">
          Add Characteristic
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
          Features
        </Typography>
        {featureFieldsWatch?.map((item: any, index: number) => (
          <Box
            key={`feature_${index}`}
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
              {...register(`feature.${index}.id`)}
              margin="dense"
            />
            <TextField
              label="Name"
              fullWidth
              {...register(`feature.${index}.name`)}
              margin="dense"
            />
            <Controller
              name={`feature.${index}.isBundle`}
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel sx={{ mt: 1 }} shrink={true}>
                    Is Bundle
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
              name={`feature.${index}.isEnabled`}
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel sx={{ mt: 1 }} shrink={true}>
                    Is Enabled
                  </InputLabel>
                  <Switch
                    checked={field.value}
                    onChange={() => field.onChange(!field.value)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </>
              )}
            />

            <Button onClick={() => removeFeature(index)} color="error">
              Remove
            </Button>
          </Box>
        ))}
        <Button onClick={addFeature} color="info">
          Add Feature
        </Button>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Places
        </Typography>
        {placeFieldsWatch?.map((item: any, index: number) => (
          <Box
            key={`place_${index}`}
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
              {...register(`place.${index}.id`)}
              margin="dense"
            />
            <TextField
              label="Name"
              fullWidth
              {...register(`place.${index}.name`)}
              margin="dense"
            />
            <TextField
              label="Role"
              fullWidth
              {...register(`place.${index}.role`)}
              margin="dense"
            />
            <TextField
              label="Href"
              fullWidth
              {...register(`place.${index}.href`)}
              margin="dense"
            />
            <Button onClick={() => removePlace(index)} color="error">
              Remove
            </Button>
          </Box>
        ))}
        <Button onClick={addPlace} color="info">
          Add Place
        </Button>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Notes
        </Typography>
        {noteFieldsWatch?.map((item: any, index: number) => (
          <Box
            key={`note_${index}`}
            sx={{
              p: 2,
              border: "1px solid #ccc",
              mb: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              label="author"
              fullWidth
              {...register(`note.${index}.author`)}
              margin="dense"
            />
            <Controller
              name="date"
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
            <TextField
              label="text"
              fullWidth
              {...register(`note.${index}.text`)}
              margin="dense"
            />
            <Button onClick={() => removeNote(index)} color="error">
              Remove
            </Button>
          </Box>
        ))}
        <Button onClick={addNote} color="info">
          Add Note
        </Button>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Supporting Resources
        </Typography>
        {supportingResourceFieldsWatch?.map((item: any, index: number) => (
          <Box
            key={`supportingResource_${index}`}
            sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}
          >
            <TextField
              disabled
              label="ID"
              fullWidth
              {...register(`supportingResource.${index}.id`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Name"
              fullWidth
              {...register(`supportingResource.${index}.name`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Href"
              fullWidth
              {...register(`supportingResource.${index}.href`)}
              margin="dense"
            />
            <Button onClick={() => removeResource(index)} color="error">
              Remove
            </Button>
          </Box>
        ))}
        <FormControl sx={{ mt: 1 }}>
          <InputLabel id="resource-simple-select-label">
            Add Resource
          </InputLabel>
          <Select
            labelId="resource-simple-select-label"
            id="resource-simple-select"
            label="Add Resource"
            onChange={addSupportingResource}
          >
            {resources.map((resource) => (
              <MenuItem value={resource.id}>{resource.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Supporting Services
        </Typography>
        {supportingServiceFieldsWatch?.map((item: any, index: number) => (
          <Box
            key={`supportingService_${index}`}
            sx={{ p: 2, border: "1px solid #ccc", mb: 2 }}
          >
            <TextField
              disabled
              label="ID"
              fullWidth
              {...register(`supportingService.${index}.id`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Name"
              fullWidth
              {...register(`supportingService.${index}.name`)}
              margin="dense"
            />
            <TextField
              disabled
              label="Href"
              fullWidth
              {...register(`supportingService.${index}.href`)}
              margin="dense"
            />
            <Button onClick={() => removeService(index)} color="error">
              Remove
            </Button>
          </Box>
        ))}
        <FormControl sx={{ mt: 1 }}>
          <InputLabel id="service-simple-select-label">
            Add Supporting Service
          </InputLabel>
          <Select
            labelId="service-simple-select-label"
            id="service-simple-select"
            label="Add Supporting Service"
            onChange={addSupportingService}
          >
            {services.map((service) => (
              <MenuItem value={service.id}>{service.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Edit>
  );
}
