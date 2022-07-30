import { useParams } from "react-router-dom";

const SingleJournal = () => {
  const { journalId } = useParams();
  return <div>{journalId}</div>;
};

export default SingleJournal;
