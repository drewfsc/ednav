export default function ClientDescription({ client }) {
    return (
        <div className="my-6 mx-8">
            <h3 className="text-xl font-bold mb-3">Personal</h3>
            <dl className="divide-y divide-base-300 mb-6">
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">Email</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.email}</dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">Phone</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.contactNumber}</dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">DOB</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.dob}</dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">Last Grade</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.lastGrade}</dd>
                </div>
            </dl>
            <h3 className="text-xl font-bold mb-3">Organization</h3>
            <dl className="divide-y divide-base-300">
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">FEP</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.fep}</dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">Referred</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.dateReferred}</dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">PIN</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.pin}</dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">Region</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.region}</dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">Status</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.clientStatus}</dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">Transcripts</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.transcripts}</dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">Office City</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.officeCity}</dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">Group</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.group}</dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-light text-base-content/80">School If Enrolled</dt>
                    <dd className="mt-1 text-sm/6 text-base-content sm:col-span-2 sm:mt-0">{client.schoolIfEnrolled}</dd>
                </div>
            </dl>
        </div>
    );
}
