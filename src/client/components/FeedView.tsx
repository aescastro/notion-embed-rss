import styles from "../../../styles/Feed.module.css";
import type { FeedReadModel } from "../../shared/FeedReadModel";

import { FeedItemsView } from "./FeedItemsView";
import { EmptyFeedView } from "./EmptyFeedView";

interface FeedViewProps {
  feed: FeedReadModel;
}

export const FeedView = ({ feed }: FeedViewProps) => (
  console.log(feed.title),
  feed.items.length > 0 ?
    <li className={styles.feed}>
      <h2>{feed.title}</h2>

      <FeedItemsView feed={feed} />
    </li>  
  :
    <></>
);
