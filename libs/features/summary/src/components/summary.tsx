import { useQuery } from 'react-query';
import { loadSystemInformations } from '../api/summary-api';
import {
  Flex,
  Paper,
  Title,
  Text,
  Box,
  LoadingOverlay,
  List,
  Drawer,
} from '@mantine/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BreadCrumbs } from '@yadoms/shared';
import {
  IconBox,
  IconDashboard,
  IconSettings,
  IconShoppingCart,
  IconUsers,
} from '@tabler/icons-react';
import { ListItem } from '@mantine/core/lib/List/ListItem/ListItem';

export function Summary() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    { icon: <IconDashboard size={20} />, label: 'Dashboard' },
    { icon: <IconShoppingCart size={20} />, label: 'Orders' },
    { icon: <IconUsers size={20} />, label: 'Customers' },
    { icon: <IconBox size={20} />, label: 'Products' },
    { icon: <IconSettings size={20} />, label: 'Settings' },
  ];

  return (
    <Drawer opened={!collapsed} onClose={toggleCollapsed}>
      <List>
        {items.map((item, index) => (
          <List.Item key={index} onClick={toggleCollapsed}>
            {collapsed ? (
              item.icon
            ) : (
              <>
                {item.icon}
                <Text weight={700} style={{ marginLeft: 8 }}>
                  {item.label}
                </Text>
              </>
            )}
          </List.Item>
        ))}
      </List>
    </Drawer>
  );
}

export default Summary;
