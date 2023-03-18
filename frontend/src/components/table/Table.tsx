import classNames from "classnames";
import React from "react";

const TableHeader = ({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: boolean;
}) => (
  <th
    className={classNames(
      right ? "text-right" : "text-left",
      "body3 title1 flex-1 px-3 pt-3 pb-2 capitalize text-black"
    )}
  >
    {children}
  </th>
);

const TableRow = ({
  children,
  header,
}: {
  children: React.ReactNode;
  header?: boolean;
}) => (
  <tr
    className={classNames(
      "flex border-t border-t-background px-3",
      "cursor-pointer hover:bg-accent-medium",
      header ? "bg-accent-weak" : "bg-section"
    )}
  >
    {children}
  </tr>
);

const TableData = ({
  children,
  right,
  onClick,
}: {
  children: React.ReactNode;
  right?: boolean;
  onClick?: () => void;
}) => (
  <td
    onClick={onClick}
    className={classNames(
      right ? "text-right" : "text-left",
      "flex-1 py-4 px-3",
      "body2 title1 text-black"
    )}
  >
    {children}
  </td>
);

export const Table = <T extends { [key: string]: any }>({
  objects,
  titles,
  onClick,
  actionRow,
}: {
  objects: T[];
  titles: { [key in keyof T]?: string };
  onClick?: (object: T) => void;
  actionRow?: (object: T) => React.ReactNode;
}) => {
  const titleKeys = Object.keys(titles) || [];

  return (
    <>
      <div className="w-full border-collapse overflow-hidden overflow-x-scroll rounded-xl border border-background md:overflow-hidden">
        <table className="mt-[-1px] w-full">
          <thead>
            <TableRow header>
              {titleKeys.map((title, i) => (
                <TableHeader key={i}> {title} </TableHeader>
              ))}
              {actionRow && <TableHeader right> Actions </TableHeader>}
            </TableRow>
          </thead>
          <tbody>
            {objects.map((object, i) => {
              return (
                <TableRow key={i}>
                  {titleKeys.map((title, j) => (
                    <TableData
                      key={j}
                      onClick={() => {
                        onClick && onClick(object);
                      }}
                    >
                      {object[title]}
                    </TableData>
                  ))}
                  {actionRow && (
                    <TableData right> {actionRow(object)} </TableData>
                  )}
                </TableRow>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
