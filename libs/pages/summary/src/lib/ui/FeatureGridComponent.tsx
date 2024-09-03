import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Grid } from '@mantine/core';
import { Card } from './CardComponent';
import { SystemInformation } from './summary';

interface FeaturesGridProps {
  systemInformations: SystemInformation[];
  children: ReactNode;
  isLoading: boolean;
}

export function FeaturesGrid({
  systemInformations,
  children,
  isLoading,
}: FeaturesGridProps) {
  const { t } = useTranslation();
  return (
    <Container size={1100}>
      <Grid gutter="xl">
        {systemInformations.map((element) => (
          <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
            <Card
              icon={element.icon}
              label={t(`summary.informations.${element.i18nKey}`)}
              content={element.dataKey}
              color={element.color}
              isLoading={isLoading}
            >
              {children}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
