"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
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

export default function ServiceOrderShow() {
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
              Service Order Items
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              {record?.serviceOrderItem?.map(
                (orderItem: any, index: number) => (
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
                        {"Service"}
                      </Typography>

                      <Link
                        go={{
                          to: {
                            resource: "service",
                            action: "show",
                            id: orderItem?.service?.id || "0",
                          },
                        }}
                      >
                        <TextField value={orderItem?.service?.name} />
                      </Link>

                      <Typography variant="body2" fontWeight="bold">
                        {"State"}
                      </Typography>
                      <TextField value={orderItem?.state} />

                      <Typography variant="body2" fontWeight="bold">
                        {"Appointment ID"}
                      </Typography>
                      <TextField value={orderItem?.appointment?.id} />
                      <Typography variant="body2" fontWeight="bold">
                        {"Appointment Href"}
                      </Typography>
                      <TextField value={orderItem?.appointment?.href} />

                      <Accordion sx={{ mt: 1, mb: 1 }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2-content"
                          id="panel2-header"
                        >
                          <Typography component="span" fontWeight="bold">
                            Notes
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {orderItem?.note?.map(
                            (element: any, index: number) => (
                              <Stack key={index} gap={1} sx={{ pl: 2 }}>
                                <Typography variant="body2" fontWeight="bold">
                                  {"Author"}
                                </Typography>
                                <TextField value={element?.author} />

                                <Typography variant="body2" fontWeight="bold">
                                  {"Date"}
                                </Typography>
                                <TextField value={element?.date} />

                                <Typography variant="body2" fontWeight="bold">
                                  {"Text"}
                                </Typography>
                                <TextField value={element?.text} />
                              </Stack>
                            )
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Stack>
                  </Item>
                )
              )}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 1, mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Notes
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {record?.note?.map((element: any, index: number) => (
              <Stack key={index} gap={1} sx={{ pl: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  {"Author"}
                </Typography>
                <TextField value={element?.author} />

                <Typography variant="body2" fontWeight="bold">
                  {"Date"}
                </Typography>
                <TextField value={element?.date} />

                <Typography variant="body2" fontWeight="bold">
                  {"Text"}
                </Typography>
                <TextField value={element?.text} />
              </Stack>
            ))}
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
