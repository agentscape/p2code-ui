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
import React, { useEffect, useState, useTransition } from "react";
import { NavigateNext, OpenInNew, Telegram } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

import { Link, useNotification } from "@refinedev/core";
import { JsonViewer } from "@textea/json-viewer";
import {
  fetchAggregatedServices,
  makeServiceOrder,
  ServiceItem,
} from "@app/actions";
import { CategoryServiceConfigurator } from "@components/category-service-configurator";

interface Category {
  id: string;
  name: string;
  description: string;
}

export function buildServiceOrder(
  meta: {
    description: string;
    requestedStartDate: string;
    requestedCompletionDate: string;
  },
  configuredServices: ServiceItem[],
  relatedPartyId: string = "2c034f2b-4ecc-44cc-9af3-6633aa96b217",
  relatedPartyName: string = "UBITECH"
) {
  const now = new Date().toISOString();
  const future = new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString(); // ~6 months later

  const serviceOrderItems = configuredServices.map((service) => ({
    "@baseType": "BaseEntity",
    "@schemaLocation": null,
    "@type": null,
    href: null,
    action: "add",
    orderItemRelationship: [],
    state: "ACKNOWLEDGED",
    appointment: null,
    service: {
      serviceSpecification: {
        "@baseType": "BaseEntity",
        "@schemaLocation": null,
        "@type": null,
        href: null,
        name: service.name,
        version: service.version || "1.0.0",
        targetServiceSchema: null,
        "@referredType": null,
        id: service.serviceSpecificationId,
      },
      "@baseType": "BaseEntity",
      "@schemaLocation": null,
      "@type": null,
      href: null,
      name: service.name,
      category: null,
      serviceType: null,
      place: [],
      relatedParty: [],
      supportingResource: [],
      serviceRelationship: [],
      supportingService: [],
      state: "feasibilityChecked",
      serviceCharacteristic: service.characteristics.map((char) => ({
        "@baseType": "BaseRootEntity",
        "@schemaLocation": null,
        "@type": null,
        href: null,
        name: char.name,
        valueType: char.valueType,
        value: {
          value: char.value,
          alias: null,
        },
      })),
    },
  }));

  return {
    orderDate: now,
    completionDate: null,
    expectedCompletionDate: null,
    requestedCompletionDate: meta.requestedCompletionDate,
    requestedStartDate: meta.requestedStartDate,
    startDate: null,
    "@baseType": "BaseRootEntity",
    state: "INITIAL",
    "@schemaLocation": null,
    "@type": "ServiceOrder",
    href: null,
    category: null,
    description: meta.description,
    externalId: null,
    notificationContact: null,
    priority: null,
    note: [],
    serviceOrderItem: serviceOrderItems,
    orderRelationship: [],
    relatedParty: [
      {
        "@baseType": "BaseRootEntity",
        "@schemaLocation": null,
        "@type": null,
        href: null,
        name: relatedPartyName,
        role: "REQUESTER",
        "@referredType": "SimpleUsername_Individual",
        id: relatedPartyId,
        extendedInfo: null,
      },
    ],
  };
}

const steps = ["Select service", "Configure service", "Deploy"];
const ServiceManagementPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [allServices, setAllServices] = useState<ServiceItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [configuredServices, setConfiguredServices] = useState<ServiceItem[]>(
    []
  );
  const [meta, setMeta] = useState({
    description: "",
    requestedStartDate: "",
    requestedCompletionDate: "",
  });

  const [isPending, startTransition] = useTransition();
  const { open, close } = useNotification();

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchAggregatedServices().then((data) => {
      setAllServices(data);

      const seen = new Map<string, Category>();
      for (const item of Object.values(data)) {
        if (!seen.has(item.categoryId)) {
          seen.set(item.categoryId, {
            id: item.categoryId,
            name: item.category,
            description: item.description,
          });
        }
      }
      setCategories(Array.from(seen.values()));
      setLoading(false);
    });
  }, []);
  const selectService = (categoryId: string) => {
    setSelectedCategory(categoryId);
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

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const deployServiceOrder = () => {
    const serviceOrder = buildServiceOrder(meta, configuredServices);

    startTransition(async () => {
      const result = await makeServiceOrder(serviceOrder);

      if (result.success) {
        open?.({
          type: "success",
          message: "Success",
          description: "Successfully submitted service order",
        });
      } else {
        open?.({
          type: "error",
          message: "Error",
          description: "There has been an error submitting the service order",
        });
      }
    });

    handleNext();
  };
  if (isLoading) return <p>Loading...</p>;

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
                {categories?.map((srv, index) => (
                  <Grid2 size={8} key={index}>
                    <Card>
                      <CardContent>
                        {/* <Link to={`/serviceSpecification/show/${srv?.externalId}`}>
                          <Stack direction="row" spacing={2}>
                            {srv?.description}
                            <OpenInNew />
                          </Stack>
                        </Link> */}
                        <Typography>{srv.name}</Typography>
                        <Link to={`/serviceCategory/show/${srv.id}`}>
                          <Stack direction="row" spacing={2}>
                            {srv.id}
                            <OpenInNew />
                          </Stack>
                        </Link>
                        <Typography variant="body2">
                          {srv.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          onClick={() => selectService(srv.id)}
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
                <CategoryServiceConfigurator
                  categoryId={selectedCategory}
                  allServices={allServices}
                  onChange={(services, meta) => {
                    setConfiguredServices(services);
                    setMeta(meta);
                  }}
                />
              </Grid2>
            )}
            {activeStep === 2 && (
              <Grid2 container spacing={2} columns={16} margin={4}>
                {/* <pre className="bg-gray-100 p-4 rounded mt-6">
                  {JSON.stringify(
                    buildServiceOrder(configuredServices),
                    null,
                    2
                  )}
                </pre> */}
                <Container maxWidth="md" sx={{ py: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Service Order
                  </Typography>
                  <JsonViewer
                    value={buildServiceOrder(meta, configuredServices)}
                    rootName={false}
                  />
                </Container>
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
        {/* <AskQuestionCard /> */}
      </Box>
    </Container>
  );
};

export default ServiceManagementPage;
