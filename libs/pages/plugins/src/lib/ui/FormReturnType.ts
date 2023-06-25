import { UseFormReturnType } from '@mantine/form';

export type FormReturnType = UseFormReturnType<
  { type: string; displayName: string; configuration: Record<string, unknown> },
  (values: {
    type: string;
    displayName: string;
    configuration: Record<string, unknown>;
  }) => {
    type: string;
    displayName: string;
    configuration: Record<string, unknown>;
  }
>;
