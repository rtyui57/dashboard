import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import AxiosController from "../../utils/AxiosController";
import { toast } from "react-toastify";

function CalendarQR() {
  const { calendarioId } = useParams();
  const [codeQr, setCodeQr] = useState("asas");
  const axiosController = AxiosController();

  useEffect(() => {
    axiosController
      .get(`/horario/qr/${calendarioId}`)
      .then((res) => setCodeQr(res.data))
      .catch((err) => toast.error(err.response.data));
  }, []);

  return (
    <div className="w-full h-full p-40">
      <QRCode value={codeQr} />
    </div>
  );
}

export default CalendarQR;
