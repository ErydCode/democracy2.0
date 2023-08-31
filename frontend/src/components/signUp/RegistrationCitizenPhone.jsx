import {useState} from "react";
import "../../pages/signUp/SignUp.css";
import InputsCitizenPhone from "./InputsCitizenPhone.jsx";

const RegistrationCitizenPhone = ({phones, setPhones, BACKEND_SIGN_UP}) => {

    const [phone, setPhone] = useState({
        phoneType: "",
        isMain: "",
        permissionToContact: "",
        phoneNumber: ""
    });

    const [isPhoneOkToAdd, setIsPhoneOkToAdd] = useState(false);
    const [isAddPressed, setIsAddPressed] = useState(false);
    const [isEditPressed, setIsEditPressed] = useState([]);
    const [isOneEditPressed, setIsOneEditPressed] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setIsAddPressed(false);
        setPhones([...phones, phone]);
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setPhone((prevState) => ({...prevState, [name]: value}));
    };


    const handlePhoneNumber = event => {
        const {name, value} = event.target;
        if (phone.phoneNumber.includes("+")) {
            console.log("phone includes +")
            setPhone(prevState => ({...prevState, [name]: value}));
        } else {
            setPhone(prevState => ({...prevState, [name]: "area code needed!"}));
        }
    }

    const handleAreaCode = event => {
        const {name, value} = event.target;
        setPhone(prevState => ({...prevState, [name]: " "}));
        setPhone(prevState => ({...prevState, [name]: value + " "}));
    };

    const handleAdd = () => {
        setIsAddPressed(true);
        const resetPhone = {...phone};
        Object.keys(resetPhone).forEach(function (key) {
            resetPhone[key] = ""
        });
        setPhone(resetPhone);
    };

    const handleEdit = (event, index) => {
        event.preventDefault();
        isEditPressed[index] = true;
        setIsOneEditPressed(true);
        const getPhone = {...phones[index]};
        setPhone(getPhone);
    };

    const saveEdit = (event, index) => {
        event.preventDefault();
        isEditPressed[index] = false;
        setIsOneEditPressed(false);
        const saveChanges = phones.map((p, i) => {
            if (i === index) {
                return phones[i] = phone;
            } else {
                return p;
            }
        });
        setPhones(saveChanges);
    };

    const handleDelete = (event, index) => {
        event.preventDefault();
        setPhones(phones.filter(p => phones.indexOf(p) !== index));
    };

    return (<div className={"column formSection"}>
        <h2>phone</h2>
        <div className="column">
            {phones.length > 0 ?
                phones.map((phone, index) =>
                    <div key={index} className={"column formSectionDetail"}>
                        <div className={isEditPressed[index] ? "formDetailList formDetailListOpen" : "formDetailList"}>
                            <h3>{phone.phoneNumber}</h3>
                            <button className={"deleteCitizenDetails"}
                                    type={"button"}
                                    onClick={event => handleDelete(event, index)}>delete
                            </button>
                            <button className={"updateCitizenDetails"}
                                    type={"button"}
                                    onClick={event => handleEdit(event, index)}>edit
                            </button>
                        </div>
                        {isEditPressed[index] ?
                            <div className={"column"}>
                                <InputsCitizenPhone
                                    phone={phone}
                                    handlePhoneNumber={handlePhoneNumber}
                                    handleAreaCode={handleAreaCode}
                                    handleChange={handleChange}
                                    BACKEND_SIGN_UP={BACKEND_SIGN_UP}
                                />
                                <button className={"saveUpdateCitizenDetails"}
                                        onClick={event => saveEdit(event, index)}>save
                                </button>
                            </div> : ""}
                    </div>) : ""}
            {isAddPressed ?
                <div className={"column"}>
                    <InputsCitizenPhone
                        phone={phone}
                        handlePhoneNumber={handlePhoneNumber}
                        handleAreaCode={handleAreaCode}
                        handleChange={handleChange}
                        BACKEND_SIGN_UP={BACKEND_SIGN_UP}
                    />
                    <button className={"saveUpdateCitizenDetails"}
                            onClick={handleSubmit}>save
                    </button>
                </div>
                : !isOneEditPressed ?
                    <button className={"addNewCitizenDetail"}
                            type={"button"}
                            onClick={handleAdd}>add</button>
                    : ""}
        </div>
    </div>);
};

export default RegistrationCitizenPhone;