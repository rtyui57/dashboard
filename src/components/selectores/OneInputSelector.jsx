import { useEffect } from "react";

function OneInputSelector({ changeValue, input }) {
  useEffect(() => {
    changeValue(input);
  }, []);

  return (
    <div className="w-full">
      <select
        className="w-full bg-slate-300 p-1 text-center"
        value={input}
        onChange={changeValue}
      >
        <option key={input} value={input}>
          {input}
        </option>
      </select>
    </div>
  );
}

export default OneInputSelector;
