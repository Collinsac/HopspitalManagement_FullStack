import dashboardIcon from "../icons/dashboard-icon.svg";
import doctorsDashIcon from "../icons/doctorsDash-icon-02.svg"
import patientDashIcon from "../icons/patientDash-icon.svg"

import AdminWelcomeAvatar from '../images/AdminWelcomeAvatar.png'
import DoctorWelcomeAvatar from '../images/DoctorWelcomeAvatar.png'
import PatientWelcomeAvatar from '../images/PatientWelcomeAvatar.png'
const menu = [
  {
    id: 1,
    Role: "All",
    title: "Dashboard",
    image: dashboardIcon,
    subMenu: [
      {
        id: 1,
        title: "Admin Dashboard",
        Role: ["Admin"],
        Route:'/'
      },
      {
        id: 2,
        title: "Doctor Dashboard",
        Role: ["doctor"],
      },
      {
        id: 3,
        title: "Patient Dashboard",
        Role: ["Patient"],
      },
      {
        id: 4,
        title: "Phamarcy Dashboard",
        Role: ["phamarcy"],
      },
    ],
  },
  {
    id: 2,
    Role: "All",
    title: "Doctors",
    image:doctorsDashIcon,
    subMenu: [
      {
        id: 1,
        title: "Add Doctor",
        Role: ["Admin"],
        Route:"/adds"
      },
      
      {
        id: 2,
        title: "All Doctor",
        Role: ["Admin"],
        Route:"/doctor"
      },
    ],
  },
  {
    id: 3,
    Role: "All",
    title: "Patients",
    image:patientDashIcon,
    subMenu: [
      {
        id: 1,
        title: "Add Patient",
        Role: ["Admin"],
        Route:"/add"
      },
      {
        id: 2,
        title: "All Patient",
        Role: "All",
        Route:'/patient'
      },
     
    ],
  },
  {
    id: 4,
    Role: "All",
    title: "Departments",
    image:patientDashIcon,
    subMenu: [
      {
        id: 1,
        title: "Add Department",
        Role: ["Admin"],
        Route:"/addDepartment"
      },
      {
        id: 2,
        title: "All Department",
        Role: "All",
        Route:'/patient'
      },
     
    ],
  },
];

const welcome =[
  {
    id:1,
    image:AdminWelcomeAvatar
  },{
    id:2,
    image:DoctorWelcomeAvatar
  },{
    id:3,
    image:PatientWelcomeAvatar
  }
]


export default{ menu,welcome};
