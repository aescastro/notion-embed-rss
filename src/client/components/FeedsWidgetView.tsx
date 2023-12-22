import styles from "../../../styles/FeedsWidget.module.css";
import { Result, Success } from "../../shared/Result";
import { Font, Theme } from "../../shared/Theme";

import { RefreshButton } from "./RefreshButton";
import { FeedErrorView } from "./FeedErrorView";
import { FeedView } from "./FeedView";
import { ErrorResult, SuccessResult } from "../../shared/FeedResult";
import { FeedItemReadModel } from "../../shared/FeedItemReadModel";

interface FeedsWidgetViewProps {
  content: Result<SuccessResult, ErrorResult>[];
  fontClass: Font;
  themeClass: Theme;
}

const FeedsWidgetView = ({
  content,
  fontClass,
  themeClass,
}: FeedsWidgetViewProps) => (
  <main className={`${styles.feedsWidget} ${fontClass} ${themeClass}`}>
    <RefreshButton />

    <ul>
      {content
        .filter((result): result is Success<SuccessResult> => result.type === "success" && result.data.feed.items.length > 0)
        .sort((a, b) => {
            const latestA = Math.max(...a.data.feed.items.map((item : FeedItemReadModel) => item.date));
            const latestB = Math.max(...b.data.feed.items.map((item : FeedItemReadModel) => item.date));

            return Math.max(latestA, latestB) === latestA ? -1 : 1;
        })
        .map((result) => (
          <FeedView key={result.data.forUrl} feed={result.data.feed} />
        ))}
      {
        content.filter((result) => result.type === "error").map((result : any) => (
          <FeedErrorView key={result.error.forUrl} url={result.error.forUrl} />  
        ))
      }
    </ul>
  </main>
);
export default FeedsWidgetView;
