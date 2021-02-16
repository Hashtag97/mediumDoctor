import Axios from "axios";
import utils from "./utilities";

const client = Axios.create({
  baseURL: `http://176.36.70.134:6590`,
  responseType: "stream",
});

const getSpecialities = async (token, id) => {
  console.log("Loading specialities...");

  const { data } = await client.post(
    "/SpecialtyList",
    `<Root>\n<Token>${token}</Token>\n<CenterId>${id}</CenterId>\n</Root>`
  );

  console.log("Loading specialities is a success.");
  // console.log(data);
  return utils.parseSpecialities(data);
};

const getDoctors = async (token, id) => {
  console.log("Loading doctors...");

  const { data } = await client.post(
    "/DoctorList",
    `<Root>\n<Token>${token}</Token>\n<CenterId>${id}</CenterId>\n</Root>`
  );

  console.log("Loading doctors is a success.");
  // console.log(data);
  return utils.parseDoctors(data);
};

const getInfoDoctors = async (id, date, token, clinicId) => {
  console.log("Loading info about doctors...");

  const { data } = await client.post(
    "/SlotsByDocDay",
    `<Root>\n<Token>${token}</Token>\n<CenterId>${clinicId}</CenterId>\n<Date>${date}</Date>\n<DoctorId>${id}</DoctorId>\n<Duration>30</Duration>\n</Root>`
  );
  // console.log(data);
  console.log("Loading info about window doctors is a success.");
  return utils.parseWindowList(data);
};

const setCreatedRecord = async (fio, time, token, idClinic, id, phone, PolicyNumber, Insurance, FIOCoordinator) => {
  const { data } = await client.post(
    "/Appointment",
    `<Root><Token>${token}</Token><CenterId>${idClinic}</CenterId><Data><DoctorId>${id}</DoctorId><FullName>${fio}</FullName><StartTime>${time}</StartTime><Phone>${phone}</Phone><PolicyNumber>${PolicyNumber}</PolicyNumber><Insurance>${Insurance}</Insurance><FIOCoordinator>${FIOCoordinator}</FIOCoordinator><Duration>30</Duration></Data></Root>`
  );
  console.log("Loading info created Record");

  return data;
};

export default {
  getDoctors,
  getSpecialities,
  getInfoDoctors,
  setCreatedRecord,
};
