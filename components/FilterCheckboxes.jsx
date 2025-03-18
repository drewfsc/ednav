import React from 'react';

export default function FilterCheckboxes({searchFields, setSearchFields}) {
    return (
        <div>

            {/*CHECKBOXES*/}
            <div className="mt-2">
                <div className="flex gap-2 mt-1">
                    <label>
                        <input type="checkbox" defaultChecked checked={searchFields.includes("name")} className="checkbox checkbox-lg text-accent-content" onChange={(e) =>
                            setSearchFields((prev) =>
                                e.target.checked
                                    ? [...prev, "name"]
                                    : prev.filter((f) => f !== "name")
                            )
                        } />
                        Name
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={searchFields.includes("email")}
                            onChange={(e) =>
                                setSearchFields((prev) =>
                                    e.target.checked
                                        ? [...prev, "email"]
                                        : prev.filter((f) => f !== "email")
                                )
                            }
                        /> Email
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={searchFields.includes("role")}
                            onChange={(e) =>
                                setSearchFields((prev) =>
                                    e.target.checked
                                        ? [...prev, "role"]
                                        : prev.filter((f) => f !== "role")
                                )
                            }
                        /> Role
                    </label>
                </div>
            </div>
            {/*END CHECKBOXES*/}

        </div>
    );
}
