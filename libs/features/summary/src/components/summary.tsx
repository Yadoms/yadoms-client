import { useQuery } from 'react-query';
import { loadSystemInformations } from '../api/summary-api';
import { Flex, Title } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BreadCrumbs } from '@yadoms/shared';

export function Summary() {
  const { t } = useTranslation();

  const { isLoading, data } = useQuery('system-informations', () =>
    loadSystemInformations()
  );

  const breadcrumbsItem = [
    { title: 'Yadoms', href: '#' },
    { title: 'Summary', href: '#' },
  ];

  return (
    <Flex direction="column">
      <BreadCrumbs breadcrumbsItems={breadcrumbsItem} />
      <Title order={3} size="h3" mt="md">
        {t('summary.home.description')}
      </Title>
    </Flex>
  );
}

export default Summary;
