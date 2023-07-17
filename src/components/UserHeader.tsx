import "../main.css";

interface IUserHeader {
    userName: string;
}

export default function UserHeader({userName}:IUserHeader) {
    return (
        <div className="header">
            <h1>Welcome back<br />{userName}!</h1>
            <button className="edit-button">Edit Name</button>
        </div>
    );
}