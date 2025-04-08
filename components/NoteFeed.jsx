import { ThumbsUp, SmileySad, Fire, Question, User } from 'phosphor-react';
import moment from 'moment';
import { useClients } from '../contexts/ClientsContext';
import { useEffect, useState } from 'react';
import { useNavigators } from '../contexts/NavigatorsContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NoteFeed({ actionId }) {
  const { selectedClient } = useClients();
  const { selectedNavigator } = useNavigators();
  const [notes, setNotes] = useState([]);
  const [openNote, setOpenNote] = useState('');

  const [note, setNote] = useState(
    {
      noteContent: '',
      noteAuthor: selectedNavigator?.name,
      activityId: actionId,
      mood: 'User',
      createdAt: new Date(),
      clientId: selectedClient?._id
    }
  );

  const getIconBGColor = (status) => {
    switch (status) {
      case 'ThumbsUp':
        return 'bg-primary text-primary-content';
      case 'SmileySad':
        return 'bg-accent text-accent-content';
      case 'Fire':
        return 'bg-error text-error-content';
      case 'Question':
        return 'bg-info text-info-content';
      default:
        return 'bg-success text-success-content';
    }
  };

  const getIconColor = (status) => {
    switch (status) {
      case 'ThumbsUp':
        return <ThumbsUp size={24} className="text-primary-content" />;
      case 'SmileySad':
        return <SmileySad size={24} className="text-accent-content" />;
      case 'Fire':
        return <Fire size={24} className="text-error-content" />;
      case 'Question':
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
    const res = await fetch(`/api/notes/`, {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // const data = await res.json();
  };

  const handleNote = async () => {
    await saveNote().then();
    await getNotes().then(data => setNotes(data));
  };

  useEffect(() => {
    getNotes().then(data => setNotes(data))
      .catch(err => console.error(err));
  }, [selectedClient?._id, actionId]);


  return (
    <div className={`w-full `}>
      {/*NOTES*/}
      <ul role="list" className="">
        <div className={`flex-1`}>
          {notes && notes?.filter((note) => note.activityId === actionId).map((event, eventIdx) => (
            <li key={event.id + eventIdx.toString()} className={``}>
              <div className="relative pb-8">
                {eventIdx !== notes.length - 1 ? (
                  <span aria-hidden="true"
                        className={`absolute left-5 top-4 -ml-px h-full w-0.5 bg-base-300 `} />
                ) : null}
                <div className="relative flex space-x-3 max-w-2/3">
                  <div className={``}>
                  <span
                    className={classNames(
                      getIconBGColor(event.mood),
                      'flex ml-1 mt-1 size-8 items-center justify-center rounded-full ring-2 ring-base-300'
                    )}
                  >
                    {getIconColor(event.mood)}
                  </span>
                  </div>
                  <div className="flex flex-1 justify-between space-x-4 ml-2 pt-1.5 ">
                    <div className={` w-2/3`}>
                      <div
                        className="flex flex-col justify-start text-left text-xs text-base-content/50">
                        <div className={`block text-base-content font-medium`}>{event.noteAuthor}</div>
                        <div>
                          <time dateTime={moment(event.createdAt).format('M/dd/yy')}>{moment(event.createdAt).calendar()}</time></div>
                      </div>
                      <p className="text-sm text-base-content/70 my-1 capitalize">
                        {event.noteContent}{' '}
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
      <div className={`flex flex-col justify-start items-start gap-3 ml-0 w-2/3 `}>
        <textarea name={`client-activity-note`}
                  className={`textarea textarea-accent min-h-20 border-base-300 relative z-0 text-sm w-2/3  ${openNote === actionId ? 'visible' : "hidden"}`}
                  placeholder={`Enter your notes here...`}
                  onChange={(e) => {
                    setNote({
                      noteContent: e.target.value,
                      noteAuthor: selectedNavigator?.name,
                      activityId: actionId,
                      mood: 'User',
                      createdAt: new Date(),
                      clientId: selectedClient?._id
                    });
                  }} value={note.noteContent} />
        <div className={`flex justify-start items-center w-2/3 mt-0`}>
          <button disabled={note.noteContent === ''} className={`btn btn-xs btn-success disabled:btn-ghost mr-4 ${openNote === actionId ? 'visible' : "hidden"}`} onClick={() => {
            handleNote().then();
            setNote({
              noteContent: '',
              noteAuthor: selectedNavigator?.name,
              activityId: actionId,
              mood: 'User',
              createdAt: new Date(),
              clientId: selectedClient?._id
            });
          }}>Save
          </button>
          <button className={`btn btn-xs relative z-10 ${openNote === actionId ? 'btn-warning' : "btn-outline mt-6"}`} onClick={() => {
            setOpenNote(prevState => prevState === actionId ? "" : actionId);
          }}>{openNote === actionId ? "Cancel" : "Add note"}</button>
        </div>

      </div>
    </div>

  );
}
