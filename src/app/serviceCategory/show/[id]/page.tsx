"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { Link, useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";

export default function ServiceCategoryShow() {
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

        <Typography variant="body1" fontWeight="bold">
          {"Is Root"}
        </Typography>
        <TextField value={record?.isRoot ? "Yes" : "No"} />

        <Accordion sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Service Candidates
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {record?.serviceCandidate?.map(
              (
                cat: {
                  id: string;
                  name: string;
                  href: string;
                  version: string;
                },
                index: number
              ) => (
                <Stack key={index} gap={1} sx={{ pl: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {"Service Candidate"}
                  </Typography>
                  <Link
                    go={{
                      to: {
                        resource: "serviceCandidate",
                        action: "show",
                        id: cat?.id,
                      },
                    }}
                  >
                    <TextField value={cat?.name} />
                  </Link>
                  <Typography variant="body2" fontWeight="bold">
                    {"Version"}
                  </Typography>
                  <TextField
                    value={cat?.version}
                    sx={{ color: "text.secondary" }}
                  />
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
