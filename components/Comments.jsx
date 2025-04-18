import moment from "moment";
import { useClients } from "../contexts/ClientsContext";
import { useEffect, useState } from "react";
import { useNavigators } from "../contexts/NavigatorsContext";

export default function Comments({ actionId }) {
  const { selectedClient } = useClients();
  const { selectedNavigator } = useNavigators();
  const [comments, setComments] = useState([]);
  const [openComment, setOpenComment] = useState("");
  const [comment, setComment] = useState({
    text: "",
    author: selectedNavigator?.name,
    activityId: actionId,
    authorId: selectedNavigator?._id,
    clientId: selectedClient?._id,
  });

  const saveComment = async () => {
    const res = await fetch(`/api/comments/`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("comment saved", data);
    await setComments(data.comment);
    await console.log("comments", comments);
    // await getComments().then(data => setComments(data.comment));
  };

  const handleComment = async () => {
    await saveComment().then();
  };

  const getComments = async () => {
    if (!selectedClient?._id) return;
    const comments = await fetch(
      `/api/comments?clientId=${selectedClient._id}`,
    );
    const data = await comments.json();
    return data.comment;
  };

  useEffect(() => {
    getComments().then((data) => {
      if (data) setComments(data);
    });
  }, [selectedClient?._id]);

  return (
    <div className={`mb-4 w-full pt-2`}>
      {/*COMMENTS*/}
      <div className={`mr-10 h-fit flex-1`}>
        {comments
          ?.filter((comment) => comment?.activityId === actionId)
          .map((event, eventIdx) => (
            <div key={event._id || eventIdx} className={`px-6`}>
              <div className="relative pb-8">
                {eventIdx !== comments.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={`bg-info/20 absolute top-[9px] left-5 -ml-10 h-full w-[1px]`}
                  />
                ) : null}
                <div className="relative flex max-w-4/5 space-x-3">
                  <div className="ml-2 flex flex-1 justify-between space-x-4 pt-1.5">
                    <div className={`w-full`}>
                      <div className="flex flex-col justify-between text-left text-xs tracking-wide">
                        <span
                          className={`text-base-content bg-info/20 absolute top-2 -left-[23px] h-2 w-2 rounded-full`}
                        />
                        <div className={`text-base-content my-[2px] font-bold`}>
                          {event.author}
                        </div>
                        <div className={`text-base-content/50 my-[1px]`}>
                          {moment(event.createdAt).calendar()}
                        </div>
                      </div>
                      <p className="text-base-content my-1">{event.text} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div
          className={`transition-all duration-300 ${openComment ? "h-fit" : "collapse h-0"}`}
        >
          <textarea
            value={comment.text}
            onChange={(e) => setComment({ ...comment, text: e.target.value })}
            className={`textarea textarea-bordered my-4 w-full transition-all duration-50 ${openComment ? "h-fit" : "collapse h-0"}`}
            placeholder="Comment"
          />
        </div>
        <div
          className={`flex justify-end gap-3 ${!openComment ? "justify-start" : "justify-end"}`}
        >
          <button
            className={`btn btn-xs btn-ghost btn-success text-success rounded-lg hover:opacity-100 ${openComment ? "text-success" : ""}`}
            onClick={() => {
              if (openComment) {
                handleComment().then();
                setOpenComment(false);
              } else {
                setComment({
                  text: "",
                  author: selectedNavigator?.name,
                  activityId: actionId,
                  authorId: selectedNavigator?._id,
                  clientId: selectedClient?._id,
                });
                setOpenComment(true);
              }
            }}
          >
            {openComment ? "Save" : "Comment"}
          </button>
          <button
            className={`btn btn-xs btn-ghost btn-error rounded-lg hover:opacity-100 ${!openComment ? "hidden" : "text-error opacity-50"}`}
            onClick={() => {
              setOpenComment(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
