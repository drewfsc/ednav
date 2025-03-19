import React from 'react';

export default function FilterCheckboxes({searchFields, setSearchFields}) {
    return (
        <div>

            {/*CHECKBOXES*/}
            <div className="mt-2 text-sm font-light text-white">
                <div className="flex gap-4 pb-2 mt-1 w-full justify-between items-center">
                    <label className="flex items-center self-center">
                        <input type="checkbox" checked={searchFields.includes("name")} className="checkbox checkbox-lg checkbox-info"  onChange={(e) =>
                            setSearchFields((prev) =>
                                e.target.checked
                                    ? [...prev, "name"]
                                    : prev.filter((f) => f !== "name")
                            )
                        } />
                        <div className={`ml-2 text-xsm`}>Name</div>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={searchFields.includes("email")} className="checkbox checkbox-lg checkbox-info"
                            onChange={(e) =>
                                setSearchFields((prev) =>
                                    e.target.checked
                                        ? [...prev, "email"]
                                        : prev.filter((f) => f !== "email")
                                )
                            }/>
                        <div className={`ml-2`}>Email</div>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={searchFields.includes("role")} className="checkbox checkbox-lg checkbox-info"
                            onChange={(e) =>
                                setSearchFields((prev) =>
                                    e.target.checked
                                        ? [...prev, "role"]
                                        : prev.filter((f) => f !== "role")
                                )
                            }/>
                        <div className={`ml-2`}>Name</div>
                    </label>
                </div>
            </div>
            {/*END CHECKBOXES*/}

        </div>
    );
}
