import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListClassrooms from "../../components/classrooms/ListClassrooms";
import ViewClassroom from "../../components/classrooms/ViewClassRoom";
import axios from "axios";

function BuildingsView() {
  const { buildingName } = useParams();
  const [building, setBuilding] = useState({ clases : []});
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/building/${buildingName}`).then((res) => {
      setBuilding(res.data);
    });
  }, []);

  return (
    <div className="classrooms flex h-full">
      <ListClassrooms
        classrooms={building.clases}
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
