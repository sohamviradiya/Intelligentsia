import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseurl, tweetlist } from "../modules/config";
import { TweetInterface } from "../modules/tweet";
import Tweet from "../components/Tweet";
import Loading from "../components/Loading";

function TweetList(props: any): JSX.Element {
     const { id } = useParams();
     const [tweets, setTweets] = useState<TweetInterface[]>([] as TweetInterface[]);
     const [loading, setLoading] = useState(true);
     useEffect(() => {
          if (props.type == tweetlist.home) {
               fetch(`${baseurl}/tweets/`).then((res) => (res.json())).then((data: TweetInterface[]) => {
                    setTweets(data);
                    setLoading(false);
               });
          } else if (props.type == tweetlist.authored) {
               fetch(`${baseurl}/users/${id}/tweets/`).then((res) => (res.json())).then((data: TweetInterface[]) => {
                    setTweets(data);
                    setLoading(false);
               });
          } else if (props.type == tweetlist.liked) {
               fetch(`${baseurl}/users/${id}/liked/`).then((res) => (res.json())).then((data: TweetInterface[]) => {
                    setTweets(data);
                    setLoading(false);
               });
          } else {
               setTweets([]);
               setLoading(false);
          }
     }, [id, props.type]);

     return (
          (loading) ?
               <Loading />
               : (
                    <ul className="container w-75 p-5">
                         {tweets.map((tweet: any) => (
                              <li
                                   key={tweet._id}
                                   className="mb-5">
                                   {Tweet(tweet)}
                              </li>
                         ))}
                    </ul>)
     );
}
export default TweetList;
