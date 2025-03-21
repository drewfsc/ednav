
export default function DashboardStats({metrics, loading}) {

    return (
        loading ? <div>Loading...</div> : (
            <dl className="mx-auto flex justify-center items-center w-full h-full divide-x divide-base-content">
                <div
                    className="flex flex-wrap flex-1/4 h-auto items-center text-center justify-center gap-x-0 gap-y-0 px-4 sm:px-6 xl:px-8  text-base-content"
                >
                    <dd className=" w-full flex-none text-3xl text-center font-medium text-base-content">{metrics.referrals[0].count}</dd>
                    <dt className="text-center w-full">Referred</dt>
                    <span className={`text-xs -mt-1`}>last month</span>
                </div>

                <div
                    className="flex flex-wrap flex-1/4 h-auto items-center text-center justify-center gap-x-0 gap-y-0 px-4 sm:px-6 xl:px-8  text-base-content"
                >
                    <dd className=" w-full flex-none text-3xl text-center font-medium text-base-content">{metrics.graduations[0].count}</dd>
                    <dt className="text-center w-full">Graduations</dt>
                    <span className={`text-xs -mt-1`}>last month</span>
                </div>

                <div
                    className="flex flex-wrap flex-1/4 h-auto items-center text-center justify-center gap-x-0 gap-y-0 px-4 sm:px-6 xl:px-8  text-base-content"
                >
                    <dd className=" w-full flex-none text-3xl text-center font-medium text-base-content">{metrics.enrollments[0].count}</dd>
                    <dt className="text-center w-full">Enrollments</dt>
                    <span className={`text-xs -mt-1`}>last month</span>
                </div>

                <div
                    className="flex flex-wrap flex-1/4 h-auto items-center text-center justify-center gap-x-0 gap-y-0 px-4 sm:px-6 xl:px-8  text-base-content invisible md:visible"
                >
                    <dd className=" w-full flex-none text-3xl text-center font-medium">{metrics.clients}</dd>
                    <dt className=" text-center w-full">Total</dt>
                    <span className={`text-xs -mt-1`}>clients</span>
                </div>
            </dl>
        )
    )
}
