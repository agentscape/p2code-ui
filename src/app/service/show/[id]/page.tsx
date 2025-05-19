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

export default function ServiceShow() {
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
          {"Service Type"}
        </Typography>
        <TextField value={record?.serviceType} />

        <Typography variant="body1" fontWeight="bold">
          {"Category"}
        </Typography>
        <TextField value={record?.category} />

        <Typography variant="body1" fontWeight="bold">
          {"Description"}
        </Typography>
        <TextField value={record?.description} />

        <Typography variant="body1" fontWeight="bold">
          {"Start Date"}
        </Typography>
        <TextField value={record?.startDate} />

        <Typography variant="body1" fontWeight="bold">
          {"End Date"}
        </Typography>
        <TextField value={record?.endDate} />

        <Typography variant="body1" fontWeight="bold">
          {"Service Date"}
        </Typography>
        <TextField value={record?.serviceDate} />

        <Typography variant="body1" fontWeight="bold">
          {"Start Mode"}
        </Typography>
        <TextField value={record?.startMode} />

        <Typography variant="body2" fontWeight="bold">
          {"Has Started"}
        </Typography>
        <Switch
          disabled
          checked={record?.hasStarted}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography variant="body2" fontWeight="bold">
          {"isBundle"}
        </Typography>
        <Switch
          disabled
          checked={record?.isBundle}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography variant="body2" fontWeight="bold">
          {"Is Service Enabled"}
        </Typography>
        <Switch
          disabled
          checked={record?.isServiceEnabled}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography variant="body2" fontWeight="bold">
          {"Is Stateful"}
        </Typography>
        <Switch
          disabled
          checked={record?.isStateful}
          inputProps={{ "aria-label": "controlled" }}
        />

        <Typography variant="body1" fontWeight="bold">
          {"State"}
        </Typography>
        <Chip
          label={record?.state}
          color="success"
          sx={{ width: 100, mt: 1 }}
        />

        <Accordion sx={{ mt: 1, mb: 1 }}>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
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
        <Accordion sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Service Characteristics
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              {record?.serviceCharacteristic?.map(
                (spec: any, index: number) => (
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
                )
              )}
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
              Features
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {record?.feature?.map((feat: any, index: number) => (
              <Stack key={index} gap={1} sx={{ pl: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  {"ID"}
                </Typography>
                <TextField value={feat?.id} />

                <Typography variant="body2" fontWeight="bold">
                  {"Name"}
                </Typography>
                <TextField value={feat?.name} />
                <Typography variant="body2" fontWeight="bold">
                  {"Is Bundle"}
                </Typography>
                <Switch
                  disabled
                  checked={feat?.isBundle}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography variant="body2" fontWeight="bold">
                  {"Is Enabled"}
                </Typography>
                <Switch
                  disabled
                  checked={feat?.isEnabled}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Accordion sx={{ mb: 1 }}>
                  <AccordionSummary
                    expandIcon={<GridExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography component="span" fontWeight="bold">
                      Feature Characteristics
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
                      {feat?.featureCharacteristic?.map(
                        (spec: any, index: number) => (
                          <Item sx={{ my: 1, p: 2 }}>
                            <Stack key={index} gap={1} sx={{ pl: 2 }}>
                              <Typography variant="body2" fontWeight="bold">
                                {"Name"}
                              </Typography>
                              <TextField value={spec?.name} />

                              <Typography variant="body2" fontWeight="bold">
                                {"Value"}
                              </Typography>
                              <TextField value={spec?.value} />

                              <Typography variant="body2" fontWeight="bold">
                                {"Value Type"}
                              </Typography>
                              <TextField value={spec?.valueType} />
                            </Stack>
                          </Item>
                        )
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Places
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {record?.place?.map((p: any, index: number) => (
              <Stack key={index} gap={1} sx={{ pl: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  {"ID"}
                </Typography>
                <TextField value={p?.id} />

                <Typography variant="body2" fontWeight="bold">
                  {"Name"}
                </Typography>
                <TextField value={p?.name} />

                <Typography variant="body2" fontWeight="bold">
                  {"Role"}
                </Typography>
                <TextField value={p?.role} />

                <Typography variant="body2" fontWeight="bold">
                  {"Href"}
                </Typography>
                <TextField value={p?.href} sx={{ color: "text.secondary" }} />
              </Stack>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ mb: 1 }}>
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
        <Accordion sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Supporting Resources
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {record?.supportingResource?.map((element: any, index: number) => (
              <Stack key={index} gap={1} sx={{ pl: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  {"ID"}
                </Typography>
                <TextField value={element?.id} />

                <Typography variant="body2" fontWeight="bold">
                  {"Name"}
                </Typography>
                <TextField value={element?.name} />

                <Typography variant="body2" fontWeight="bold">
                  {"Href"}
                </Typography>
                <TextField
                  value={element?.href}
                  sx={{ color: "text.secondary" }}
                />
                <Typography variant="body2" fontWeight="bold">
                  {"@referredType"}
                </Typography>
                <TextField
                  value={element?.["@referredType"]}
                  sx={{ color: "text.secondary" }}
                />
              </Stack>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" fontWeight="bold">
              Supporting Services
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {record?.supportingService?.map((element: any, index: number) => (
              <Stack key={index} gap={1} sx={{ pl: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  {"ID"}
                </Typography>
                <TextField value={element?.id} />

                <Typography variant="body2" fontWeight="bold">
                  {"Name"}
                </Typography>
                <TextField value={element?.name} />

                <Typography variant="body2" fontWeight="bold">
                  {"Href"}
                </Typography>
                <TextField
                  value={element?.href}
                  sx={{ color: "text.secondary" }}
                />
              </Stack>
            ))}
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
