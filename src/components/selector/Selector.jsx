import "./selector.scss";

function Selector({ setView, views }) {
  return (
    <div className="acciones w-full flex">
      {views.map((view, index) => (
        <button key={index} onClick={() => setView(view)}>
          {view}
        </button>
      ))}
    </div>
  );
}

export default Selector;
