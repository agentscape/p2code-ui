"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Fab,
  Grid,
  Grid2,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavigateNext, OpenInNew, Telegram } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

import AskQuestionCard from "@components/ask-question-card";
import { Link } from "@refinedev/core";
import { JsonViewer } from "@textea/json-viewer";

const steps = ["Select service", "Configure service", "Deploy"];
const ServiceManagementPage = () => {
  const services = [
    {
      id: 1,
      description: "A service order for the Kubernetes cluster",
      defaultValues: {
        orderDate: new Date().toISOString().slice(0, 19),
        requestedCompletionDate: new Date().toISOString().slice(0, 19),
        requestedStartDate: new Date().toISOString().slice(0, 19),
        description: "A service order for the Kubernetes cluster",
        serviceOrderItems: [
          {
            name: "service-spec-end-user-cfs",
            version: "1.2.0",
            id: "bb4f3d66-5350-49ea-8b31-ff325f149200",
            characteristics: [
              { name: "Service name", value: "CMS", valueType: "TEXT" },
              {
                name: "Service package manager",
                value: "helm",
                valueType: "ENUM",
              },
              {
                name: "Base service registry/repository URL",
                value: "https://charts.bitnami.com/bitnami",
                valueType: "TEXT",
              },
              {
                name: "Service artifact identifier in service registry/repository",
                value: "nginx",
                valueType: "TEXT",
              },
              {
                name: "Service artifact version",
                value: "19.0.3",
                valueType: "TEXT",
              },
              {
                name: "Cluster Manager",
                value: "Kubernetes",
                valueType: "ENUM",
              },
            ],
          },
          {
            name: "K8aaS:Openslice-dev",
            version: "1.2.0",
            id: "c04f3d66-5350-49ea-8b31-ff325f149232",
            characteristics: [
              {
                name: "Flavor of Nodes",
                value: "cpu4.m8192.d20g",
                valueType: "ENUM",
              },
              { name: "Number of worker nodes", value: "1", valueType: "TEXT" },
            ],
          },
        ],
      },
    },
  ];

  const [selectedService, setSelectedService] = useState<any>({
    defaultValues: {
      serviceOrderItems: [
        {
          characteristics: [],
        },
      ],
    },
  });
  const selectService = (service: any) => {
    // const service = services.find((srv) => srv.externalId === id);
    setSelectedService(service ?? {});
    handleNext();
  };

  // Stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
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

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: selectedService?.defaultValues || {},
  });

  useEffect(() => {
    if (selectedService) {
      reset({
        ...selectedService.defaultValues, // prefill the form
      });
    }
  }, [selectedService, reset]);

  const onSubmit = (data: any) => {
    console.log(data);
    const payload = {
      orderDate: new Date(data.orderDate).toISOString(),
      completionDate: null,
      expectedCompletionDate: null,
      requestedCompletionDate: new Date(
        data.requestedCompletionDate
      ).toISOString(),
      requestedStartDate: new Date(data.requestedStartDate).toISOString(),
      startDate: null,
      "@baseType": "BaseRootEntity",
      state: "INITIAL",
      "@schemaLocation": null,
      "@type": "ServiceOrder",
      href: null,
      category: null,
      description: data.description,
      externalId: null,
      notificationContact: null,
      priority: null,
      note: [],
      serviceOrderItem: data.serviceOrderItems.map((item: any) => ({
        "@baseType": "BaseEntity",
        "@schemaLocation": null,
        "@type": null,
        href: null,
        action: "add",
        orderItemRelationship: [],
        state: "ACKNOWLEDGED",
        service: {
          serviceSpecification: {
            "@baseType": "BaseEntity",
            "@schemaLocation": null,
            "@type": null,
            href: null,
            name: item.name,
            version: item.version,
            targetServiceSchema: null,
            "@referredType": null,
            id: item.id,
          },
          "@baseType": "BaseEntity",
          "@schemaLocation": null,
          "@type": null,
          href: null,
          name: item.name,
          category: null,
          serviceType: null,
          place: [],
          relatedParty: [],
          serviceCharacteristic: item.characteristics.map((c: any) => ({
            "@baseType": "BaseRootEntity",
            "@schemaLocation": null,
            "@type": null,
            href: null,
            name: c.name,
            valueType: c.valueType,
            value: {
              value: c.value,
              alias: null,
            },
          })),
          state: "feasibilityChecked",
          supportingResource: [],
          serviceRelationship: [],
          supportingService: [],
        },
        appointment: null,
      })),
      orderRelationship: [],
      relatedParty: [
        {
          "@baseType": "BaseRootEntity",
          "@schemaLocation": null,
          "@type": null,
          href: null,
          name: "UBITECH",
          role: "REQUESTER",
          "@referredType": "SimpleUsername_Individual",
          id: "2c034f2b-4ecc-44cc-9af3-6633aa96b217",
          extendedInfo: null,
        },
      ],
    };

    console.log(JSON.stringify(payload, null, 2));
  };

  const deployServiceOrder = () => {
    alert("Deploying service order");
    handleSubmit(onSubmit)();

    handleNext();
  };

  return (
    <Container>
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
              Service order submitted!
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Deploy new service</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <Grid2 container spacing={2} columns={16} margin={4}>
                {services?.map((srv, index) => (
                  <Grid2 size={8} key={index}>
                    <Card>
                      <CardContent>
                        {/* <Link to={`/serviceSpecification/show/${srv?.externalId}`}>
                          <Stack direction="row" spacing={2}>
                            {srv?.description}
                            <OpenInNew />
                          </Stack>
                        </Link> */}
                        <Typography variant="body2">
                          {srv.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button onClick={() => selectService(srv)} size="small">
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
                {selectedService && (
                  <Container maxWidth="md" sx={{ py: 4 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="orderDate"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Order Date"
                              type="datetime-local"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="requestedCompletionDate"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Requested Completion Date"
                              type="datetime-local"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="requestedStartDate"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Requested Start Date"
                              type="datetime-local"
                              fullWidth
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Controller
                          name="description"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Description"
                              fullWidth
                              multiline
                            />
                          )}
                        />
                      </Grid>
                      <Typography variant="h6" sx={{ ml: 2, mt: 3 }}>
                        Service Specifications
                      </Typography>
                      {selectedService?.defaultValues?.serviceOrderItems?.map(
                        (serviceOrderItem: any, oIndex: number) => (
                          <Grid item xs={12} key={oIndex}>
                            <Typography variant="subtitle1" sx={{}}>
                              {serviceOrderItem.name}
                              {", "}
                              version {serviceOrderItem.version}
                              <Link
                                to={`/serviceSpecification/show/${serviceOrderItem.id}`}
                              >
                                <Stack direction="row" spacing={2}>
                                  {serviceOrderItem.id}
                                  <OpenInNew />
                                </Stack>
                              </Link>
                            </Typography>

                            {serviceOrderItem?.characteristics?.map(
                              (characteristic: any, cIndex: number) => (
                                <Grid item xs={12} key={cIndex} sx={{ mt: 2 }}>
                                  <Controller
                                    name={`serviceOrderItems.${oIndex}.characteristics.${cIndex}.value`}
                                    control={control}
                                    render={({ field }) => (
                                      <TextField
                                        {...field}
                                        label={characteristic.name}
                                        fullWidth
                                        // defaultValue={characteristic.value}
                                      />
                                    )}
                                  />
                                </Grid>
                              )
                            )}
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Container>
                )}
              </Grid2>
            )}
            {activeStep === 2 && (
              <Grid2 container spacing={2} columns={16} margin={4}>
                {selectedService && (
                  <Container maxWidth="md" sx={{ py: 4 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      ServiceOrder Input Values
                    </Typography>
                    <JsonViewer value={getValues()} rootName={false} />
                  </Container>
                )}
              </Grid2>
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
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={deployServiceOrder}
                >
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
      <Box
        sx={{
          pt: 2,
          alignItems: "center",
        }}
      >
        <AskQuestionCard />
      </Box>
    </Container>
  );
};

export default ServiceManagementPage;
