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
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
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

export default function ResourceSpecificationShow() {
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
        <Chip
          label={record?.lifecycleStatus}
          color="success"
          sx={{ width: 100 }}
        />

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
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Specification Characteristics
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              {record?.specCharacteristic?.map((spec: any, index: number) => (
                <Item sx={{ my: 1, p: 2 }}>
                  <Stack key={index} gap={1} sx={{ pl: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {"ID"}
                    </Typography>
                    <TextField value={spec?.id} />

                    <Typography variant="body2" fontWeight="bold">
                      {"Name"}
                    </Typography>
                    <TextField value={spec?.name} />

                    <Typography variant="body2" fontWeight="bold">
                      {"Description"}
                    </Typography>
                    <TextField value={spec?.description} />

                    <Typography variant="body2" fontWeight="bold">
                      {"Value Type"}
                    </Typography>
                    <TextField value={spec?.valueType} />

                    <Typography variant="body2" fontWeight="bold">
                      {"Configurable"}
                    </Typography>
                    <Switch
                      disabled
                      checked={spec?.configurable}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <Typography variant="body2" fontWeight="bold">
                      {"Is Unique"}
                    </Typography>
                    <Switch
                      disabled
                      checked={spec?.isUnique}
                      inputProps={{ "aria-label": "controlled" }}
                    />

                    {spec?.minCardinality && (
                      <>
                        <Typography variant="body2" fontWeight="bold">
                          {"Min Cardinality"}
                        </Typography>
                        <TextField value={spec?.minCardinality} />
                      </>
                    )}
                    {spec?.maxCardinality && (
                      <>
                        <Typography variant="body2" fontWeight="bold">
                          {"Max Cardinality"}
                        </Typography>
                        <TextField value={spec?.maxCardinality} />
                      </>
                    )}
                  </Stack>
                </Item>
              ))}
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
