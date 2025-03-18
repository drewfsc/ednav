"use client";

import {useEffect, useState} from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DashboardStats() {
    const [loading, setLoading] = useState(true)
    const [metrics, setMetrics] = useState({
        referrals: [{count: 0}],
        clients: 0,
        graduations: [{count: 0}],
        enrollments: [{count: 0}],
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [response] = await Promise.all([
                    fetch("/api/metrics/wordcloud")
                ])

                const metrics = await response.json()

                setMetrics({
                    graduations: metrics.graduatedClientsPerMonth || 0,
                    referrals: metrics.clientsReferredPerMonth,
                    clients: metrics.totalClients,
                    enrollments: metrics.enrolledClientsPerMonth

                })
            } catch (error) {
                console.error("Error fetching stats:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats().then()
    }, [])

    return (
        <dl className="mx-auto flex justify-center items-center w-full h-full divide-x">
            <div
                className="flex flex-wrap flex-1/4 h-auto items-center text-center justify-center gap-x-0 gap-y-0 px-4 sm:px-6 xl:px-8 text-neutral-100"
            >
                <dd className=" w-full flex-none text-3xl text-center font-medium text-neutral-100">{metrics.referrals[0].count}</dd>
                <dt className="text-neutral-100 text-center w-full">Clients Referred</dt>
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
}
