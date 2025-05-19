import {
  TextField,
  Typography,
  Button,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useList } from "@refinedev/core";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const enumOptions = {
  servicePackageManager: ["helm", "kustomize", "operator"],
  clusterManager: ["Kubernetes", "Openshift", "Rancher"],
  flavorOfNodes: ["cpu4.m8192.d20g", "cpu2.m4096.d10g"],
};

export default function ServiceOrderForm() {
  const {
    data: specificationsData,
    isLoading: specificationsIsLoading,
    isError: specificationsIsError,
  } = useList({
    resource: "serviceSpecification",
    dataProviderName: "serviceCatalogDataProvider",
    pagination: {
      mode: "off",
    },
  });
  const serviceSpecifications = specificationsData?.data ?? [];
  const changeSpecification = (event: SelectChangeEvent, index: number) => {
    const id = event.target.value as string;

    const specification = serviceSpecifications.find(
      (specification) => specification.id === id
    );

    console.log(JSON.stringify(event, null, 2));
  };
  const removeSpecification = () => {};

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      orderDate: new Date().toISOString().slice(0, 19),
      startDate: new Date().toISOString().slice(0, 19),
      requestedStartDate: "",
      requestedCompletionDate: "",
      expectedCompletionDate: "",
      completionDate: null,
      description: "",
      relatedPartyName: "",
      relatedPartyRole: "",
      relatedPartyId: "",
      serviceOrderItems: [
        {
          name: "",
          version: "",
          id: "",
          characteristics: [
            {
              name: "Service name",
              value: "CMS",
              valueType: "TEXT",
            },
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
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "serviceOrderItems",
  });

  const onSubmit = (data: any) => {
    const payload = {
      orderDate: data.orderDate,
      completionDate: null,
      expectedCompletionDate: data.startDate,
      requestedCompletionDate: data.startDate,
      requestedStartDate: data.startDate,
      startDate: data.startDate,
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

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
      autoComplete="off"
    >
      <Controller
        name="orderDate"
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Order Date"
              value={dayjs(field.value)}
              onChange={(date) => field.onChange(date?.toISOString())}
              slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
            />
          </LocalizationProvider>
        )}
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
        name="description"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Description" fullWidth multiline />
        )}
      />

      <Typography variant="h6">Related Party</Typography>

      <Controller
        name="relatedPartyName"
        control={control}
        render={({ field }) => <TextField {...field} label="Name" fullWidth />}
      />

      <Controller
        name="relatedPartyRole"
        control={control}
        render={({ field }) => <TextField {...field} label="Role" fullWidth />}
      />

      <Controller
        name="relatedPartyId"
        control={control}
        render={({ field }) => <TextField {...field} label="ID" fullWidth />}
      />

      {fields.map((item, index) => (
        <Controller
          name={`serviceOrderItems.${index}.id`}
          control={control}
          render={({ field }) => (
            <FormControl sx={{ mt: 1 }} key={item.id}>
              <Typography variant="subtitle1">
                Service Order Item #{index + 1}
              </Typography>
              <Select
                {...field}
                id={`service-specification-${index}-select`}
                sx={{ width: "100%" }}
              >
                {specificationsData?.data.map((specification: any) => (
                  <MenuItem key={specification.id} value={specification.id}>
                    {specification.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      ))}

      <Button
        onClick={() =>
          append({
            name: "",
            version: "",
            id: "",
            characteristics: [],
          })
        }
      >
        Add Service Item
      </Button>
    </Box>
  );
}
