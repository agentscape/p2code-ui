"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
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

export default function CancelServiceOrderShow() {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          ID
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          State
        </Typography>
        <TextField value={record?.state} />

        <Typography variant="body1" fontWeight="bold">
          Cancellation Reason
        </Typography>
        <TextField value={record?.cancellationReason} />

        <Typography variant="body1" fontWeight="bold">
          Requested Cancellation Date
        </Typography>
        <TextField value={record?.requestedCancellationDate} />

        <Typography variant="body1" fontWeight="bold">
          Cancellation Date
        </Typography>
        <TextField value={record?.cancellationDate} />

        <Accordion sx={{ mt: 1, mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Cancellation Items
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {record?.cancellationItem?.map((item: any, index: number) => (
              <Stack key={index} gap={1} sx={{ pl: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  {"Reason"}
                </Typography>
                <TextField value={item?.reason} />

                <Typography variant="body2" fontWeight="bold">
                  {"State"}
                </Typography>
                <TextField value={item?.state} />

                <Item sx={{ my: 1, p: 2 }}>
                  <Stack key={index} gap={1} sx={{ pl: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {"ID"}
                    </Typography>
                    <TextField value={item?.serviceOrderItem.id} />

                    <Typography variant="body2" fontWeight="bold">
                      {"Service Order ID"}
                    </Typography>
                    <Link
                      go={{
                        to: {
                          resource: "serviceOrder",
                          action: "show",
                          id: item?.serviceOrderItem?.serviceOrderId || "0",
                        },
                      }}
                    >
                      <TextField
                        value={item?.serviceOrderItem.serviceOrderId}
                      />
                    </Link>
                  </Stack>
                </Item>
              </Stack>
            ))}
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
            {record?.note?.map((note: any, index: number) => (
              <Stack key={index} gap={1} sx={{ pl: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  {"Author"}
                </Typography>
                <TextField value={note?.author} />

                <Typography variant="body2" fontWeight="bold">
                  {"Date"}
                </Typography>
                <TextField value={note?.date} />

                <Typography variant="body2" fontWeight="bold">
                  {"Text"}
                </Typography>
                <TextField
                  value={note?.text}
                  sx={{ color: "text.secondary" }}
                />
              </Stack>
            ))}
          </AccordionDetails>
        </Accordion>

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

        <Typography variant="body2" fontWeight="bold">
          {"Href"}
        </Typography>
        <TextField value={record?.href} sx={{ color: "text.secondary" }} />
      </Stack>
    </Show>
  );
}
