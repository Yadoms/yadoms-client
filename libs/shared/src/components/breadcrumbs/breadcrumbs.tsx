import { Anchor, Flex, Breadcrumbs } from '@mantine/core';
import { IconHome2 } from '@tabler/icons-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface Breadcrumbs {
  title: string;
  href: string;
}
export interface BreadcrumbsProps {
  breadcrumbsItems: Breadcrumbs[];
}

export function BreadCrumbs(props: BreadcrumbsProps) {
  const { t } = useTranslation();
  const breadcrumbsItem = props.breadcrumbsItems.map((item, index) => (
    <Anchor href={item.href} key={index}>
      {t(`side-bar.${item.title}`)}
    </Anchor>
  ));

  return (
    <Flex align={'center'}>
      <IconHome2 color={'#1c7ed6'}></IconHome2>
      <Breadcrumbs ml={'xs'} separator="→">
        {breadcrumbsItem}
      </Breadcrumbs>
    </Flex>
  );
}

export default Breadcrumbs;
