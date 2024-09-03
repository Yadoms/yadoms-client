import { Box, Flex, Title, Skeleton } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { BreadCrumbs } from '@yadoms/shared';
import { loadSystemInformations } from '../summary-api';
import { useQuery } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import {
  DatabaseIcon,
  DatabaseVersionIcon,
  LinuxLogo,
  MacOSLogo,
  PostgreSQLLogo,
  PowerIcon,
  SQLIcon,
  SQLiteLogo,
  SystemIcon,
  VersionIcon,
  WindowsLogo,
  SizeIcon,
} from './icons';
import { FormatDate } from '@yadoms/shared';
import { FeaturesGrid } from './FeatureGridComponent';

const CUSTOMIZATIONS = {
  Window: { color: '#4057dc', size: 40 },
  Linux: { color: '#6f706e', size: 40 },
  MacOs: { color: '#000000', size: 40 },
  DefaultOs: { color: '#6e6e70', size: 40 },
  SqLite: { color: '#66b2fc', size: 40 },
  Postgres: { color: '#3177ff', size: 40 },
  Database: { color: '#f14809', size: 40 },
  DatabaseVersion: { color: '#cec483', size: 40 },
  Power: { color: '#00ff28', size: 40 },
  Version: { color: '#873be1', size: 40 },
  Size: { color: '#e52121', size: 40 },
  SQL: { color: '#0048fd', size: 40 },
} as const;


type CUSTOMIZATIONS = (typeof CUSTOMIZATIONS)[keyof typeof CUSTOMIZATIONS];

export type SystemInformation = {
  i18nKey: string;
  dataKey: string | number | undefined;
  icon: ReactNode;
  color: string;
};

export function Summary() {
  const { t } = useTranslation();
  const { isLoading, data } = useQuery({
    queryKey: ['system-informations'],
    queryFn: loadSystemInformations,
  });
  const breadcrumbsItem = [
    { title: 'home', href: '/' },
    { title: 'summary', href: '/summary' },
  ];
  const getPlatformIcon = (platform: string | undefined) => {
    if (!platform) { // prevent undefined | null case
      return (
        <SystemIcon
          size={CUSTOMIZATIONS.DefaultOs.size}
          color={CUSTOMIZATIONS.DefaultOs.color}
        />
      );
    } else if (platform.startsWith("Linux")) {
      return (
        <LinuxLogo
          size={CUSTOMIZATIONS.Linux.size}
          color={CUSTOMIZATIONS.Linux.color}
        />
      );
    } else if (platform.startsWith("Windows")) {
      return (
        <WindowsLogo
          size={CUSTOMIZATIONS.Window.size}
          color={CUSTOMIZATIONS.Window.color}
        />
      );
    } else if (platform.startsWith("MacOs")) {
      return (
        <MacOSLogo
          size={CUSTOMIZATIONS.MacOs.size}
          color={CUSTOMIZATIONS.MacOs.color}
        />
      );
    } else {
      return ( // platform not implemented
        <SystemIcon
          size={CUSTOMIZATIONS.DefaultOs.size}
          color={CUSTOMIZATIONS.DefaultOs.color}
        />
      );
    }
  };

  const getDatabaseEngineIcon = (engine: string | undefined) => {
    if (!engine)
      return (
        <SQLIcon
          size={CUSTOMIZATIONS.SQL.size}
          color={CUSTOMIZATIONS.SQL.color}
        />
      );
    switch (engine) {
      case 'SQLite':
        return (
          <SQLiteLogo
            size={CUSTOMIZATIONS.SqLite.size}
            color={CUSTOMIZATIONS.SqLite.color}
          />
        );
      case 'Postgres':
        return (
          <PostgreSQLLogo
            size={CUSTOMIZATIONS.Postgres.size}
            color={CUSTOMIZATIONS.Postgres.color}
          />
        );
      default:
        return (
          <SQLIcon
            size={CUSTOMIZATIONS.SQL.size}
            color={CUSTOMIZATIONS.SQL.color}
          />
        );
    }
  };

  const systemInformations: SystemInformation[] = [
    {
      i18nKey: 'platform',
      dataKey: data?.platform,
      icon: getPlatformIcon(data?.platform),
      color: CUSTOMIZATIONS.DefaultOs.color,
    },
    {
      i18nKey: 'software-version',
      dataKey: data?.yadomsVersion,
      icon: <VersionIcon size={40} color={CUSTOMIZATIONS.Version.color} />,
      color: CUSTOMIZATIONS.Version.color,
    },
    {
      i18nKey: 'database-version',
      dataKey: data?.database.version,
      icon: (
        <DatabaseVersionIcon
          size={CUSTOMIZATIONS.DatabaseVersion.size}
          color={CUSTOMIZATIONS.DatabaseVersion.color}
        />
      ),
      color: CUSTOMIZATIONS.DatabaseVersion.color,
    },
    {
      i18nKey: 'started-from',
      dataKey: FormatDate(data?.startupTime),
      icon: (
        <PowerIcon
          size={CUSTOMIZATIONS.Power.size}
          color={CUSTOMIZATIONS.Power.color}
        />
      ),
      color: CUSTOMIZATIONS.Power.color,
    },
    {
      i18nKey: 'database-engine',
      dataKey: data?.databaseEngine.type,
      icon: getDatabaseEngineIcon(data?.databaseEngine.type),
      color: CUSTOMIZATIONS.SQL.color,
    },
    {
      i18nKey: 'version-database-engine',
      dataKey: data?.databaseEngine.version,
      icon: (
        <DatabaseIcon
          size={CUSTOMIZATIONS.Database.size}
          color={CUSTOMIZATIONS.Database.color}
        />
      ),
      color: CUSTOMIZATIONS.Database.color,
    },
    {
      i18nKey: 'database-size',
      dataKey: data?.database.size,
      icon: (
        <SizeIcon
          size={CUSTOMIZATIONS.Size.size}
          color={CUSTOMIZATIONS.Size.color}
        />
      ),
      color: CUSTOMIZATIONS.Size.color,
    },
  ];
  return (
    <Flex direction={'column'}>
      <BreadCrumbs breadcrumbsItems={breadcrumbsItem} />
      <Title order={3} size="h3" mt="md">
        {t('summary.home.description')}
      </Title>
      <Box maw={'100%'} pos="relative" pt={'20px'}>
        <FeaturesGrid
          systemInformations={systemInformations}
          isLoading={isLoading}
        >
          <Skeleton
            visible={isLoading}
            height={20}
            mt="md"
            width="80%"
            radius="sm"
          />
        </FeaturesGrid>
      </Box>
    </Flex>
  );
}

export default Summary;
