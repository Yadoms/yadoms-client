import { useContext } from "react";
import { YadomsConnectionContext, YadomsConnection } from 'libs/shared/src/lib/services/YadomsWebSocketConnection'
import {v4 as uuidv4} from "uuid";
import KeywordLog from "./widgets/ybutton";

/* eslint-disable-next-line */
export interface PagesHomeProps { }

export function Home(props: PagesHomeProps) {
  const { connected } = useContext(YadomsConnectionContext) as YadomsConnection;

  return (
    <div>
      <h1>Welcome to PagesHome!</h1>
      <p>Socket is {connected ? "connected" : "DISCONNECTED"}</p>
      <KeywordLog keywordId={45}></KeywordLog>
      <KeywordLog keywordId={46}></KeywordLog>
    </div>
  );
}

export default Home;
