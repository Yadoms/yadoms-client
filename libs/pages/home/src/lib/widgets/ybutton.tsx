import { useContext, useEffect } from "react";
import { YadomsConnectionContext, YadomsConnection } from 'libs/shared/src/lib/services/YadomsWebSocketConnection'
import { v4 as uuidv4 } from "uuid";

/* eslint-disable-next-line */
export interface KeywordLogProps {
  keywordId: number;
}

export function KeywordLog(props: KeywordLogProps) {
  const { acquisitions, subscribeToKeywordAcquisitions } = useContext(YadomsConnectionContext) as YadomsConnection;

  useEffect(() => {
    subscribeToKeywordAcquisitions([props.keywordId]);
  }, [props.keywordId]);

  return (
    <div>
      <h2>Last acquisitions of {props.keywordId}</h2>
      {acquisitions
        .filter((element, index, array) => { return element.keyword === props.keywordId; })
        .map(a => <p key={uuidv4()}>{a.date.toDateString()} - {a.keyword} - {a.value}</p>)}
    </div>
  );
}

export default KeywordLog;
