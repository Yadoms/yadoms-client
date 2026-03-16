import { useContext } from 'react';
import { YadomsConnectionContext, YadomsConnection } from '@yadoms/shared';
import YButton from './widgets/ybutton';
import KeywordLog from './widgets/keywordLog';
import classes from './home.module.css';
import classNames from "classnames";

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
        
        <div className={classNames(classes.card, classes.tile)}>
          <YButton widgetId={1}></YButton>
        </div>

        <div className={classNames(classes.card, classes.tile)}>
          <YButton widgetId={2}></YButton>
        </div>

        <div className={classNames(classes.card, classes.wide)}>
          <KeywordLog widgetId={3} keywordsToListen={'45,46'}></KeywordLog>
        </div>

        <div className={classNames(classes.card, classes.wide)}>
          <KeywordLog widgetId={4} keywordsToListen={'24, 25, 26'}></KeywordLog>
        </div>
      </div>
    </div>
  );
}

export default Home;
