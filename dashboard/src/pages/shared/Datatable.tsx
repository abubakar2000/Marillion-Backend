import { Card, Typography } from "@material-tailwind/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  data: object[];
  headers: string[];
  exclude?: string[];
  actions?: {
    child: string | JSX.Element | null | undefined;
    indexedChild?: (index: number) => string | JSX.Element | null | undefined;
    action: (index: number, row?: any) => void;
    className?: string;
  }[];
}

const Datatable = ({ data, headers, exclude = [], actions = [] }: Props) => {
  const [keys, setKeys] = useState<string[]>([]);
  useEffect(() => {
    if (data.length) {
      setKeys(Object.keys(data[0]));
    }
  }, [data]);

  return (
    <Card className="overflow-hidden">
      <table>
        <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
          <tr>
            {headers.map((head, ki) => (
              <th key={ki}>
                <div className="font-normal leading-none opacity-70 p-3 text-start">
                  {head}
                </div>
              </th>
            ))}

            {actions.length > 0 && (
              <th colSpan={actions.length}>
                <div className="font-normal leading-none opacity-70 p-3 text-start">
                  Carbon Credits
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, ri) => (
            <tr key={ri} className="border-b">
              {keys
                .filter((h) => !exclude?.includes(h))
                .map((key, rki) => (
                  <td
                    key={rki}
                    className="border-r cursor-default hover:bg-gray-100"
                  >
                    <div className="p-3">{row[key]}</div>
                  </td>
                ))}
              {actions.map((action, aci) => (
                <td key={aci} className="border-r cursor-default p-3">
                  <button
                    onClick={() => {
                      action.action(ri);
                    }}
                    className={clsx([
                      !action.indexedChild &&
                        "p-1.5 border-none outline-none bg-pink-400 text-white w-full rounded-md hover:bg-pink-400 active:bg-pink-600",
                      action.className,
                    ])}
                  >
                    {action.indexedChild
                      ? action.indexedChild(ri)
                      : action.child}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Datatable;
