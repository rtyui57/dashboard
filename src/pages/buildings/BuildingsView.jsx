import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListClassrooms from "../../components/classrooms/ListClassrooms";
import ViewClassroom from "../../components/classrooms/ViewClassRoom";
import AxiosController from "../../utils/AxiosController";

function BuildingsView() {
  const { buildingName } = useParams();
  const [building, setBuilding] = useState({ aulas: [] });
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const axiosController = AxiosController();

  const updateData = () => {
    setReloadData(reloadData => !reloadData);
  };

  useEffect(() => {
    axiosController.get(`/building/${buildingName}`).then((res) => {
      setBuilding(res.data);
    });
  }, [reloadData]);

  return (
    <div className="classrooms flex h-full">
      <ListClassrooms
        classrooms={building.aulas}
        selectedClassroom={selectedClassroom}
        selectClassroom={setSelectedClassroom}
        building={buildingName}
        updateData={updateData}
      />
      <ViewClassroom
        building={buildingName}
        selectedClassroom={selectedClassroom}
      />
    </div>
  );
}

export default BuildingsView;
