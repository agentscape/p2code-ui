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
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

export default function CancelResourceOrderShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
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
          Effective Cancellation Date
        </Typography>
        <TextField value={record?.effectiveCancellationDate} />

        <Accordion sx={{ mt: 1, mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Resource Order
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={1} sx={{ pl: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                {"ID"}
              </Typography>
              <Link
                go={{
                  to: {
                    resource: "resourceOrder",
                    action: "show",
                    id: record?.resourceOrder?.id || "0",
                  },
                }}
              >
                <TextField value={record?.resourceOrder?.id} />
              </Link>

              <Typography variant="body2" fontWeight="bold">
                {"Name"}
              </Typography>
              <TextField value={record?.resourceOrder?.name} />

              <Typography variant="body2" fontWeight="bold">
                {"Href"}
              </Typography>
              <TextField value={record?.resourceOrder?.href} />
            </Stack>
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
        <Typography variant="body2" fontWeight="bold">
          {"Type"}
        </Typography>
        <TextField value={record?.["@type"]} sx={{ color: "text.secondary" }} />
      </Stack>
    </Show>
  );
}
