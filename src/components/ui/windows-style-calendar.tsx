import { useMouse } from "@uidotdev/usehooks";
import clsx from "clsx";
import { useState } from "react";

const days = [
  29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];
const weeksDays = ["su", "mo", "tu", "we", "th", "fr", "sa"];

const width = 380;

const today = 1;

const WindowsStyleCalendar = () => {
  const [mouse, ref] = useMouse();
  const [pickedDay, setPickedDay] = useState(10);

  const xIntersecting =
    mouse.elementX > -width / 2 / 2 && mouse.elementX < width + width / 2 / 2;
  const yIntersecting =
    mouse.elementY > -width / 2 / 2 && mouse.elementY < width;
  const isIntersecting = xIntersecting && yIntersecting;

  return (
    <div className="p-5 bg-slate-200">
      <div className="bg-neutral-800 text-neutral-500" style={{ width }}>
        <div className="grid grid-cols-7">
          {weeksDays.map((k, i) => {
            return (
              <div
                key={i}
                style={{ width: width / 7 - 2 }}
                className={
                  "flex justify-center items-center text-center uppercase select-none aspect-square"
                }
              >
                {k}
              </div>
            );
          })}
        </div>
        <div
          ref={ref as any}
          className="grid grid-cols-7 grid-rows-6 bg-neutral-800 relative overflow-hidden p-[2px]"
          style={{ width }}
        >
          {days.map((k, i) => {
            return (
              <div
                key={i}
                className={clsx(
                  "relative z-30 p-[1px] border-[1px] duration-200",
                  {
                    "border-neutral-800 hover:bg-neutral-500":
                      today !== k && pickedDay !== k,
                    "border-blue-500 hover:border-blue-400 border-[2px] bg-blue-500":
                      today === k && pickedDay !== k,
                    "border-blue-500 hover:border-blue-400 border-[2px] bg-neutral-800":
                      today === k && pickedDay === k,
                    "border-blue-500 hover:border-blue-600 border-[2px]":
                      pickedDay === k && today !== k,
                  }
                )}
              >
                <div
                  onClick={() => setPickedDay(k)}
                  key={i}
                  className={clsx(
                    "flex justify-center items-center select-none aspect-square ",
                    {
                      "bg-neutral-800 text-neutral-300 ": today !== k,
                      "bg-blue-500 text-neutral-100": today === k,
                    }
                  )}
                >
                  {k}
                </div>
              </div>
            );
          })}
          {isIntersecting && (
            <div
              className="rounded-full absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                width: width / 1.5,
                height: width / 1.5,
                top: mouse.elementY,
                left: mouse.elementX,
                background:
                  "radial-gradient(circle, #ffffff5a, transparent, transparent)",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WindowsStyleCalendar;
