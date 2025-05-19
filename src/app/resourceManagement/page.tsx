"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Fab,
  Grid2,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useList } from "@refinedev/core";
import React, { useId, useState } from "react";
import { NavigateNext, OpenInNew, Telegram } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  maxWidth: 400,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const steps = ["Select resource", "Configure resource", "Deploy"];
const ResourceManagementPage = () => {
  const {
    saveButtonProps,
    refineCore: { onFinish, formLoading, query },
    register,
    setValue,
    handleSubmit,
    resetField,
    control,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      dataProviderName: "resourceOrderingDataProvider",
      resource: "resourceOrder",
      action: "create",
    },
  });
  const resourceOrderItemId = Math.random().toString(36).substr(2, 9);
  setValue("requestedStartDate", new Date().toISOString());
  setValue("requestedCompletionDate", new Date().toISOString());

  const { data: resourceData } = useList({
    resource: "resource",
  });

  const resources = resourceData?.data || [];

  const [selectedResource, setSelectedResource] = useState({
    resourceCharacteristic: [],
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const selectResource = (id: any) => {
    const resource = resources.find((srv) => srv.id === id);

    // console.log(service);
    setSelectedResource((resource as any) ?? { resourceCharacteristic: [] });

    setValue(`resourceOrderItem[0].resource.id`, resource?.id ?? "");
    setValue(`resourceOrderItem[0].resource.name`, resource?.name ?? "");
    setValue(
      `resourceOrderItem[0].resource.category`,
      resource?.category ?? ""
    );
    setValue(
      `resourceOrderItem[0].resource.resourceType`,
      resource?.resourceType ?? ""
    );
    setValue(
      `resourceOrderItem[0].resource.isResourceEnabled`,
      resource?.isResourceEnabled ?? ""
    );
    setValue(`resourceOrderItem[0].resource.state`, resource?.state ?? "");
    setValue(
      `resourceOrderItem[0].resource.resourceSpecification`,
      resource?.resourceSpecification ?? ""
    );

    handleNext();
  };

  const createResourceOrder = () => {
    handleSubmit(onFinish);

    handleNext();
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Resource order submitted!
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Deploy new resource</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <Grid2 container spacing={2} columns={16} margin={4}>
                {resources?.map((srv) => (
                  <Grid2 size={8}>
                    <Card>
                      <CardContent>
                        <Link to={`/resource/show/${srv?.id}`}>
                          <Stack direction="row" spacing={2}>
                            {srv?.name}
                            <OpenInNew />
                          </Stack>
                        </Link>
                        <Typography variant="body2">
                          {srv.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          onClick={() => selectResource(srv?.id)}
                          size="small"
                        >
                          Select
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
            )}
            {activeStep === 1 && (
              <Grid2 container spacing={2} columns={16} margin={4}>
                <Box
                  component="form"
                  autoComplete="off"
                  sx={{ display: "flex" }}
                >
                  {selectedResource?.resourceCharacteristic?.map(
                    (spec: any, index: number) => (
                      <Item sx={{ my: 1, mx: 1, p: 2 }}>
                        <Stack key={index} gap={1}>
                          <Typography variant="body2" fontWeight="bold">
                            {"Name"}
                          </Typography>
                          <TextField
                            disabled
                            fullWidth
                            label="Name"
                            margin="normal"
                            defaultValue={spec?.name}
                            {...register(
                              `resourceOrderItem[0].resource.resourceCharacteristic.${index}.name`
                            )}
                            slotProps={{ inputLabel: { shrink: true } }}
                          />

                          <Typography variant="body2" fontWeight="bold">
                            {"Value"}
                          </Typography>
                          <TextField
                            fullWidth
                            label="Value"
                            margin="normal"
                            defaultValue={spec?.value}
                            {...register(
                              `resourceOrderItem[0].resource.resourceCharacteristic.${index}.value`
                            )}
                            slotProps={{ inputLabel: { shrink: true } }}
                          />

                          <Typography variant="body2" fontWeight="bold">
                            {"Value Type"}
                          </Typography>
                          <TextField
                            disabled
                            fullWidth
                            label="Value Type"
                            margin="normal"
                            defaultValue={spec?.valueType}
                            {...register(
                              `resourceOrderItem[0].resource.resourceCharacteristic.${index}.valueType`
                            )}
                            slotProps={{ inputLabel: { shrink: true } }}
                          />
                        </Stack>
                      </Item>
                    )
                  )}
                </Box>
              </Grid2>
            )}
            {activeStep === 2 && (
              <Box component="form" autoComplete="off" sx={{ width: "100%" }}>
                <Stack gap={1}>
                  <Typography variant="body2" fontWeight="bold">
                    {"Complete your resource order"}
                  </Typography>
                  <TextField
                    fullWidth
                    label="External Id"
                    margin="normal"
                    {...register(`externalId`)}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    margin="normal"
                    slotProps={{ inputLabel: { shrink: true } }}
                    {...register(`description`)}
                    multiline
                  />
                  <TextField
                    fullWidth
                    label="Category"
                    margin="normal"
                    slotProps={{ inputLabel: { shrink: true } }}
                    {...register(`category`)}
                  />
                  <TextField
                    fullWidth
                    label="Priority"
                    {...register("priority")}
                    margin="normal"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  <Controller
                    name="requestedStartDate"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Requested Start Date"
                          value={dayjs(field.value)}
                          onChange={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          slotProps={{
                            textField: { fullWidth: true, margin: "normal" },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                  <Controller
                    name="requestedCompletionDate"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Requested Completion Date"
                          value={dayjs(field.value)}
                          onChange={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          slotProps={{
                            textField: { fullWidth: true, margin: "normal" },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                  <TextField
                    fullWidth
                    label="Notification Contact"
                    {...register("notificationContact")}
                    margin="normal"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  <TextField
                    fullWidth
                    label="Action"
                    defaultValue="add"
                    {...register("resourceOrderItem[0].action")}
                    margin="normal"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    {...register("resourceOrderItem[0].quantity")}
                    margin="normal"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                  <TextField
                    disabled
                    fullWidth
                    label="Order Item ID"
                    defaultValue={resourceOrderItemId}
                    {...register("resourceOrderItem[0].id")}
                    margin="normal"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  <TextField
                    disabled
                    fullWidth
                    label="Order Date"
                    defaultValue={new Date().toISOString()}
                    {...register("orderDate")}
                    margin="normal"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                  <TextField
                    disabled
                    fullWidth
                    label="Order State"
                    defaultValue={"pending"}
                    {...register("state")}
                    margin="normal"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </Stack>
              </Box>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === 1 && (
                <Fab variant="extended" color="primary" onClick={handleNext}>
                  <NavigateNext sx={{ mr: 1 }} />
                  Go to deployment
                </Fab>
              )}
              {activeStep === 2 && (
                <Fab variant="extended" color="primary" type="submit">
                  <Telegram sx={{ mr: 1 }} />
                  Deploy
                </Fab>
              )}
              {/* <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button> */}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </form>
  );
};

export default ResourceManagementPage;
