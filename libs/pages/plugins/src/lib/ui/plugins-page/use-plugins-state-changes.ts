import { useContext, useEffect, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { YadomsConnectionContext } from '@yadoms/shared';
import { keywordsApi } from '@yadoms/domain/keywords';

const PLUGIN_STATE_CAPACITIES = ['pluginState', 'pluginStateMessage'];

/**
 * Calls onChange each time the state of a plugin instance changes
 */
export function usePluginsStateChanges(
  instanceIds: number[],
  onChange: () => void
) {
  const connection = useContext(YadomsConnectionContext);
  // The context value changes on every server time tick, avoid resubscribing
  const connectionRef = useRef(connection);
  connectionRef.current = connection;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const listenerUuid = useMemo(() => uuidv4(), []);

  // Plugin state keywords are created with the instance
  const instanceIdsKey = [...instanceIds].sort().join('|');
  const keywordsQuery = useQuery({
    queryKey: ['plugins-state-keywords', instanceIdsKey],
    queryFn: async () =>
      (
        await keywordsApi.loadKeywords(
          undefined,
          undefined,
          PLUGIN_STATE_CAPACITIES
        )
      ).keywords.map((keyword) => keyword.id),
  });

  const keywordIdsKey = (keywordsQuery.data ?? []).join('|');

  useEffect(() => {
    const keywordIds = keywordIdsKey
      ? keywordIdsKey.split('|').map(Number)
      : [];
    connectionRef.current?.subscribeToKeywordAcquisitions(keywordIds, {
      uuid: listenerUuid,
      onReceived: () => onChangeRef.current(),
    });
    return () =>
      connectionRef.current?.subscribeToKeywordAcquisitions([], {
        uuid: listenerUuid,
        onReceived: () => undefined,
      });
  }, [keywordIdsKey, listenerUuid]);
}
