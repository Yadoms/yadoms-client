import { useQuery } from 'react-query';
import { loadSystemInformations } from '../api/summary-api';
import { Flex, Paper, Title, Text, Box, LoadingOverlay } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BreadCrumbs } from '@yadoms/shared';

export function Summary() {
  const { t } = useTranslation();

  const { isLoading, data } = useQuery('system-informations', () =>
    loadSystemInformations()
  );

  const breadcrumbsItem = [
    { title: 'home', href: '#' },
    { title: 'summary', href: '#' },
  ];

  return (
    <Flex direction="column">
      <BreadCrumbs breadcrumbsItems={breadcrumbsItem} />
      <Title order={3} size="h3" mt="md">
        {t('summary.home.description')}
      </Title>
      <Box maw={'100%'} pos="relative">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <Paper shadow="xs" p="md">
          <Text>Paper is the most basic ui component</Text>
          <Text>
            Use it to create cards, dropdowns, modals and other components that
            require background with shadow
          </Text>
        </Paper>
      </Box>
    </Flex>
  );
}

export default Summary;
