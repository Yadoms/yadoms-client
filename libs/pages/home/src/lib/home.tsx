import { useContext } from 'react';
import { YadomsConnectionContext, YadomsConnection } from '@yadoms/shared';
import { YButton } from './widgets/ybutton';
import KeywordLog from './widgets/keywordLog';

/* eslint-disable-next-line */
export interface PagesHomeProps {}

export function Home(props: PagesHomeProps) {
  const { connected, serverCurrentTime } = useContext(
    YadomsConnectionContext
  ) as YadomsConnection;

  return (
    <div>
      <h1>Welcome to PagesHome!</h1>
      <p>Socket is {connected ? 'connected' : 'DISCONNECTED'}</p>
      <p>Server current time is {serverCurrentTime?.toString()}</p>
      <YButton widgetId={1} buttonKeyword={20}></YButton>
      <YButton widgetId={2} buttonKeyword={30}></YButton>
      <KeywordLog widgetId={3} keywordsToListen={'45,46'}></KeywordLog>
      <KeywordLog widgetId={4} keywordsToListen={'24, 25, 26'}></KeywordLog>
    </div>
  );
}

export default Home;
