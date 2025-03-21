import {ThumbsUp, SmileySad, Fire, Question, User} from "phosphor-react";
import moment from "moment";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NoteFeed({notes, activityIdFromPage}) {

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
    }

    const getIconColor = (status) => {
        switch (status) {
            case "ThumbsUp":
                return <ThumbsUp size={24} className="text-primary-content"/>;
            case "SmileySad":
                return <SmileySad size={24} className="text-accent-content"/>;
            case "Fire":
                return <Fire size={24} className="text-error-content"/>;
            case "Question":
                return <Question size={24} className="text-info-content"/>;
            default:
                return <User size={24} className="text-success-content"/>;
        }
    }

    return (
        <div className="flow-root overflow-hidden">
            <ul role="list" className="-mb-8">
                {notes.filter(note => note.activityId === activityIdFromPage).map((event, eventIdx) => (
                    <li key={event.id}>
                        <div className="relative pb-8">
                            {eventIdx !== notes.length - 1 ? (
                                <span aria-hidden="true" className={`absolute left-5 top-4 -ml-px h-full w-0.5 bg-base-content/40 `} />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                  <span
                      className={classNames(
                          getIconBGColor(event.mood),
                          'flex ml-1 mt-1 size-8 items-center justify-center rounded-full ring-2 ring-base-content',
                      )}
                  >
                    {getIconColor(event.mood)}
                  </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 ml-2 pt-1.5">
                                    <div>
                                        <div className="whitespace-nowrap text-left font-medium text-sm text-text-base-content">
                                            <time dateTime={moment(event.createdAt).format("M/dd/yy")}>{moment(event.createdAt).calendar()}</time>
                                        </div>
                                        <p className="text-sm text-neutral-500">
                                            {event.noteContent}{' '}
                                            {/*<a href={event.href} className="font-medium text-info-content">*/}
                                            {/*    {event.target}*/}
                                            {/*</a>*/}
                                            <span>{event.noteAuthor}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
