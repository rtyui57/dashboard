import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListClassrooms from "../../components/classrooms/ListClassrooms";
import ViewClassroom from "../../components/classrooms/ViewClassRoom";
import axios from "axios";

function BuildingsView() {
  const { buildingName } = useParams();
  const [building, setBuilding] = useState({ aulas: [] });
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/building/${buildingName}`).then((res) => {
      setBuilding(res.data);
    });
  }, []);

  return (
    <div className="classrooms flex h-full">
      <ListClassrooms
        classrooms={building.aulas}
        selectedClassroom={selectedClassroom}
        selectClassroom={setSelectedClassroom}
        building={buildingName}
      />
      <ViewClassroom
        building={buildingName}
        selectedClassroom={selectedClassroom}
      />
    </div>
  );
}

export default BuildingsView;
