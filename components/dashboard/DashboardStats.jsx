import SignIn from "../sign-in";
import React from "react";

export default function DashboardStats({ metrics, loading }) {
  return loading ? (
    <div>Loading...</div>
  ) : (
    <dl className="divide-base-content mx-auto flex h-full w-full items-center justify-center divide-x">
      <div className="text-base-content flex h-auto flex-1/4 flex-wrap items-center justify-center gap-x-0 gap-y-0 px-4 text-center sm:px-6 xl:px-8">
        <dd className="text-base-content w-full flex-none text-center text-3xl font-medium">
          {metrics.referrals[0].count}
        </dd>
        <dt className="w-full text-center">Referred</dt>
        <span className={`-mt-1 text-xs`}>last month</span>
        <SignIn />
      </div>

      <div className="text-base-content flex h-auto flex-1/4 flex-wrap items-center justify-center gap-x-0 gap-y-0 px-4 text-center sm:px-6 xl:px-8">
        <dd className="text-base-content w-full flex-none text-center text-3xl font-medium">
          GitHub
        </dd>
        <dt className="w-full text-center">Referred</dt>
        <span className={`-mt-1 text-xs`}>last month</span>
        <SignIn />
      </div>

      <div className="text-base-content flex h-auto flex-1/4 flex-wrap items-center justify-center gap-x-0 gap-y-0 px-4 text-center sm:px-6 xl:px-8">
        <dd className="text-base-content w-full flex-none text-center text-3xl font-medium">
          {metrics.graduations[0].count}
        </dd>
        <dt className="w-full text-center">Graduations</dt>
        <span className={`-mt-1 text-xs`}>last month</span>
      </div>

      <div className="text-base-content flex h-auto flex-1/4 flex-wrap items-center justify-center gap-x-0 gap-y-0 px-4 text-center sm:px-6 xl:px-8">
        <dd className="text-base-content w-full flex-none text-center text-3xl font-medium">
          {metrics.enrollments[0].count}
        </dd>
        <dt className="w-full text-center">Enrollments</dt>
        <span className={`-mt-1 text-xs`}>last month</span>
      </div>

      <div className="text-base-content invisible flex h-auto flex-1/4 flex-wrap items-center justify-center gap-x-0 gap-y-0 px-4 text-center sm:px-6 md:visible xl:px-8">
        <dd className="w-full flex-none text-center text-3xl font-medium">
          {metrics.clients}
        </dd>
        <dt className="w-full text-center">Total</dt>
        <span className={`-mt-1 text-xs`}>clients</span>
      </div>
    </dl>
  );
}
