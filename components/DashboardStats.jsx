
export default function DashboardStats({metrics, loading}) {

    return (
        loading ? <div>Loading...</div> : (
            <dl className="mx-auto flex justify-center items-center w-full h-full divide-x">
                <div
                    className="flex flex-wrap flex-1/4 h-auto items-center text-center justify-center gap-x-0 gap-y-0 px-4 sm:px-6 xl:px-8 text-neutral-100"
                >
                    <dd className=" w-full flex-none text-3xl text-center font-medium text-neutral-100">{metrics.referrals[0].count}</dd>
                    <dt className="text-neutral-100 text-center w-full">Referred</dt>
                    <span className={`text-xs -mt-1`}>last month</span>
                </div>

                <div
                    className="flex flex-wrap flex-1/4 h-auto items-center text-center justify-center gap-x-0 gap-y-0 px-4 sm:px-6 xl:px-8 text-neutral-100"
                >
                    <dd className=" w-full flex-none text-3xl text-center font-medium text-neutral-100">{metrics.graduations[0].count}</dd>
                    <dt className="text-neutral-100 text-center w-full">Graduations</dt>
                    <span className={`text-xs -mt-1`}>last month</span>
                </div>

                <div
                    className="flex flex-wrap flex-1/4 h-auto items-center text-center justify-center gap-x-0 gap-y-0 px-4 sm:px-6 xl:px-8 text-neutral-100"
                >
                    <dd className=" w-full flex-none text-3xl text-center font-medium text-neutral-100">{metrics.enrollments[0].count}</dd>
                    <dt className="text-neutral-100 text-center w-full">Enrollments</dt>
                    <span className={`text-xs -mt-1`}>last month</span>
                </div>

                <div
                    className="flex flex-wrap flex-1/4 h-auto items-center text-center justify-center gap-x-0 gap-y-0 px-4 sm:px-6 xl:px-8 text-neutral-100"
                >
                    <dd className=" w-full flex-none text-3xl text-center font-medium text-neutral-100">{metrics.clients}</dd>
                    <dt className="text-neutral-100 text-center w-full">Total</dt>
                    <span className={`text-xs -mt-1`}>clients</span>
                </div>
            </dl>
        )
    )
}
