import { ThumbsUp, SmileySad, Fire, Question, User } from "phosphor-react";
import moment from "moment";
import { useClients } from "../../contexts/ClientsContext";
import { useEffect, useState } from "react";
import { useNavigators } from "../../contexts/NavigatorsContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NoteFeed({ actionId }) {
  const { selectedClient } = useClients();
  const { selectedNavigator } = useNavigators();
  const [notes, setNotes] = useState([]);
  const [openNote, setOpenNote] = useState("");

  const [note, setNote] = useState({
    noteContent: "",
    noteAuthor: selectedNavigator?.name,
    activityId: actionId,
    mood: "User",
    createdAt: new Date(),
    clientId: selectedClient?._id,
  });

  const getIconBGColor = (status) => {
    switch (status) {
      case "ThumbsUp":
        return "bg-primary text-primary-content";
      case "SmileySad":
        return "bg-accent text-accent-content";
      case "Fire":
        return "bg-error text-error-content";
      case "Question":
        return "bg-info text-info-content";
      default:
        return "bg-success text-success-content";
    }
  };

  const getIconColor = (status) => {
    switch (status) {
      case "ThumbsUp":
        return <ThumbsUp size={24} className="text-primary-content" />;
      case "SmileySad":
        return <SmileySad size={24} className="text-accent-content" />;
      case "Fire":
        return <Fire size={24} className="text-error-content" />;
      case "Question":
        return <Question size={24} className="text-info-content" />;
      default:
        return <User size={24} className="text-success-content" />;
    }
  };

  const getNotes = async () => {
    if (!selectedClient) return;
    const response = await fetch(`/api/notes?clientId=${selectedClient._id}`);
    return await response.json();
  };

  const saveNote = async () => {
    await fetch(`/api/notes/`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleNote = async () => {
    await saveNote().then();
    await getNotes().then((data) => setNotes(data));
  };

  useEffect(() => {
    getNotes()
      .then((data) => setNotes(data))
      .catch((err) => console.error(err));
  }, [selectedClient?._id, actionId, getNotes]);

  return (
    <div className={`w-full`}>
      {/*NOTES*/}
      <ul role="list" className="">
        <div className={`flex-1`}>
          {notes &&
            notes
              ?.filter((note) => note.activityId === actionId)
              .map((event, eventIdx) => (
                <li key={event.id + eventIdx.toString()} className={``}>
                  <div className="relative pb-8">
                    {eventIdx !== notes.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className={`bg-base-300 absolute top-4 left-5 -ml-px h-full w-0.5`}
                      />
                    ) : null}
                    <div className="relative flex max-w-2/3 space-x-3">
                      <div className={``}>
                        <span
                          className={classNames(
                            getIconBGColor(event.mood),
                            "ring-base-300 mt-1 ml-1 flex size-8 items-center justify-center rounded-full ring-2",
                          )}
                        >
                          {getIconColor(event.mood)}
                        </span>
                      </div>
                      <div className="ml-2 flex flex-1 justify-between space-x-4 pt-1.5">
                        <div className={`w-2/3`}>
                          <div className="text-base-content/50 flex flex-col justify-start text-left text-xs">
                            <div
                              className={`text-base-content block font-medium`}
                            >
                              {event.noteAuthor}
                            </div>
                            <div>
                              <time
                                dateTime={moment(event.createdAt).format(
                                  "M/dd/yy",
                                )}
                              >
                                {moment(event.createdAt).calendar()}
                              </time>
                            </div>
                          </div>
                          <p className="text-base-content/70 my-1 text-sm capitalize">
                            {event.noteContent}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
        </div>
        {/*NOTE FORM*/}
      </ul>
      <div
        className={`ml-0 flex w-2/3 flex-col items-start justify-start gap-3`}
      >
        <textarea
          name={`client-activity-note`}
          className={`textarea textarea-accent border-base-300 relative z-0 min-h-20 w-2/3 text-sm ${openNote === actionId ? "visible" : "hidden"}`}
          placeholder={`Enter your notes here...`}
          onChange={(e) => {
            setNote({
              noteContent: e.target.value,
              noteAuthor: selectedNavigator?.name,
              activityId: actionId,
              mood: "User",
              createdAt: new Date(),
              clientId: selectedClient?._id,
            });
          }}
          value={note.noteContent}
        />
        <div className={`mt-0 flex w-2/3 items-center justify-start`}>
          <button
            disabled={note.noteContent === ""}
            className={`btn btn-xs btn-success disabled:btn-ghost mr-4 ${openNote === actionId ? "visible" : "hidden"}`}
            onClick={() => {
              handleNote().then();
              setNote({
                noteContent: "",
                noteAuthor: selectedNavigator?.name,
                activityId: actionId,
                mood: "User",
                createdAt: new Date(),
                clientId: selectedClient?._id,
              });
            }}
          >
            Save
          </button>
          <button
            className={`btn btn-xs relative z-10 ${openNote === actionId ? "btn-warning" : "btn-outline mt-6"}`}
            onClick={() => {
              setOpenNote((prevState) =>
                prevState === actionId ? "" : actionId,
              );
            }}
          >
            {openNote === actionId ? "Cancel" : "Add note"}
          </button>
        </div>
      </div>
    </div>
  );
}
