import { useContext, useEffect, useState } from "react";
import { YadomsConnectionContext, YadomsConnection, Acquisition } from 'libs/shared/src/lib/services/YadomsWebSocketConnection'
import { v4 as uuidv4 } from "uuid";

/* eslint-disable-next-line */
export interface KeywordLogProps {
  keywordId: number;
}

export function KeywordLog(props: KeywordLogProps) {
  const { subscribeToKeywordAcquisitions } = useContext(YadomsConnectionContext) as YadomsConnection;
  const [myAcquisitions, setMyAcquisitions] = useState<Acquisition[]>([]);

  useEffect(() => {
    subscribeToKeywordAcquisitions([props.keywordId], (newAcquisition: Acquisition) => {
      console.log(props.keywordId + " : " + newAcquisition.date + " - " + newAcquisition.keyword + " - " + newAcquisition.value);
      setMyAcquisitions(myAcquisitions => [newAcquisition, ...myAcquisitions].slice(0, 4));
    });
  }, [props.keywordId]);

  return (
    <div>
      <h2>Last acquisitions of {props.keywordId}</h2>
      {myAcquisitions
        .map(acq => <p key={uuidv4()}>{acq.date.toLocaleTimeString()} : {acq.value}</p>)}
    </div>
  );
}

export default KeywordLog;
