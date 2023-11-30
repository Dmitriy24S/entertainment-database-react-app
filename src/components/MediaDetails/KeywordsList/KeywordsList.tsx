import axios from "axios";
import { useEffect, useState } from "react";
import { MediaType } from "../../../types";
import { apiBaseUrl } from "../../../const/apiBaseUrl";
import styles from "./KeywordsList.module.scss";

const KeywordsList = ({
  mediaType,
  mediaId,
}: {
  mediaType: MediaType;
  mediaId: string;
}) => {
  const [mediaKeywords, setMediaKeywords] = useState([]);

  useEffect(() => {
    const getKeywords = async () => {
      try {
        const data = await axios.get(
          `${apiBaseUrl}/${mediaType}/${mediaId}/keywords?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        console.log("getKeywords data", data);
        setMediaKeywords(
          mediaType === MediaType.MOVIE ? data.data.keywords : data.data.results
        );
      } catch (error) {
        console.log("getKeywords error", error);
        alert(`getKeywords error: ${error}`);
      }
    };

    getKeywords();
  }, [mediaId, mediaType]);

  if (!mediaKeywords || mediaKeywords.length === 0) return null;

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Keywords</h5>
      {/* // TODO: shared title styles?  */}
      <ul className={styles.list}>
        {mediaKeywords?.map((keyword: { id: number; name: string }) => (
          <li key={keyword.name}>{keyword.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordsList;
