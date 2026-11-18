import { Badge } from '@mantine/core';
import { PuginsInstancesState } from '@yadoms/domain/plugins';

const stateColors: Record<PuginsInstancesState, string> = {
  [PuginsInstancesState.Unknown]: 'yellow',
  [PuginsInstancesState.Error]: 'red',
  [PuginsInstancesState.Stopped]: 'blue',
  [PuginsInstancesState.Running]: 'green',
  [PuginsInstancesState.Custom]: 'yellow',
  [PuginsInstancesState.WaitDebugger]: 'yellow',
};

export function PluginStateBadge({ state }: { state: PuginsInstancesState }) {
  return (
    <Badge color={stateColors[state] ?? 'gray'} variant="light">
      {state}
    </Badge>
  );
}

export default PluginStateBadge;
