import { useContext } from 'react';
import { YadomsConnectionContext, YadomsConnection } from '@yadoms/shared';
import YButton from './widgets/ybutton';
import KeywordLog from './widgets/keywordLog';
import classes from './home.module.css';

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
      <div className={classes.grid}>
        <YButton id={1}></YButton> // Renommer YButton en switch ? (pour être cohérent avec le type de widget connu du serveur)

        <YButton id={2}></YButton>

        <YButton id={3}></YButton>

        <KeywordLog id={4} keywordsToListen={'45,46'}></KeywordLog>

        <KeywordLog id={5} keywordsToListen={'24, 25, 26'}></KeywordLog>
      </div>
    </div>
  );
}

export default Home;
