import { Card, Flex, Grid, Skeleton } from '@mantine/core';
import { useState, useEffect } from 'react';

export interface ChoosePluginModalSkeletonProps {
  visible: boolean;
}

export function ChoosePluginModalSkeleton(
  props: ChoosePluginModalSkeletonProps
) {
  const [isVisible, setIsVisible] = useState(props.visible);

  useEffect(() => {
    setIsVisible(props.visible);
  }, [props.visible]);

  return <>{isVisible && <Grid>{generateSkeletonCols(8)}</Grid>}</>;
}

function generateSkeletonCols(numCols: number) {
  const cols = [];

  for (let i = 0; i < numCols; i++) {
    cols.push(
      <Grid.Col key={i} span={3}>
        <Card
          sx={{ display: 'flex', flexDirection: 'column' }}
          shadow="sm"
          p="xl"
          withBorder
          h={'100%'}
        >
          <Card.Section>
            <Skeleton height={160}></Skeleton>
          </Card.Section>

          <Flex justify={'space-between'} mt="md" mb="md">
            <Skeleton height={20} radius="xl" width="35%" />
            <Skeleton height={20} radius="xl" width="25%" />
          </Flex>

          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Flex justify={'flex-end'} mt="md">
            <Skeleton height={14} radius="xl" width="40%" />
          </Flex>
        </Card>
      </Grid.Col>
    );
  }

  return cols;
}
