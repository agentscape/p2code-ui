"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Grid2,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { Link, useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

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

export default function ResourceOrderShow() {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />
        <Typography variant="body1" fontWeight="bold">
          {"External ID"}
        </Typography>
        <TextField value={record?.externalId} />
        <Typography variant="body1" fontWeight="bold">
          {"Priority"}
        </Typography>
        <TextField value={record?.priority} />
        <Typography variant="body1" fontWeight="bold">
          {"Category"}
        </Typography>
        <TextField value={record?.category} />
        <Typography variant="body1" fontWeight="bold">
          {"Description"}
        </Typography>
        <TextField value={record?.description} />
        <Typography variant="body1" fontWeight="bold">
          {"Requested Start Date"}
        </Typography>
        <TextField value={record?.requestedStartDate} />
        <Typography variant="body1" fontWeight="bold">
          {"Requested Completion Date"}
        </Typography>
        <TextField value={record?.requestedCompletionDate} />
        <Typography variant="body1" fontWeight="bold">
          {"Expected Completion Date"}
        </Typography>
        <TextField value={record?.expectedCompletionDate} />
        <Typography variant="body1" fontWeight="bold">
          {"Start Date"}
        </Typography>
        <TextField value={record?.startDate} />
        <Typography variant="body1" fontWeight="bold">
          {"Oder Date"}
        </Typography>
        <TextField value={record?.orderDate} />
        <Typography variant="body1" fontWeight="bold">
          {"Completion Date"}
        </Typography>
        <TextField value={record?.completionDate} />
        <Typography variant="body1" fontWeight="bold">
          {"Cancellation Date"}
        </Typography>
        <TextField value={record?.cancellationDate} />
        <Typography variant="body1" fontWeight="bold">
          {"Cancellation Reason"}
        </Typography>
        <TextField value={record?.cancellationReason} />
        <Typography variant="body1" fontWeight="bold">
          {"Notification Contact"}
        </Typography>
        <TextField value={record?.notificationContact} />
        <Typography variant="body1" fontWeight="bold">
          {"State"}
        </Typography>
        <Chip
          label={record?.state}
          color="success"
          sx={{ width: 150, mt: 1 }}
        />
        <Accordion sx={{ mt: 1, mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Related Party
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {record?.relatedParty?.map(
              (
                party: { name: string; role: string; href: string },
                index: number
              ) => (
                <Stack key={index} gap={1} sx={{ pl: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {"Party Name"}
                  </Typography>
                  <TextField value={party?.name} />

                  <Typography variant="body2" fontWeight="bold">
                    {"Role"}
                  </Typography>
                  <TextField value={party?.role} />

                  <Typography variant="body2" fontWeight="bold">
                    {"Href"}
                  </Typography>
                  <TextField
                    value={party?.href}
                    sx={{ color: "text.secondary" }}
                  />
                </Stack>
              )
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ mt: 1, mb: 1 }}>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Resource Order Items
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              <Grid2 container spacing={2}>
                {record?.resourceOrderItem?.map(
                  (orderItem: any, index: number) => (
                    <Grid2 size={4}>
                      <Item sx={{ my: 1, p: 2 }}>
                        <Stack key={index} gap={1} sx={{ pl: 2 }}>
                          <Typography variant="body2" fontWeight="bold">
                            {"ID"}
                          </Typography>
                          <TextField value={orderItem?.id} />

                          <Typography variant="body2" fontWeight="bold">
                            {"Action"}
                          </Typography>
                          <TextField value={orderItem?.action} />
                          <Typography variant="body2" fontWeight="bold">
                            {"State"}
                          </Typography>
                          <TextField value={orderItem?.state} />

                          <Typography variant="body2" fontWeight="bold">
                            {"Quantity"}
                          </Typography>
                          <TextField value={orderItem?.quantity} />

                          <Typography variant="body2" fontWeight="bold">
                            {"Resource"}
                          </Typography>

                          <Link
                            go={{
                              to: {
                                resource: "resource",
                                action: "show",
                                id: orderItem?.resource?.id || "0",
                              },
                            }}
                          >
                            <TextField value={orderItem?.resource?.name} />
                          </Link>
                          <Accordion sx={{ mt: 1, mb: 1 }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2-content"
                              id="panel2-header"
                            >
                              <Typography component="span" fontWeight="bold">
                                Resource Specification
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Stack key={index} gap={1} sx={{ pl: 2 }}>
                                <Typography variant="body2" fontWeight="bold">
                                  {"ID"}
                                </Typography>
                                <TextField
                                  value={
                                    orderItem?.resource?.resourceSpecification
                                      ?.id
                                  }
                                />

                                <Typography variant="body2" fontWeight="bold">
                                  {"Name"}
                                </Typography>
                                <TextField
                                  value={
                                    orderItem?.resource?.resourceSpecification
                                      ?.name
                                  }
                                />

                                <Typography variant="body2" fontWeight="bold">
                                  {"Href"}
                                </Typography>
                                <TextField
                                  value={
                                    orderItem?.resource?.resourceSpecification
                                      ?.href
                                  }
                                />
                              </Stack>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion sx={{ mt: 1, mb: 1 }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2-content"
                              id="panel2-header"
                            >
                              <Typography component="span" fontWeight="bold">
                                Resource Characteristics
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {orderItem?.resource?.resourceCharacteristic.map(
                                (element: any, index: number) => (
                                  <Item sx={{ my: 1, p: 2 }}>
                                  <Stack key={index} gap={1} sx={{ pl: 2 }}>
                                    <Typography
                                      variant="body2"
                                      fontWeight="bold"
                                    >
                                      {"Name"}
                                    </Typography>
                                    <TextField value={element?.name} />

                                    <Typography
                                      variant="body2"
                                      fontWeight="bold"
                                    >
                                      {"Value"}
                                    </Typography>
                                    <TextField value={element?.value} />

                                    <Typography
                                      variant="body2"
                                      fontWeight="bold"
                                    >
                                      {"Value Type"}
                                    </Typography>
                                    <TextField value={element?.valueType} />
                                  </Stack>
                                  </Item>
                                )
                              )}
                            </AccordionDetails>
                          </Accordion>
                        </Stack>
                      </Item>
                    </Grid2>
                  )
                )}
              </Grid2>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Typography variant="body2" fontWeight="bold">
          {"Href"}
        </Typography>
        <TextField value={record?.href} sx={{ color: "text.secondary" }} />
        <Typography variant="body2" fontWeight="bold">
          {"Base Type"}
        </Typography>
        <TextField
          value={record?.["@baseType"]}
          sx={{ color: "text.secondary" }}
        />
        <Typography variant="body2" fontWeight="bold">
          {"Schema Location"}
        </Typography>
        <TextField
          value={record?.["@schemaLocation"]}
          sx={{ color: "text.secondary" }}
        />
      </Stack>
    </Show>
  );
}
