import { useQuery } from 'react-query';
import { loadSystemInformations } from '../api/summary-api';
import { Anchor, Breadcrumbs, Flex, Title } from '@mantine/core';
import React from 'react';
import { IconHome2 } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export function Summary() {
  const { t } = useTranslation();

  const { isLoading, data } = useQuery('system-informations', () =>
    loadSystemInformations()
  );

  const breadcrumbsItem = [
    { title: 'Yadoms', href: '#' },
    { title: 'Summary', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Flex direction="column">
      <Flex align={'flex-end'}>
        <IconHome2 color={'#1c7ed6'}></IconHome2>
        <Breadcrumbs ml={'xs'} separator="→">
          {breadcrumbsItem}
        </Breadcrumbs>
      </Flex>

      <Title order={3} size="h3" mt="md">
        {t('summary.home.description')}
      </Title>
    </Flex>
  );
}

export default Summary;
