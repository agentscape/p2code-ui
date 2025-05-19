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

export default function ResourceShow() {
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
          {"Resource Version"}
        </Typography>
        <TextField value={record?.resourceVersion} />

        <Typography variant="body1" fontWeight="bold">
          {"Category"}
        </Typography>
        <TextField value={record?.category} />

        <Typography variant="body1" fontWeight="bold">
          {"Description"}
        </Typography>
        <TextField value={record?.description} />

        <Typography variant="body1" fontWeight="bold">
          {"Start Operating Date"}
        </Typography>
        <TextField value={record?.startOperatingDate} />

        <Typography variant="body1" fontWeight="bold">
          {"End Operating Date"}
        </Typography>
        <TextField value={record?.endOperatingDate} />

        <Typography variant="body1" fontWeight="bold">
          {"Administrative State"}
        </Typography>
        <TextField value={record?.administrativeState} />

        <Typography variant="body1" fontWeight="bold">
          {"Operational State"}
        </Typography>
        <TextField value={record?.operationalState} />

        <Typography variant="body1" fontWeight="bold">
          {"Resource Status"}
        </Typography>
        <TextField value={record?.resourceStatus} />

        <Typography variant="body1" fontWeight="bold">
          {"Usage State"}
        </Typography>
        <TextField value={record?.usageState} />

        <Accordion sx={{ mt: 1, mb: 1 }}>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Resource Specification
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={1} sx={{ pl: 2 }}>
              <Link
                go={{
                  to: {
                    resource: "resourceSpecification",
                    action: "show",
                    id: record?.resourceSpecification?.id || "0",
                  },
                }}
              >
                <TextField value={record?.resourceSpecification?.name} />
              </Link>
              <Typography variant="body2" fontWeight="bold">
                {"ID"}
              </Typography>
              <TextField
                value={record?.resourceSpecification?.id}
                sx={{ color: "text.secondary" }}
              />
              <Typography variant="body2" fontWeight="bold">
                {"Href"}
              </Typography>
              <TextField
                value={record?.resourceSpecification?.href}
                sx={{ color: "text.secondary" }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Resource Characteristics
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              <Grid2 container spacing={2}>
                {record?.resourceCharacteristic?.map(
                  (spec: any, index: number) => (
                    <Grid2
                      size={4}
                    >
                      <Item sx={{ my: 1, p: 2 }}>
                        <Stack key={index} gap={1} sx={{ pl: 2 }}>
                          <Typography variant="body2" fontWeight="bold">
                            {"Name"}
                          </Typography>
                          <TextField value={spec?.name} />

                          <Typography variant="body2" fontWeight="bold">
                            {"Value"}
                          </Typography>
                          <TextField value={spec?.value?.value} />

                          <Typography variant="body2" fontWeight="bold">
                            {"Value Type"}
                          </Typography>
                          <TextField value={spec?.value?.valueType} />
                        </Stack>
                      </Item>
                    </Grid2>
                  )
                )}
              </Grid2>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Place
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack key={"place"} gap={1} sx={{ pl: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                {"ID"}
              </Typography>
              <TextField value={record?.place?.id} />

              <Typography variant="body2" fontWeight="bold">
                {"Name"}
              </Typography>
              <TextField value={record?.place?.name} />

              <Typography variant="body2" fontWeight="bold">
                {"Role"}
              </Typography>
              <TextField value={record?.place?.role} />

              <Typography variant="body2" fontWeight="bold">
                {"Href"}
              </Typography>
              <TextField
                value={record?.place?.href}
                sx={{ color: "text.secondary" }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ mb: 1 }}>
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
