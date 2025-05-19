"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ServiceCandidateShow() {
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
          {"Name"}
        </Typography>
        <TextField value={record?.name} />

        <Typography variant="body1" fontWeight="bold">
          {"Description"}
        </Typography>
        <TextField value={record?.description} />

        <Typography variant="body1" fontWeight="bold">
          {"Version"}
        </Typography>
        <TextField value={record?.version} />

        <Typography variant="body1" fontWeight="bold">
          {"Lifecycle Status"}
        </Typography>
        {record?.lifecycleStatus && (
          <Chip
            label={record?.lifecycleStatus}
            color="success"
            sx={{ width: 100 }}
          />
        )}

        <Typography variant="body1" fontWeight="bold">
          {"Valid From"}
        </Typography>
        <TextField value={record?.validFor?.startDateTime} />

        <Typography variant="body1" fontWeight="bold">
          {"Valid Until"}
        </Typography>
        <TextField value={record?.validFor?.endDateTime} />

        <Typography variant="body1" fontWeight="bold">
          {"Last Update"}
        </Typography>
        <TextField value={record?.lastUpdate} />

        <Accordion sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Service Categories
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {record?.category?.map(
              (
                cat: { id: string; name: string; href: string },
                index: number
              ) => (
                <Stack key={index} gap={1} sx={{ pl: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {"Service Category"}
                  </Typography>
                  <Link
                    go={{
                      to: {
                        resource: "serviceCategory",
                        action: "show",
                        id: cat?.id,
                      },
                    }}
                  >
                    <TextField value={cat?.name} />
                  </Link>
                  <Typography variant="body2" fontWeight="bold">
                    {"Href"}
                  </Typography>
                  <TextField
                    value={cat?.href}
                    sx={{ color: "text.secondary" }}
                  />
                </Stack>
              )
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Service Specification
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={1} sx={{ pl: 2 }}>
              <Link
                go={{
                  to: {
                    resource: "serviceSpecification",
                    action: "show",
                    id: record?.serviceSpecification?.id || "0",
                  },
                }}
              >
                <TextField value={record?.serviceSpecification?.name} />
              </Link>
              <Typography variant="body2" fontWeight="bold">
                {"Version"}
              </Typography>
              <TextField
                value={record?.serviceSpecification?.version}
                sx={{ color: "text.secondary" }}
              />
              <Typography variant="body2" fontWeight="bold">
                {"Href"}
              </Typography>
              <TextField
                value={record?.serviceSpecification?.href}
                sx={{ color: "text.secondary" }}
              />
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
      </Stack>
    </Show>
  );
}
