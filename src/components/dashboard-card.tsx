// components/DashboardCard.tsx
'use client';

import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

type DashboardCardProps = {
  title: string;
  link: string;
};

export function DashboardCard({ title, link }: DashboardCardProps) {
  return (
    <Card sx={{ maxWidth: 400, m: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => (window.location.href = link)}
        >
          View Dashboard
        </Button>
      </CardActions>
    </Card>
  );
}
