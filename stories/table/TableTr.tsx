import { FC } from "react";

type TableTrStyle = {
  propA: string;
  propB?: boolean;
}

export interface TableTrProps {
  propA: string;
  propB?: boolean;
}

export const tableTrStyle: TableTrStyle = {
  propA: "propA",
  propB: true,
};

export const TableTrProps = {
  propA: "propA",
  propB: true,
}

export const TableTr = ({propA, propB }: TableTrProps) => (
  <div className="TableTr">
    <p>{propA}</p>
    {propB ? <p>propB is true</p> : <p>propB is false</p>}
  </div>
)
