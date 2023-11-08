import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListClassrooms from "../../components/classrooms/ListClassrooms";
import ViewClassroom from "../../components/classrooms/ViewClassRoom";

function BuildingsView() {
  const { building } = useParams();
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  return (
    <div className="classrooms flex h-full">
      <ListClassrooms
        classrooms={[
          { name: "1" },
          { name: "2" },
          { name: "3" },
          { name: "4" },
          { name: "5" },
        ]}
        selectClassroom={setSelectedClassroom}
      />
      <ViewClassroom
        clasroom={selectedClassroom}
        setClasroom={setSelectedClassroom}
      />
    </div>
  );
}

export default BuildingsView;
