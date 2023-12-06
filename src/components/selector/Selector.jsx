import "./selector.scss";

function Selector({ setView, views, currentView }) {
  return (
    <div className="acciones w-full flex">
      {views.map((view, index) => (
        <button
          key={index}
          onClick={() => setView(view)}
          className={view === currentView ? "selected" : ""}
        >
          {view}
        </button>
      ))}
    </div>
  );
}

export default Selector;
