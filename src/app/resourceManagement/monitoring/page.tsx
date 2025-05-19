// pages/dashboard/DevOpsDashboard.tsx

"use client";

import React from "react";
import { Card, CardContent, Typography, Divider, Grid2 } from "@mui/material";
import { Gauge, SparkLineChart } from "@mui/x-charts";

const DevOpsDashboard = () => {
  return (
    <Grid2 container spacing={4} columns={16} margin={4}>
      {/* Resource: Web Application Server */}
      <Grid2 size={8}>
        <Card sx={{ mt: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Web App Server</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1">CPU Load</Typography>
            <Gauge height={100} value={75} startAngle={-90} endAngle={90} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1">Memory Usage</Typography>
            <Gauge height={100} value={62} startAngle={-90} endAngle={90} />
          </CardContent>
        </Card>
      </Grid2>

      {/* Resource: API Gateway */}
      <Grid2 size={8}>
        <Card sx={{ mt: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h6">API Gateway</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Request Rate</Typography>
            <SparkLineChart
              plotType="bar"
              data={[120, 140, 130, 160, 200, 180, 150, 170]}
              height={100}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1">Error Rate</Typography>
            <SparkLineChart
              data={[2, 4, 3, 5, 1, 0, 2, 3]}
              height={100}
              colors={["red"]}
            />
          </CardContent>
        </Card>
      </Grid2>

      {/* Resource: Storage Node */}
      <Grid2 size={8}>
        <Card sx={{ mt: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Storage Node</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Disk Usage</Typography>
            <Gauge height={100} value={88} startAngle={-90} endAngle={90} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1">Network Traffic</Typography>
            <SparkLineChart
              data={[300, 450, 320, 500, 420, 600, 470, 520]}
              height={100}
              colors={["blue"]}
            />
          </CardContent>
        </Card>
      </Grid2>

      {/* Resource: IoT Sensor */}
      <Grid2 size={8}>
        <Card sx={{ mt: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h6">IoT Sensor</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Sensor Uptime</Typography>
            <Gauge height={100} value={98} startAngle={-90} endAngle={90} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1">Gateway Throughput</Typography>
            <SparkLineChart
              data={[100, 200, 180, 220, 210, 250, 230, 240]}
              height={100}
              colors={["purple"]}
            />
          </CardContent>
        </Card>
      </Grid2>

      {/* Resource: Provisioning Engine */}
      <Grid2 size={8}>
        <Card sx={{ mt: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Provisioning Engine</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Resource Availability</Typography>
            <Gauge height={100} value={92} startAngle={-90} endAngle={90} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1">Deployment Latency (ms)</Typography>
            <SparkLineChart
              data={[800, 700, 600, 650, 620, 590, 610, 580]}
              height={100}
              colors={["orange"]}
            />
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default DevOpsDashboard;
