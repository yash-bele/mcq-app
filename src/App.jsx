import { useState, useRef, useEffect } from "react";
import { mcqs } from "./assets/mcqs";

export default function Mcq() {
  const [index, setIndex] = useState(0);
  const [mcq, setMcq] = useState(mcqs[index]);
  const [restrict, setRestrict] = useState(false);
  const opt1Ref = useRef(null);
  const opt2Ref = useRef(null);
  const opt3Ref = useRef(null);
  const opt4Ref = useRef(null);
  const optArr = [opt1Ref, opt2Ref, opt3Ref, opt4Ref];
  const [result, setResult] = useState(false);

  const handleOption = (opt) => (e) => {
    if (restrict) return;
    setRestrict(true);
    if (opt === mcq.ans) {
      e.target.classList.add("correct");
      const score = Number(sessionStorage.getItem("score")) || 0;
      sessionStorage.setItem("score", score + 1);
    } else {
      e.target.classList.add("wrong");
      optArr[mcq.ans - 1].current.classList.add("correct");
    }
  };

  const handleNext = () => {
    if (!restrict) return;
    if (index + 1 === mcqs.length) return setResult(true);
    setIndex((prev) => prev + 1);
    setMcq(mcqs[index + 1]);
    setRestrict(false);
    optArr.map((i) => {
      i.current.classList.remove("correct");
      i.current.classList.remove("wrong");
    });
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#00c9ff] to-[#92fe9d] h-screen grid place-items-center">
      {result ? (
        <div className="bg-white rounded-xl shadow w-11/12 sm:w-[35rem] h-4/5 sm:h-[25rem] grid place-items-center">
          <div className="bg-white rounded-xl p-10 border border-slate-500 border-dashed">
            You scored {sessionStorage.getItem("score")} out of {mcqs.length}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-10 w-11/12 sm:w-[35rem] h-4/5 sm:h-[25rem] flex flex-col justify-between">
          <p className="text-sm">
            Question {index + 1} of {mcqs.length}
          </p>
          <div>
            <h1 className="mb-3 leading-tight">{mcq.que}</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 grid-rows-4 sm:grid-rows-2 gap-2.5 select-none">
              <li ref={opt1Ref} onClick={handleOption(1)} className="border rounded-xl p-2.5 cursor-pointer">
                <span className="text-slate-500">A.</span> &nbsp; {mcq.opt1}
              </li>
              <li ref={opt2Ref} onClick={handleOption(2)} className="border rounded-xl p-2.5 cursor-pointer">
                <span className="text-slate-500">B.</span> &nbsp; {mcq.opt2}
              </li>
              <li ref={opt3Ref} onClick={handleOption(3)} className="border rounded-xl p-2.5 cursor-pointer">
                <span className="text-slate-500">C.</span> &nbsp; {mcq.opt3}
              </li>
              <li ref={opt4Ref} onClick={handleOption(4)} className="border rounded-xl p-2.5 cursor-pointer">
                <span className="text-slate-500">D.</span> &nbsp; {mcq.opt4}
              </li>
            </ul>
          </div>
          <button onClick={() => handleNext()} className="bg-[#00c9ff] text-white p-2.5 rounded-xl mx-auto w-3/4 select-none">
            {index + 1 === mcqs.length ? "View Score" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
