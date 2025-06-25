import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type AggregatedService = {
  categoryId: string;
  category: string;
  description: string;
  serviceSpecificationId: string;
  name: string;
  version: string;
  characteristics: {
    name: string;
    value: string;
    valueType: string;
  }[];
};

type Props = {
  categoryId: string;
  allServices: AggregatedService[];
  onChange: (
    services: AggregatedService[],
    meta: {
      requestedStartDate: string;
      requestedCompletionDate: string;
      description: string;
    }
  ) => void;
};

export const CategoryServiceConfigurator: React.FC<Props> = ({
  categoryId,
  allServices,
  onChange,
}) => {
  const [selectedServices, setSelectedServices] = useState<AggregatedService[]>(
    []
  );
  const [selectedId, setSelectedId] = useState("");
  const [description, setDescription] = useState(
    "A new service order"
  );
  const [requestedStartDate, setRequestedStartDate] = useState<Dayjs>(dayjs());
  const [requestedCompletionDate, setRequestedCompletionDate] = useState<Dayjs>(
    dayjs().add(1, "day")
  );

  const servicesForCategory = allServices.filter(
    (s) => s.categoryId === categoryId || s.categoryId === "uncategorized"
  );

  useEffect(() => {
    onChange(selectedServices, {
      requestedStartDate: requestedStartDate.toISOString(),
      requestedCompletionDate: requestedCompletionDate.toISOString(),
      description,
    });
  }, [
    selectedServices,
    requestedStartDate,
    requestedCompletionDate,
    description,
  ]);

  const updateServiceState = (newServices: AggregatedService[]) => {
    setSelectedServices(newServices);
  };

  const addService = () => {
    const service = servicesForCategory.find(
      (s) => s.serviceSpecificationId === selectedId
    );
    if (
      service &&
      !selectedServices.some(
        (s) => s.serviceSpecificationId === service.serviceSpecificationId
      )
    ) {
      console.log(service)
      updateServiceState([...selectedServices, service]);
    }
    setSelectedId("");
  };

  const updateCharacteristic = (
    serviceId: string,
    charName: string,
    newValue: string
  ) => {
    const updated = selectedServices.map((s) =>
      s.serviceSpecificationId !== serviceId
        ? s
        : {
            ...s,
            characteristics: s.characteristics.map((c) =>
              c.name === charName ? { ...c, value: newValue } : c
            ),
          }
    );
    updateServiceState(updated);
  };

  const removeService = (serviceId: string) => {
    updateServiceState(
      selectedServices.filter((s) => s.serviceSpecificationId !== serviceId)
    );
  };

  return (
    <Box display="flex" flexDirection="column" gap={4} width={"100%"}>
      {/* Metadata section */}
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Requested Start Date"
            value={requestedStartDate}
            onChange={(newValue) => newValue && setRequestedStartDate(newValue)}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Requested Completion Date"
            value={requestedCompletionDate}
            onChange={(newValue) =>
              newValue && setRequestedCompletionDate(newValue)
            }
          />
        </LocalizationProvider>
      </Box>

      {/* Service selector */}
      <Box display="flex" alignItems="center" gap={2}>
        <FormControl fullWidth>
          <InputLabel>Select a service</InputLabel>
          <Select
            value={selectedId}
            onChange={(e: SelectChangeEvent) =>
              setSelectedId(e.target.value as string)
            }
            label="Select a service"
          >
            {servicesForCategory.map((s) => (
              <MenuItem
                key={s.serviceSpecificationId}
                value={s.serviceSpecificationId}
              >
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={addService} disabled={!selectedId}>
          Add
        </Button>
      </Box>

      {/* Selected services with editable characteristics */}
      {selectedServices.map((service) => (
        <Card key={service.serviceSpecificationId} variant="outlined">
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">{service.name}</Typography>
              <IconButton
                onClick={() => removeService(service.serviceSpecificationId)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            <Box display="flex" flexDirection="column" gap={2}>
              {service.characteristics.map((char) => (
                <TextField
                  key={char.name}
                  label={char.name}
                  value={char.value}
                  onChange={(e) =>
                    updateCharacteristic(
                      service.serviceSpecificationId,
                      char.name,
                      e.target.value
                    )
                  }
                  fullWidth
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
