import React, { ReactNode } from 'react';
import { Badge, Center, Container, Text } from '@mantine/core';
import classes from './summary.module.css';
import { IsVersion } from '@yadoms/shared';

interface CardProps {
  icon: ReactNode;
  label: string;
  content: string | number | undefined;
  color: string;
  isLoading: boolean;
  children: ReactNode;
}

export function Card({
  icon,
  label,
  content,
  color,
  isLoading,
  children,
}: CardProps) {
  return (
    <Container
      p={'xl'}
      className={classes.item}
      styles={(theme) => ({
        root: {
          boxShadow: `0px 0px 20px ${color}`,
          border: `1px solid ${color}`,
        },
      })}
    >
      <Center>{icon}</Center>
      <Text weight={500} size={{ base: 'xs', sm: 'lg' }}>
        {label}
      </Text>
      {isLoading ? (
        children
      ) : (
        <ContentComponent content={content as string}> </ContentComponent>
      )}
    </Container>
  );
}

function ContentComponent({ content }: { content: string }) {
  return IsVersion(content) ? (
    <VersionComponentWithBadge content={content} />
  ) : (
    <Text size={{ base: 'xs', sm: 'lg' }}>
      {Number.isInteger(content) ? `${content} Octets` : content}
    </Text>
  );
}
function VersionComponentWithBadge({ content }: { content: string }) {
  return (
    <Badge color="pink" variant="light" mt={10}>
      <Text size={{ base: 'xs', sm: 'lg' }}>{content}</Text>
    </Badge>
  );
}
