import { Box, Flex, LoadingOverlay, Paper, Table, Title } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BreadCrumbs } from '@yadoms/shared';
import { loadSystemInformations } from '../summary-api';
import { useQuery } from '@tanstack/react-query';

export function Summary() {
  const { t } = useTranslation();

  const { isLoading, data } = useQuery({
    queryKey: ['system-informations'],
    queryFn: loadSystemInformations,
  });

  const breadcrumbsItem = [
    { title: 'home', href: '#' },
    { title: 'summary', href: '#' },
  ];

  const systemInformations = [
    { i18nKey: 'platform', dataKey: data?.platform },
    { i18nKey: 'software-version', dataKey: data?.yadomsVersion },
    { i18nKey: 'database-version', dataKey: data?.database.version },
    { i18nKey: 'started-from', dataKey: data?.startupTime },
    { i18nKey: 'database-engine', dataKey: data?.databaseEngine.type },
    {
      i18nKey: 'version-database-engine',
      dataKey: data?.databaseEngine.version,
    },
    { i18nKey: 'database-size', dataKey: data?.database.size },
  ];

  const rows = systemInformations.map((element) => (
    <tr>
      <th>{t(`summary.informations.${element.i18nKey}`)}</th>
      <th>{element.dataKey}</th>
    </tr>
  ));

  return (
    <Flex direction="column">
      <BreadCrumbs breadcrumbsItems={breadcrumbsItem} />
      <Title order={3} size="h3" mt="md">
        {t('summary.home.description')}
      </Title>
      <Box maw={'100%'} pos="relative" pt={'20px'}>
        <LoadingOverlay
          visible={isLoading}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        <Paper shadow="xs" p="md">
          <Table highlightOnHover>
            <tbody>{rows}</tbody>
          </Table>
        </Paper>
      </Box>
    </Flex>
  );
}

export default Summary;
